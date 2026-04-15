import React, { useState } from 'react';
import { User, Volume2, Settings, Type, Moon, Globe, AlertTriangle, HeartPulse, LogOut, Phone } from 'lucide-react';
import { clsx } from 'clsx';

const Profile = () => {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <User className="w-7 h-7 text-warm-orange" /> My Profile
        </h1>
        <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="bg-white rounded-md p-8 shadow-sm border border-[rgba(197,185,224,0.15)] text-center mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-soft-lavender to-warm-orange rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
              R
            </div>
            <div className="font-poppins text-2xl font-bold">Rajesh Kumar</div>
            <div className="text-gray-400 mt-1">Trust Score: 4.8 / 47 Helps Received</div>
          </div>

          <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)]">
            <div className="font-bold mb-4 flex items-center gap-2">
                <Settings className="w-4.5 h-4.5" /> Settings
            </div>
            <div className="space-y-3">
              {[
                { icon: Type, label: 'Font Size', options: ['Small', 'Medium', 'Large', 'Extra Large'], selected: 'Medium' },
                { icon: Moon, label: 'High Contrast', toggle: true },
                { icon: Volume2, label: 'Voice Speed', options: ['Slow', 'Normal', 'Fast'], selected: 'Normal' },
                { icon: Globe, label: 'Language', options: ['English', 'Hindi', 'Marathi'], selected: 'English' },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
                    <div className="flex items-center gap-3 text-[17px]">
                        <setting.icon className="w-5 h-5 text-gray-500" /> {setting.label}
                    </div>
                    {setting.toggle ? (
                        <div 
                            onClick={() => setHighContrast(!highContrast)}
                            className={clsx(
                                "w-12 h-[26px] bg-gray-300 rounded-pill relative cursor-pointer transition-all",
                                highContrast && "bg-sage-green"
                            )}
                        >
                            <div className={clsx(
                                "absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full transition-all shadow-sm",
                                highContrast && "translate-x-[22px]"
                            )} />
                        </div>
                    ) : (
                        <select className="p-2 border-2 border-gray-100 rounded-md text-[15px] outline-none focus:border-warm-orange">
                            {setting.options.map(opt => (
                                <option key={opt} selected={opt === setting.selected}>{opt}</option>
                            ))}
                        </select>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
            <div className="font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4.5 h-4.5 text-[#E74C3C]" /> Emergency Contacts
            </div>
            <div className="space-y-px">
              {[
                { name: 'Rohit (Son)', phone: '+91 98765-43210', bg: 'bg-[#fbbf24]' },
                { name: 'Priya (Daughter)', phone: '+91 87654-32109', bg: 'bg-[#a78bfa]' }
              ].map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-none">
                  <div className={clsx("w-11 h-11 rounded-full flex items-center justify-center text-white", contact.bg)}>
                    <User className="w-5.5 h-5.5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  </div>
                  <button className="p-2 border border-gray-200 rounded-pill hover:bg-gray-50">
                    <Phone className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
            <div className="font-bold mb-4 flex items-center gap-2">
                <HeartPulse className="w-4.5 h-4.5 text-[#E74C3C]" /> Medical Conditions
            </div>
            <div className="flex flex-wrap gap-2">
                {['Diabetes Type 2', 'High Blood Pressure', 'No Known Allergies'].map((cond, i) => (
                    <span key={i} className={clsx(
                        "px-3.5 py-2 rounded-full text-[15px]",
                        i === 0 ? "bg-[#FEF3C7]" : i === 1 ? "bg-[#EDE9FE]" : "bg-[#F0FDF4]"
                    )}>{cond}</span>
                ))}
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-gray-500 font-semibold px-4 py-2 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
