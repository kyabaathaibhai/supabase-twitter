import React from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import PersonCard from '../components/PersonCard';

const LandingPage = () => {
  const { signInWithTwitter, user } = useSupabase();

  const handleStartCall = () => {
    if (!user) {
      signInWithTwitter();
    } else {
      window.open('/call', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Powerful Messaging */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect With The Right People
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            I'll connect you to the best people in my network. Message me and let's get on a call.
          </p>
          <button
            onClick={handleStartCall}
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Start a Call
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Message Me</h3>
              <p className="text-gray-600">Sign up with Twitter and tell me about your goals and what you're looking for.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">I'll Give You a Call</h3>
              <p className="text-gray-600">We'll chat to understand your background and specific networking needs.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">I'll Make Introductions</h3>
              <p className="text-gray-600">I'll connect you with valuable people in my network who can help you achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who Can Benefit</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Founders',
                description: 'Connect with investors, potential co-founders, and industry experts to help grow your startup.'
              },
              {
                title: 'Marketers',
                description: 'Network with peers, find collaboration opportunities, and share strategies with other marketing professionals.'
              },
              {
                title: 'Influencers',
                description: 'Build relationships with brands, agencies, and fellow content creators to expand your reach.'
              },
              {
                title: 'Investors',
                description: 'Discover promising startups and connect with other investors for potential co-investment opportunities.'
              },
              {
                title: 'Presale Investors',
                description: 'Get early access to upcoming projects and connect with founders before public launches.'
              },
              {
                title: 'Job Seekers',
                description: 'Find opportunities through connections with hiring managers and industry insiders.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Token Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Pricing</h2>
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold text-xl">$</span>
              </div>
              <h3 className="text-2xl font-bold">$PLUM Token</h3>
            </div>
            <p className="text-xl mb-6">To connect with prospects in our network, you need:</p>
            <div className="bg-indigo-600 text-white py-4 px-6 rounded-lg inline-block font-bold text-2xl mb-6">
              100 $PLUM Coins
            </div>
            <p className="text-gray-600">
              Make sure you have enough $PLUM in your connected wallet before requesting introductions.
            </p>
          </div>
        </div>
      </section>

      {/* People I Know Section with placeholder images */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Some Incredible People I'm Connected With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'Product Manager', company: 'Google', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'David Chen', role: 'Software Engineer', company: 'Microsoft', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Emily Rodriguez', role: 'Marketing Director', company: 'Meta', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
              { name: 'Michael Kim', role: 'UX Designer', company: 'Apple', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
              { name: 'Sophia Patel', role: 'Data Scientist', company: 'Amazon', image: 'https://randomuser.me/api/portraits/women/90.jpg' },
              { name: 'James Wilson', role: 'Startup Founder', company: 'TechVenture', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
              { name: 'Olivia Martinez', role: 'Investor', company: 'Capital Partners', image: 'https://randomuser.me/api/portraits/women/26.jpg' },
              { name: 'Robert Taylor', role: 'CTO', company: 'Tesla', image: 'https://randomuser.me/api/portraits/men/42.jpg' }
            ].map((person, i) => (
              <PersonCard key={i} person={person} />
            ))}
          </div>
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-6">I Know People From Top Companies Like...</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {['Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Tesla'].map((company) => (
                <div key={company} className="bg-white py-3 px-6 rounded-lg shadow-sm font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl mb-8">Sign up with Twitter and start building valuable connections today.</p>
          <button
            onClick={handleStartCall}
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* No footer here since we're using the global Footer component */}
    </div>
  );
};

export default LandingPage;
