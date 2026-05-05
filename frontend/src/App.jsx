import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

// Hooks
import { useReadMode } from './hooks/useReadMode';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';

// Pages
import ServicesPage from './pages/ServicesPage';
import SeniorHome from './pages/SeniorHome';
import ContactPage from './pages/ContactPage';



export default function App() {
  const [activePage, setActivePage] = useState('services');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [config, setConfig] = useState({
    textSize: 'normal',
    highContrast: false,
    language: 'english',
    readMode: false
  });

  // Enable text size scaling by directly altering HTML base size
  useEffect(() => {
    const sizeMap = { normal: '16px', large: '20px', xl: '24px' };
    document.documentElement.style.fontSize = sizeMap[config.textSize];
  }, [config.textSize]);

  // Hook handles TTS functionality when Read Mode is active
  useReadMode(config.readMode);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // For backward compatibility keep CSS variable
  const baseSize = config.textSize === 'normal' ? 16 : config.textSize === 'large' ? 20 : 24;

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ${config.highContrast ? 'high-contrast bg-[var(--color-primary-white)] text-[var(--color-primary-black)] font-inter' : 'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] font-inter'}`}
      style={{ '--base-size': `${baseSize}px` }}
    >
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-grow pt-28 md:pt-32 relative">
        {/* Subtle background mandala-inspired light gradients */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--color-accent-orange)_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_var(--color-primary-black)_0%,_transparent_30%)] mix-blend-multiply opacity-10"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activePage === 'home' && <SeniorHome />}
            {activePage === 'services' && <ServicesPage />}
            {activePage === 'contact-us' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>


      <Footer />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        setConfig={setConfig}
      />
    </div>
  );
}
