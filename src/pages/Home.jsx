import React from 'react';
import { Sun, Volume2, Mic, HandHelping, AlertTriangle, Pill, Clock, CheckCircle, Bell, ShoppingCart, Sprout, Trophy, Lightbulb, Users, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fadeIn">
      {/* Top Bar for Desktop (In original HTML h1 is inside top-bar) */}
      <div className="flex items-center justify-between mb-7 flex-wrap gap-4">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <Sun className="w-7 h-7 text-warm-orange" /> Good Morning, Rajesh
        </h1>
        <div className="flex gap-2.5 items-center flex-wrap">
          <button className="px-[18px] py-2.5 rounded-pill border border-gray-200 bg-white text-[15px] font-semibold flex items-center gap-2 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm">
            <Volume2 className="w-4.5 h-4.5" /> Read Aloud
          </button>
          <button className="px-[18px] py-2.5 rounded-pill bg-warm-orange text-white text-[15px] font-semibold flex items-center gap-2 hover:bg-[#e87a34] hover:-translate-y-0.5 hover:shadow-sm">
            <HandHelping className="w-4.5 h-4.5" /> Get Help
          </button>
          <button className="px-[18px] py-2.5 rounded-pill bg-[#E74C3C] text-white text-[15px] font-semibold flex items-center gap-2 hover:bg-[#c0392b] hover:-translate-y-0.5 hover:shadow-sm">
            <AlertTriangle className="w-4.5 h-4.5" /> SOS
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-soft-peach to-[#FFE5D9] rounded-lg p-7 mb-5 shadow-sm">
        <p className="text-lg text-[#5A6B7C] mb-3.5">
          You have 3 medicine reminders today. Your next is at 10:30 AM.
        </p>
        <button className="inline-flex items-center gap-2 bg-white px-[18px] py-2.5 rounded-pill text-base font-bold shadow-sm hover:shadow-md">
          <Mic className="w-4.5 h-4.5" /> Tap to speak
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { icon: HandHelping, label: 'Need Help?', sub: 'Request support' },
          { icon: Pill, label: 'Medicines', sub: '3 reminders today' },
          { icon: Users, label: 'Community', sub: 'Connect & join' },
          { icon: MapPin, label: 'Safety Map', sub: 'My location' },
        ].map((action, i) => (
          <div key={i} className="bg-white rounded-md p-7 text-center shadow-sm cursor-pointer border-2 border-transparent transition-all hover:-translate-y-1 hover:shadow-md hover:border-warm-orange active:scale-[0.97]">
            <div className="mb-3 flex justify-center">
              <action.icon className="w-10 h-10 text-warm-orange" />
            </div>
            <div className="font-bold text-[17px] mb-1">{action.label}</div>
            <div className="text-sm text-gray-400">{action.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <h3 className="font-poppins text-xl font-bold mb-4 flex items-center gap-2.5">
          <Clock className="w-6 h-6" /> Upcoming
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4.5 bg-cream-white rounded-sm border-l-4 border-sage-green">
            <h4 className="text-[17px] font-bold mb-1 flex items-center gap-2">
              <Pill className="w-4.5 h-4.5 text-sage-green" /> 10:30 AM - BP Medicine
            </h4>
            <p className="text-[15px] text-gray-600 mb-2.5">Take after breakfast</p>
            <div className="flex gap-2 flex-wrap">
              <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 rounded-pill bg-sage-green text-white text-[15px] font-semibold hover:-translate-y-0.5 active:scale-95">
                <CheckCircle className="w-4.5 h-4.5" /> Taken
              </button>
              <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 rounded-pill border-2 border-soft-lavender bg-white text-deep-navy text-[15px] font-semibold hover:-translate-y-0.5 active:scale-95">
                <Bell className="w-4.5 h-4.5" /> Remind Later
              </button>
            </div>
          </div>
          <div className="p-4.5 bg-cream-white rounded-sm border-l-4 border-warm-orange">
            <h4 className="text-[17px] font-bold mb-1 flex items-center gap-2">
              <ShoppingCart className="w-4.5 h-4.5 text-warm-orange" /> 3:00 PM - Grocery with Priya
            </h4>
            <p className="text-[15px] text-gray-600 mb-2.5">Volunteer, Rating 4.9, 500m away</p>
            <div className="flex gap-2 flex-wrap">
              <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 rounded-pill bg-sage-green text-white text-[15px] font-semibold">
                <CheckCircle className="w-4.5 h-4.5" /> Confirm
              </button>
              <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 rounded-pill border-2 border-soft-lavender bg-white text-deep-navy text-[15px] font-semibold">
                <Phone className="w-4.5 h-4.5" /> Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-honey-yellow to-[#F39C12] text-deep-navy p-4.5 rounded-md mt-3 flex items-start gap-3">
        <Lightbulb className="w-6 h-6 shrink-0" />
        <div>
          <strong>Tip from AASRA</strong>
          <br />
          "Remember to drink water every hour. I will remind you!"
        </div>
      </div>
    </div>
  );
};

export default Home;
