import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MakeoverProvider } from './context/MakeoverContext';
import { usePageTracking } from './hooks/usePageTracking';
import Landing from './pages/Landing';
import Capture from './pages/Capture';
import ThemeSelection from './pages/ThemeSelection';
import Result from './pages/Result';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Login from './pages/Login'; // Keeping Login if it's separate or needed

const PageTracker = () => {
  usePageTracking();
  return null;
};

function App() {
  return (
    <MakeoverProvider>
      <Router>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/theme" element={<ThemeSelection />} />
          <Route path="/result" element={<Result />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </MakeoverProvider>
  );
}

export default App;
