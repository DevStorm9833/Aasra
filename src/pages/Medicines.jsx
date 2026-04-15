import React from 'react';
import { Pill, Trophy, CheckCircle, PlusCircle, Mic, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

const Medicines = () => {
  const medicines = [
    { name: 'Diabetes Tablet', time: '8:00 AM', desc: 'Before breakfast', status: 'taken' },
    { name: 'BP Medicine', time: '10:30 AM', desc: 'After breakfast', status: 'pending' },
    { name: 'Vitamin D', time: '6:00 PM', desc: 'After dinner', status: 'upcoming' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <Pill className="w-7 h-7 text-warm-orange" /> Medicine Reminders
        </h1>
        <div className="flex gap-2.5 items-center">
            <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
                <Volume2 className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sage-green to-[#7BA35D] text-white text-center p-7 rounded-md mb-5 shadow-sm">
        <div className="mb-2.5 flex justify-center">
          <Trophy className="w-10 h-10" />
        </div>
        <h3 className="font-poppins text-[28px] font-bold">14 Day Streak</h3>
        <p className="text-lg mt-1.5 opacity-90">You are doing great, Rajesh!</p>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <h3 className="font-poppins text-xl font-bold mb-4 flex items-center gap-2.5">
          <Pill className="w-6 h-6" /> Today's Medicines
        </h3>
        <div className="space-y-2.5">
          {medicines.map((med, i) => (
            <div 
              key={i} 
              className={clsx(
                "p-4 rounded-sm border-l-4 transition-all",
                med.status === 'taken' ? "bg-[#F0FDF4] border-sage-green" : 
                med.status === 'pending' ? "bg-[#FFF7ED] border-warm-orange" : 
                "bg-cream-white border-gray-300"
              )}
            >
              <div className="font-semibold flex items-center gap-2 text-base">
                <Pill className={clsx(
                  "w-4.5 h-4.5",
                  med.status === 'taken' ? "text-sage-green" : 
                  med.status === 'pending' ? "text-warm-orange" : 
                  "text-gray-400"
                )} />
                {med.time} - {med.name}
              </div>
              <div className="text-[15px] text-gray-500">{med.desc}</div>
              {med.status === 'taken' && (
                <div className="text-muted-teal font-semibold mt-1 flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4" /> Taken
                </div>
              )}
              {med.status === 'pending' && (
                <button className="mt-2 text-sm font-semibold text-white bg-sage-green px-4 py-2 rounded-pill flex items-center gap-1.5 hover:bg-[#8BA86E]">
                  <CheckCircle className="w-4 h-4" /> Mark as Taken
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 min-h-[56px] bg-sage-green text-white rounded-pill text-lg font-semibold flex items-center justify-center gap-2.5 shadow-md">
          <Mic className="w-5 h-5" /> Voice: "I took my medicine"
        </button>
        <button className="flex-1 min-h-[56px] bg-white text-deep-navy border-2 border-soft-lavender rounded-pill text-lg font-semibold flex items-center justify-center gap-2 shadow-sm">
          <PlusCircle className="w-5 h-5" /> Add New Medicine
        </button>
      </div>
    </div>
  );
};

export default Medicines;
