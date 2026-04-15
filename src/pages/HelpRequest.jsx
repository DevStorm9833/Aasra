import React, { useState } from 'react';
import { HandHelping, Volume2, Mic, ShoppingCart, Pill, Smartphone, HeartHandshake, Wrench, Car, FileText, Clock, MapPin, Send, Check } from 'lucide-react';
import { clsx } from 'clsx';

const HelpRequest = ({ openVoiceModal }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [timing, setTiming] = useState('Right Now');

  const helpTypes = [
    { id: 'grocery', icon: ShoppingCart, label: 'Grocery Shopping', desc: 'Need someone to buy groceries' },
    { id: 'medicine', icon: Pill, label: 'Medicine Pickup', desc: 'Need medicines from pharmacy' },
    { id: 'tech', icon: Smartphone, label: 'Technology Help', desc: 'Help with phone, UPI, internet' },
    { id: 'companion', icon: HeartHandshake, label: 'Companionship', desc: 'Someone to talk to or walk' },
    { id: 'repair', icon: Wrench, label: 'Home Repair', desc: 'Repairs and maintenance at home' },
    { id: 'transport', icon: Car, label: 'Transportation', desc: 'Ride to doctor, temple, market' },
  ];

  const timings = ['Right Now', 'Today', 'Tomorrow', 'Schedule for Later'];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <HandHelping className="w-7 h-7 text-warm-orange" /> Request Help
        </h1>
        <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[#FFF5EB] border-2 border-warm-orange rounded-md p-6 text-center mb-6">
        <div className="text-lg font-semibold mb-3">What help do you need?</div>
        <button 
          onClick={openVoiceModal}
          className="w-full max-w-[300px] mx-auto min-h-[56px] bg-sage-green text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2.5 hover:bg-[#8BA86E] active:scale-95 transition-all shadow-md"
        >
          <Mic className="w-5 h-5" /> Tap and speak
        </button>
      </div>

      <div className="font-bold text-lg mb-3">Select Type of Help</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {helpTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={clsx(
              "flex items-center gap-4 p-4.5 bg-white rounded-md text-left transition-all border-2 shadow-sm",
              selectedType === type.id ? "border-warm-orange bg-[#FFF5EB]" : "border-transparent hover:border-soft-lavender"
            )}
          >
            <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-cream-white rounded-xl">
              <type.icon className="w-6.5 h-6.5 text-warm-orange" />
            </div>
            <div>
              <div className="font-bold text-[17px] mb-0.5">{type.label}</div>
              <div className="text-[15px] text-gray-500">{type.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-5">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="w-4.5 h-4.5" /> Describe Your Situation (Optional)
        </div>
        <textarea 
          placeholder="Example: I need sugar-free groceries and my blood pressure medicine..."
          className="w-full p-4 border-2 border-soft-lavender rounded-sm font-sans text-[17px] bg-white outline-none focus:border-warm-orange transition-all min-h-[120px]"
        />
        <button className="mt-2 w-full max-w-[300px] min-h-[56px] bg-soft-lavender rounded-pill text-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#B3A4D4] transition-all">
          <Mic className="w-4.5 h-4.5" /> Tap to speak instead of typing
        </button>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <div className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4.5 h-4.5" /> When Do You Need Help?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {timings.map((t) => (
            <button
              key={t}
              onClick={() => setTiming(t)}
              className="flex items-center gap-3 p-3.5 cursor-pointer rounded-sm hover:bg-cream-white transition-all"
            >
              <div className={clsx(
                "w-5.5 h-5.5 border-3 rounded-full relative transition-all",
                timing === t ? "border-warm-orange" : "border-soft-lavender"
              )}>
                {timing === t && <div className="absolute inset-1 bg-warm-orange rounded-full" />}
              </div>
              <div className="text-[17px]">{t}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <div className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4.5 h-4.5" /> Location Sharing
        </div>
        <div className="mb-2 flex items-center gap-2">
          <Check className="w-4.5 h-4.5 text-sage-green" /> Share my location with volunteers (Recommended)
        </div>
        <div className="text-[15px] text-gray-500 bg-cream-white p-3 rounded-md">
          Your location helps volunteers find you faster. Location is deleted after help is completed.
        </div>
      </div>

      <button className="w-full max-w-[300px] min-h-[56px] bg-gradient-to-br from-warm-orange to-[#E07530] text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
        <Send className="w-5 h-5" /> Send Request
      </button>
    </div>
  );
};

export default HelpRequest;
