import React from 'react';
import { ShieldCheck, Volume2, CheckCircle, MapPin, Home, ShoppingBag, Pill as PharmIcon, History, Bell, Circle } from 'lucide-react';

const SafetyMap = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <ShieldCheck className="w-7 h-7 text-sage-green" /> My Safety Map
        </h1>
        <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[#F0FDF4] border-l-4 border-sage-green p-4.5 mb-5 shadow-sm">
        <div className="font-semibold text-sage-green flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5" /> Location Sharing: Active
        </div>
        <div className="text-[15px] text-[#5A6B7C] mt-1">Only when you need help. Always private otherwise.</div>
      </div>

      <div className="w-full h-[260px] bg-gradient-to-br from-[#E8D5F5] to-[#D8F3DC] rounded-md flex flex-col items-center justify-center relative mb-5 shadow-sm">
          <MapPin className="w-12 h-12 opacity-60 mb-2.5" />
          <div className="text-base font-semibold">Your Area</div>
          <div className="flex gap-5 mt-2.5 text-[14px] text-gray-500">
            <span className="flex items-center gap-1.5"><Home className="w-4.5 h-4.5" /> Home</span>
            <span className="flex items-center gap-1.5"><ShoppingBag className="w-4.5 h-4.5" /> Market 500m</span>
            <span className="flex items-center gap-1.5"><PharmIcon className="w-4.5 h-4.5" /> Pharmacy 300m</span>
          </div>
          <div className="mt-1.5 text-sm text-gray-400">Volunteers nearby: 3</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-5">
        <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)]">
            <div className="font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5" /> Safe Zones
            </div>
            <div className="p-4 bg-[#F0FDF4] rounded-sm border-l-4 border-sage-green mb-2.5">
                <div className="font-semibold flex items-center gap-2 mb-1">
                    <Home className="w-4.5 h-4.5" /> Home Zone (200m)
                </div>
                <div className="text-sm text-[#5A6B7C]">Family alerted if you leave this area</div>
            </div>
            <div className="p-4 bg-[#FFF7ED] rounded-sm border-l-4 border-warm-orange">
                <div className="font-semibold flex items-center gap-2 mb-1">
                    <ShoppingBag className="w-4.5 h-4.5" /> Market Zone (100m)
                </div>
                <div className="text-sm text-[#5A6B7C]">Safe to visit without alerts</div>
            </div>
        </div>

        <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)]">
            <div className="font-bold mb-3 flex items-center gap-2">
                <History className="w-4.5 h-4.5" /> Recent Activity
            </div>
            <div className="space-y-1">
                {[
                    { time: 'Today 8:30', activity: 'Morning Walk (30 min)' },
                    { time: 'Today 7:00', activity: 'Home (Safe)' },
                    { time: 'Yesterday', activity: 'Market (Safe)' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-gray-100 last:border-none text-[15px]">
                        <span className="font-semibold min-w-[100px] text-sm">{item.time}</span>
                        <span>{item.activity}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)]">
        <div className="font-bold mb-3 flex items-center gap-2">
            <Bell className="w-4.5 h-4.5" /> Alert Preferences
        </div>
        <div className="space-y-2">
          {[
            'Notify family when I leave safe zone',
            'Share real-time location during SOS',
            'Share with volunteers only when requested'
          ].map((pref, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[15px]">
                {i < 2 ? <CheckCircle className="w-4.5 h-4.5 text-sage-green" /> : <Circle className="w-4.5 h-4.5 text-gray-300" />}
                {pref}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
