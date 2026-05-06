import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Accessibility } from 'lucide-react';

const PersonaSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    // Supabase stamp profile update logic would go here
    if(role === 'senior') navigate('/senior-hub');
    if(role === 'volunteer') navigate('/volunteer-hub');
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] flex flex-col items-center justify-center p-6 font-inter">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-[var(--color-primary-black)] font-poppins tracking-tight mb-6">Who are you?</h1>
        <p className="text-2xl md:text-3xl text-[var(--color-gray-mid)] font-bold">Please tap on your role to continue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl px-4">
        <button 
          onClick={() => handleSelection('senior')}
          className="bg-[#c2410c] text-white rounded-[3rem] p-12 md:p-24 shadow-[0_16px_0_0_#9a3412] hover:translate-y-[8px] hover:shadow-[0_8px_0_0_#9a3412] active:translate-y-[16px] active:shadow-none transition-all flex flex-col items-center justify-center text-center group border-none outline-none"
        >
          <Heart size={96} strokeWidth={2.5} className="mb-10 group-hover:scale-110 transition-transform" />
          <h2 className="text-4xl md:text-6xl font-black tracking-wide font-poppins leading-tight">I need a <br/>Companion</h2>
        </button>

        <button 
          onClick={() => handleSelection('volunteer')}
          className="bg-[#15803d] text-white rounded-[3rem] p-12 md:p-24 shadow-[0_16px_0_0_#14532d] hover:translate-y-[8px] hover:shadow-[0_8px_0_0_#14532d] active:translate-y-[16px] active:shadow-none transition-all flex flex-col items-center justify-center text-center group border-none outline-none"
        >
          <Accessibility size={96} strokeWidth={2.5} className="mb-10 group-hover:scale-110 transition-transform" />
          <h2 className="text-4xl md:text-6xl font-black tracking-wide font-poppins leading-tight">I want to <br/>Volunteer</h2>
        </button>
      </div>
    </div>
  );
};
export default PersonaSelection;
