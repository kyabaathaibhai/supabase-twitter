import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-indigo max-w-none">
          <p>
            At ConnectPlum, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information when you create an account through Twitter authentication, including your Twitter profile information 
            (name, username, profile image). We also collect wallet addresses that you choose to connect to our platform.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process connections and match you with relevant individuals</li>
            <li>Communicate with you about our services</li>
            <li>Monitor platform usage and ensure security</li>
          </ul>
          
          <h2>3. Information Sharing</h2>
          <p>
            We don't sell your personal information. We may share basic profile information with other users when making connections, 
            but only with your consent. We may also share information with service providers who help us operate our platform.
          </p>
          
          <h2>4. Wallet Information</h2>
          <p>
            The wallet addresses you provide are used to verify $PLUM token ownership and facilitate connections on our platform. 
            We implement appropriate security measures to protect this information.
          </p>
          
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can manage most of your information 
            through your account settings or by contacting us directly.
          </p>
          
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, 
            disclosure, or destruction.
          </p>
          
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last Updated" date.
          </p>
          
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@connectplum.com.
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last Updated: May 14, 2025
          </p>
        </div>
        
        <div className="mt-8">
          <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
