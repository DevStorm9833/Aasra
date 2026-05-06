import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Mail } from 'lucide-react';

const subtleJaliPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 0h40L20 20zM0 40h40L20 20 0 40z' fill='%23FF7043' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
};

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
      navigate('/senior-hub');
    }
  };

  const handleGoogleAuth = async () => {
    navigate('/volunteer-hub');
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] flex flex-col md:flex-row font-inter p-6 md:p-12 gap-8 items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50" style={subtleJaliPattern}></div>
      
      {/* Senior Section */}
      <div className="flex-1 max-w-lg w-full bg-white/60 backdrop-blur-3xl p-10 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl shadow-[var(--color-primary-black)]/5 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-[var(--color-accent-orange)]/20 shadow-sm">
            For Seniors
          </span>
          <h2 className="text-4xl font-black mb-4 tracking-tight text-[var(--color-primary-black)] font-poppins">Welcome Back</h2>
          <p className="text-[var(--color-gray-mid)] font-medium leading-relaxed mb-10">Log in easily with your mobile number. No passwords required.</p>
          
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="relative">
                <Smartphone className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[var(--color-gray-mid)]" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number" 
                  className="w-full pl-16 pr-6 py-4 rounded-2xl text-lg text-[var(--color-primary-black)] font-medium bg-white/80 border border-[var(--color-gray-soft)] outline-none shadow-sm focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 transition-all placeholder:text-[var(--color-gray-mid)]"
                  autoFocus
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)] text-white font-bold uppercase text-[12px] tracking-widest rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                Send Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000" 
                className="w-full px-6 py-4 rounded-2xl text-center tracking-[0.5em] text-2xl text-[var(--color-primary-black)] font-bold bg-white/80 border border-[var(--color-gray-soft)] outline-none shadow-sm focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 transition-all placeholder:text-[var(--color-gray-mid)]/50"
                maxLength={6}
                autoFocus
              />
              <button className="w-full py-4 bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)] text-white font-bold uppercase text-[12px] tracking-widest rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                Verify
              </button>
              <button type="button" onClick={() => setStep('phone')} className="text-[var(--color-gray-mid)] font-medium text-sm hover:text-[var(--color-accent-orange)] transition-colors underline pt-2">Back to Phone Number</button>
            </form>
          )}
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="flex-1 max-w-lg w-full bg-white/60 backdrop-blur-3xl p-10 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl shadow-[var(--color-primary-black)]/5 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-green-500/20 shadow-sm">
            For Volunteers
          </span>
          <h2 className="text-4xl font-black mb-4 tracking-tight text-[var(--color-primary-black)] font-poppins">Join the Mission</h2>
          <p className="text-[var(--color-gray-mid)] font-medium leading-relaxed mb-10">Use your existing Google account for quick, secure access.</p>
          
          <button onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-3 py-4 bg-white text-[var(--color-primary-black)] text-sm font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all border border-[var(--color-gray-soft)]">
            <Mail className="w-5 h-5 text-blue-600" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
