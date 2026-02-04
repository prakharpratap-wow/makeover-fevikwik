import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MakeoverProvider } from './context/MakeoverContext';
import { useLocation } from 'react-router-dom';
import AnalyticsTracker from './components/AnalyticsTracker';
import PageTitleUpdater from './components/PageTitleUpdater';
import Landing from './pages/Landing';
import Capture from './pages/Capture';
import ThemeSelection from './pages/ThemeSelection';
import Result from './pages/Result';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Login from './pages/Login';
import HowItWorks from './pages/HowItWorks';
import Gallery from './pages/Gallery';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initGA, trackPageView } from './services/analytics';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Check for Client ID
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      const newClientId = uuidv4();
      localStorage.setItem('clientId', newClientId);
      console.log('Generated new Client ID:', newClientId);
    } else {
      console.log('Existing Client ID:', clientId);
    }
  }, []);

  return (
    <MakeoverProvider>
      <Router>
        <PageTitleUpdater />
        <PageTracker />
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/theme" element={<ThemeSelection />} />
          <Route path="/result" element={<Result />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </MakeoverProvider>
  );
}

export default App;
