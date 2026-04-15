import React, { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import HelpRequest from './pages/HelpRequest';
import Medicines from './pages/Medicines';
import Community from './pages/Community';
import Tracking from './pages/Tracking';
import SafetyMap from './pages/SafetyMap';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import VoiceModal from './components/common/VoiceModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Home />;
      case 'help':
        return <HelpRequest openVoiceModal={() => setIsVoiceModalOpen(true)} />;
      case 'tracking':
        return <Tracking />;
      case 'medicines':
        return <Medicines />;
      case 'community':
        return <Community />;
      case 'safety':
        return <SafetyMap />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  if (!isLoggedIn) {
    return <Onboarding onFinish={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <AppShell activeScreen={activeScreen} setScreen={setActiveScreen}>
        {renderScreen()}
      </AppShell>
      <VoiceModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
    </>
  );
}

export default App;
