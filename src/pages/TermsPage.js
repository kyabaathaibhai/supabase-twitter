import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
        
        <div className="prose prose-indigo max-w-none">
          <p>
            Welcome to ConnectPlum. By using our service, you agree to these Terms of Service.
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ConnectPlum in any way, you agree to and are bound by these Terms of Service. 
            If you do not agree to all of these terms, you may not use the service.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            ConnectPlum is a platform that connects users with like-minded individuals based on their interests, goals, and needs.
            We provide networking opportunities through our connection system.
          </p>
          
          <h2>3. $PLUM Token Usage</h2>
          <p>
            The ConnectPlum platform utilizes $PLUM tokens for facilitating connections. Users must have a minimum of 100 $PLUM tokens 
            in their connected wallet to initiate connections. These tokens are used within the platform ecosystem and do not 
            necessarily have value outside of our service.
          </p>
          
          <h2>4. User Conduct</h2>
          <p>
            You agree not to use ConnectPlum for any unlawful purpose or in any way that might harm, damage, or disparage any other party.
            We reserve the right to terminate your access if you violate these terms.
          </p>
          
          <h2>5. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our <Link to="/privacy" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</Link> to 
            understand how we collect, use, and disclose information about you.
          </p>
          
          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting 
            the new Terms of Service on the site and updating the "Last Updated" date.
          </p>
          
          <h2>7. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@connectplum.com.
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

export default TermsPage;
