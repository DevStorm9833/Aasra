import React, { useState } from 'react';
import { ArrowRight, Users, MapPin, HandHelping, Pill, AlertTriangle, Mic, Bell, Phone } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const Onboarding = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const nextStep = () => setStep(step + 1);

  const renderLotus = (size = "lg") => (
    <svg className={clsx("mx-auto mb-6", size === "lg" ? "w-[140px] h-[140px]" : "w-15 h-15")} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#C5B9E0' }} />
          <stop offset="100%" style={{ stopColor: '#2C3E50' }} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#lotusGrad)" strokeWidth="2" />
      <g transform="translate(60,60)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
          <ellipse key={deg} rx="6" ry="16" fill="#C5B9E0" transform={`rotate(${deg})`} opacity="0.8" />
        ))}
        <circle cx="0" cy="0" r="8" fill="url(#lotusGrad)" />
      </g>
    </svg>
  );

  const renderSlides = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-5 max-w-[560px] mx-auto animate-fadeIn">
            {renderLotus()}
            <h1 className="font-poppins text-[34px] font-bold mb-4">Welcome to AASRA</h1>
            <p className="text-[19px] text-gray-500 mb-7">Your safe, caring companion for a happy and independent life</p>
            <button onClick={nextStep} className="w-full max-w-[300px] min-h-[56px] bg-warm-orange text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-md">
              Get Started <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <div className="flex justify-center gap-2 mt-5">
              <div className="w-3 h-3 rounded-full bg-warm-orange scale-125 transition-all" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-5 max-w-[560px] mx-auto">
            <div className="mb-7.5 flex justify-center">
              <Users className="w-18 h-18 text-warm-orange" />
            </div>
            <h1 className="font-poppins text-3xl font-bold mb-4">How AASRA Helps You</h1>
            <div className="text-left py-5 px-5 space-y-3.5 mb-6">
              {[
                { icon: HandHelping, label: 'Get help from kind volunteers', color: 'text-warm-orange' },
                { icon: Pill, label: 'Medicine reminders on time', color: 'text-sage-green' },
                { icon: AlertTriangle, label: 'One-tap SOS for emergencies', color: 'text-[#E74C3C]' },
                { icon: Mic, label: 'Voice commands - just speak', color: 'text-soft-lavender' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[19px]">
                  <item.icon className={clsx("w-5 h-5", item.color)} /> {item.label}
                </div>
              ))}
            </div>
            <button onClick={nextStep} className="w-full max-w-[300px] min-h-[56px] bg-warm-orange text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-md">
              Next <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <div className="flex justify-center gap-2 mt-5">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-warm-orange scale-125 transition-all" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-5 max-w-[560px] mx-auto">
            <div className="mb-7.5 flex justify-center">
              <MapPin className="w-18 h-18 text-sage-green" />
            </div>
            <h1 className="font-poppins text-2xl font-bold mb-4">We need a few permissions</h1>
            <div className="text-left py-5 px-5 space-y-3 mb-6">
               {[
                { icon: MapPin, label: 'Location - So volunteers can find you' },
                { icon: Mic, label: 'Microphone - For voice commands' },
                { icon: Bell, label: 'Notifications - For reminders' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[19px]">
                  <item.icon className="w-5 h-5" /> {item.label}
                </div>
              ))}
            </div>
            <p className="text-[15px] text-gray-500 mb-5 px-4">Your privacy matters. Location is only shared when you ask for help.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={nextStep} className="flex-1 max-w-[180px] min-h-[56px] border-2 border-soft-lavender rounded-pill font-semibold">Allow Later</button>
              <button onClick={nextStep} className="flex-1 max-w-[180px] min-h-[56px] bg-warm-orange text-white rounded-pill font-semibold flex items-center justify-center gap-2">Allow All <ArrowRight className="w-4.5 h-4.5" /></button>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-warm-orange scale-125 transition-all" />
            </div>
          </motion.div>
        );
      case 4: // Login
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-5 max-w-[560px] mx-auto">
                {renderLotus("sm")}
                <h1 className="font-poppins text-3xl font-bold mb-1.5">Welcome Back</h1>
                <p className="text-gray-500 text-[15px] mb-6">Enter your mobile number to continue</p>
                
                <div className="bg-white border-2 border-soft-lavender rounded-sm p-3.5 mb-4 flex items-center gap-3 focus-within:border-warm-orange shadow-sm">
                    <Phone className="w-6 h-6 text-gray-400" />
                    <div className="text-[17px] text-gray-400 border-r-2 pr-2.5">+91</div>
                    <input 
                      type="tel" 
                      placeholder="Enter 10-digit number" 
                      className="flex-1 outline-none text-[17px]" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <button onClick={nextStep} className="w-full max-w-[300px] min-h-[56px] bg-warm-orange text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-md">
                    Send OTP <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <button className="w-full max-w-[300px] mt-3 min-h-[56px] bg-sage-green text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2">
                    <Mic className="w-5 h-5" /> Voice: "Send OTP"
                </button>
            </motion.div>
        );
      case 5: // OTP
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-5 max-w-[560px] mx-auto">
                {renderLotus("sm")}
                <h1 className="font-poppins text-2xl font-bold mb-1.5 px-10">Enter the 6-digit code</h1>
                <p className="text-gray-500 text-[15px] mb-6">Sent to +91 {phone || '98765-43210'}</p>
                
                <div className="flex gap-2 justify-center mb-6">
                    {otp.map((val, i) => (
                        <input 
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-12 h-14 border-2 border-soft-lavender rounded-sm text-2xl font-poppins text-center outline-none focus:border-warm-orange"
                            value={val}
                            onChange={(e) => {
                                const newOtp = [...otp];
                                newOtp[i] = e.target.value;
                                setOtp(newOtp);
                                if (e.target.value && i < 5) {
                                    document.getElementById(`otp-${i+1}`).focus();
                                }
                            }}
                            id={`otp-${i}`}
                        />
                    ))}
                </div>

                <button onClick={onFinish} className="w-full max-w-[300px] min-h-[56px] bg-warm-orange text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-md">
                    Verify and Continue <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <div className="mt-5 text-gray-400 text-[15px]">
                    Did not receive code? <button className="text-warm-orange font-semibold">Resend in 30s</button>
                </div>
            </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-white overflow-hidden">
        <AnimatePresence mode="wait">
            {renderSlides()}
        </AnimatePresence>
    </div>
  );
};

export default Onboarding;
