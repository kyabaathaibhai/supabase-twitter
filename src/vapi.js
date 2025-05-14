// Vapi SDK integration for ConnectPlum
// This file initializes the Vapi client and exports it for use in hooks/components

// import Vapi from 'vapi-sdk';
import Vapi from '@vapi-ai/web';

const apiKey = process.env.REACT_APP_VAPI_API_KEY || process.env.VAPI_API_KEY;
const projectId = process.env.REACT_APP_VAPI_PROJECT_ID || process.env.VAPI_PROJECT_ID;

// Singleton Vapi client instance
const vapi = new Vapi({ apiKey, projectId });

export default vapi;
