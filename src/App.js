import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './context/SupabaseContext';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import CallPage from './pages/CallPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path="/call" element={
                <PrivateRoute>
                  <CallPage />
                </PrivateRoute>
              } />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
