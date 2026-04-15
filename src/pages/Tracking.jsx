import React from 'react';
import { Navigation, CheckCircle, User, Phone, MessageSquare, Map, Info, Volume2 } from 'lucide-react';

const Tracking = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <Navigation className="w-7 h-7 text-warm-orange" /> Request Status
        </h1>
        <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-soft-peach to-[#FFE5D9] rounded-md text-center p-8 mb-5 shadow-sm">
        <div className="mb-3 flex justify-center">
          <CheckCircle className="w-12 h-12 text-sage-green" />
        </div>
        <h3 className="font-poppins text-2xl font-bold mb-2">Request Sent</h3>
        <p className="text-[#5A6B7C]">Looking for a volunteer near you...</p>
        <div className="flex gap-1.5 justify-center my-5">
          <div className="w-2.5 h-2.5 rounded-full bg-warm-orange" />
          <div className="w-2.5 h-2.5 rounded-full bg-warm-orange" />
          <div className="w-2.5 h-2.5 rounded-full bg-warm-orange" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>
        <p className="text-[15px] text-gray-500">Volunteers nearby: 12 / Estimated response: 2-5 mins</p>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-6 h-6 text-sage-green" />
          <strong className="text-lg">Volunteer Found</strong>
        </div>
        <div className="flex gap-4.5 items-center mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-soft-lavender to-warm-orange rounded-full flex items-center justify-center text-white shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-lg mb-0.5">Priya Sharma</div>
            <div className="text-[15px] text-gray-400">Rating: 4.9 out of 5 (127 helps completed)</div>
            <div className="text-sm text-gray-400 mt-1">500 meters away, 6 min walk</div>
            <div className="text-muted-teal font-semibold text-sm">Arriving by 3:15 PM</div>
          </div>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <button className="px-4 py-2.5 rounded-pill bg-sage-green text-white text-[15px] font-semibold flex items-center gap-1.5">
            <Phone className="w-4.5 h-4.5" /> Call Priya
          </button>
          <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white text-deep-navy text-[15px] font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-4.5 h-4.5" /> Message
          </button>
          <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white text-deep-navy text-[15px] font-semibold flex items-center gap-1.5">
            <Map className="w-4.5 h-4.5" /> Track on Map
          </button>
        </div>
      </div>

      <div className="w-full h-[240px] bg-gradient-to-br from-[#E8D5F5] to-[#D8F3DC] rounded-md flex flex-col items-center justify-center relative mb-5">
        <Map className="w-12 h-12 opacity-60 mb-2.5" />
        <div className="text-base">Live Map View</div>
        <div className="flex gap-5 mt-2.5 text-[15px] text-gray-600">
          <span className="flex items-center gap-1.5"><Navigation className="w-4 h-4" /> You</span>
          <span className="flex items-center gap-1.5"><Navigation className="w-4 h-4 rotate-45" /> Volunteer 500m</span>
        </div>
        <div className="mt-2.5 bg-white/85 px-4 py-2 rounded-pill text-sm font-semibold shadow-sm">
          Volunteer is on their way, ETA: 6 minutes
        </div>
      </div>

      <div className="bg-soft-lavender p-4.5 rounded-md flex items-start gap-3">
        <Info className="w-6 h-6 shrink-0" />
        <div className="text-[15px]">
          <strong>Tip:</strong> You can call the volunteer directly if you need to share more details.
        </div>
      </div>
    </div>
  );
};

export default Tracking;
