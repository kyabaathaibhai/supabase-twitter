import { useState, useEffect } from 'react';
import vapi from '../vapi';
import { userApi } from '../services/api';

export const CALL_STATUS = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  LOADING: 'loading',
};

export function useVapi(authToken, user) {
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [callStatus, setCallStatus] = useState(CALL_STATUS.INACTIVE);
  const [callId, setCallId] = useState(null);
  const [vapiSessionId, setVapiSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTranscript, setActiveTranscript] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  // Attach/detach listeners
  useEffect(() => {
    const onSpeechStart = () => setIsSpeechActive(true);
    const onSpeechEnd = () => setIsSpeechActive(false);
    const onCallStart = (session) => {
      setCallStatus(CALL_STATUS.ACTIVE);
      setVapiSessionId(session?.id || null);
    };
    const onCallEnd = () => {
      setCallStatus(CALL_STATUS.INACTIVE);
      setVapiSessionId(null);
    };
    const onVolumeLevel = (level) => setAudioLevel(level);
    const onMessage = (msg) => {
      if (msg.type === 'transcript' && msg.transcriptType === 'partial') {
        setActiveTranscript(msg);
      } else {
        setMessages((prev) => [...prev, msg]);
        setActiveTranscript(null);
      }
    };
    const onError = (e) => {
      setCallStatus(CALL_STATUS.INACTIVE);
      setVapiSessionId(null);
      // Optionally: set error state
    };
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('volume-level', onVolumeLevel);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    return () => {
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('volume-level', onVolumeLevel);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
    };
  }, []);

  // Start a call: fetch config, start vapi
  const start = async () => {
    setCallStatus(CALL_STATUS.LOADING);
    setMessages([]);
    setActiveTranscript(null);
    setAudioLevel(0);
    setCallId(null);
    setVapiSessionId(null);
    try {
      const res = await fetch('/api/calls/start', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!res.ok) throw new Error('Failed to start call');
      const data = await res.json();
      setCallId(data.call_id);
      // Prepare assistant config for Vapi
      // If assistant ID is provided, use it directly instead of creating a new assistant
      if (data.vapi_assistant_id) {
        // Use existing assistant by ID
        await vapi.start({
          assistantId: data.vapi_assistant_id,
          apiKey: data.vapi_api_key,
          // Pass user context if available
          userContext: user ? {
            name: user.twitter_name,
            avatar: user.twitter_profile_image,
          } : undefined
        });
        return;
      }
      
      // Fallback to creating assistant with prompt if no ID
      const assistant = {
        prompt: data.vapi_prompt,
        projectId: data.vapi_project_id,
        apiKey: data.vapi_api_key,
        // Optionally pass user info if Vapi supports
        name: user?.twitter_name,
        avatar: user?.twitter_profile_image,
      };
      await vapi.start(assistant);
    } catch (error) {
      setCallStatus(CALL_STATUS.INACTIVE);
      setCallId(null);
    }
  };

  // End a call: stop vapi, notify backend with transcript
  const stop = async () => {
    setCallStatus(CALL_STATUS.LOADING);
    vapi.stop();
    if (callId) {
      try {
        // Send all messages for transcript generation
        await fetch('/api/calls/end', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ 
            call_id: callId, 
            vapi_session_id: vapiSessionId,
            messages: messages,
            user_name: user?.twitter_name || 'User'
          }),
        });
      } catch (e) {
        console.error('Error ending call:', e);
      }
    }
    setCallStatus(CALL_STATUS.INACTIVE);
    setCallId(null);
    setVapiSessionId(null);
  };

  const toggleCall = () => {
    if (callStatus === CALL_STATUS.ACTIVE) {
      stop();
    } else {
      start();
    }
  };

  return {
    isSpeechActive,
    callStatus,
    audioLevel,
    activeTranscript,
    messages,
    start,
    stop,
    toggleCall,
  };
}
