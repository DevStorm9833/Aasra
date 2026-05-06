import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Mail } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');

  const handleSendOTP = (e) => {
    e.preventDefault();
    if(phone.length >= 10) setStep('otp');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if(otp === '123456') { 
      navigate('/persona');
    }
  };

  const handleGoogleAuth = async () => {
    // In production, trigger supabase.auth.signInWithOAuth({ provider: 'google' })
    navigate('/persona');
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] flex flex-col md:flex-row font-inter">
      {/* Senior Section */}
      <div className="flex-1 bg-[#c2410c] text-white p-10 md:p-20 flex flex-col justify-center items-center border-b-8 md:border-b-0 md:border-r-8 border-white/20">
        <div className="max-w-md w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-poppins tracking-tight">I am a Senior</h2>
          <p className="text-xl md:text-2xl opacity-95 mb-16 font-bold leading-relaxed">Log in easily with your mobile number. No passwords required.</p>
          
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-8">
              <div className="relative">
                <Smartphone className="absolute left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 opacity-50 text-[var(--color-primary-black)]" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number" 
                  className="w-full pl-24 pr-10 py-8 rounded-[2rem] text-3xl md:text-4xl text-[var(--color-primary-black)] font-black outline-none shadow-[0_12px_0_0_rgba(0,0,0,0.15)] focus:ring-8 ring-white/40 transition-all placeholder:text-[var(--color-primary-black)]/30"
                  autoFocus
                />
              </div>
              <button className="w-full py-8 bg-[var(--color-primary-black)] text-white text-3xl font-black uppercase tracking-widest rounded-[2rem] shadow-[0_12px_0_0_#000] hover:translate-y-2 hover:shadow-[0_6px_0_0_#000] active:translate-y-4 active:shadow-none transition-all">
                Send Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-8">
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000" 
                className="w-full px-10 py-8 rounded-[2rem] text-center tracking-[0.5em] text-4xl md:text-5xl text-[var(--color-primary-black)] font-black outline-none shadow-[0_12px_0_0_rgba(0,0,0,0.15)] focus:ring-8 ring-white/40 transition-all placeholder:text-[var(--color-primary-black)]/30"
                maxLength={6}
                autoFocus
              />
              <button className="w-full py-8 bg-[var(--color-primary-black)] text-white text-3xl font-black uppercase tracking-widest rounded-[2rem] shadow-[0_12px_0_0_#000] hover:translate-y-2 hover:shadow-[0_6px_0_0_#000] active:translate-y-4 active:shadow-none transition-all">
                Verify
              </button>
              <button type="button" onClick={() => setStep('phone')} className="text-white/80 font-bold text-xl hover:text-white underline p-4">Back to Phone Number</button>
            </form>
          )}
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="flex-1 bg-[#15803d] text-white p-10 md:p-20 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-poppins tracking-tight">I want to Volunteer</h2>
          <p className="text-xl md:text-2xl opacity-95 mb-16 font-bold leading-relaxed">Use your existing Google account for quick access.</p>
          
          <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-6 py-8 bg-white text-[var(--color-primary-black)] text-2xl md:text-3xl font-black uppercase tracking-widest rounded-[2rem] shadow-[0_12px_0_0_#cbd5e1] hover:translate-y-2 hover:shadow-[0_6px_0_0_#cbd5e1] active:translate-y-4 active:shadow-none transition-all">
            <Mail className="w-10 h-10 text-blue-600" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
