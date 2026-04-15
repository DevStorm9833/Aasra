import React, { useState } from 'react';
import { Heart, Volume2, Smile, Meh, Frown, HelpCircle, Activity, BookOpen, Sprout, Leaf, Music, Video, Phone } from 'lucide-react';
import { clsx } from 'clsx';

const Community = () => {
  const [selectedMood, setSelectedMood] = useState('Neutral');

  const moods = [
    { id: 'Happy', icon: Smile, label: 'Happy' },
    { id: 'Okay', icon: Meh, label: 'Okay' },
    { id: 'Neutral', icon: Meh, label: 'Neutral' },
    { id: 'Sad', icon: Frown, label: 'Sad' },
    { id: 'Need Help', icon: HelpCircle, label: 'Need Help' },
  ];

  const clubs = [
    { name: 'Gardening Club', members: 45, meta: 'New post today', icon: Leaf, bg: 'bg-[#F0FDF4]', color: 'text-sage-green' },
    { name: 'Old Songs Club', members: 128, meta: 'Event tomorrow', icon: Music, bg: 'bg-[#FEF3C7]', color: 'text-[#D97706]' },
    { name: 'Book Reading Club', members: 34, meta: 'Discussion active', icon: BookOpen, bg: 'bg-[#EDE9FE]', color: 'text-[#7C3AED]' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-7">
        <h1 className="flex items-center gap-2.5 font-poppins text-[28px] font-bold">
          <Heart className="w-7 h-7 text-gentle-coral" /> Your Community
        </h1>
        <button className="px-4 py-2.5 rounded-pill border border-gray-200 bg-white">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <div className="font-semibold mb-3 flex items-center gap-2">
          <Smile className="w-4.5 h-4.5" /> How are you feeling today?
        </div>
        <div className="flex gap-3 justify-center flex-wrap my-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={clsx(
                "p-3.5 bg-white border-2 rounded-sm transition-all min-w-[60px] flex flex-col items-center gap-1 group",
                selectedMood === mood.id ? "border-warm-orange bg-[#FFF5EB] scale-105" : "border-gray-100 hover:border-soft-lavender"
              )}
            >
              <mood.icon className={clsx(
                "w-7 h-7 transition-colors",
                selectedMood === mood.id ? "text-warm-orange" : "text-gray-400 group-hover:text-deep-navy"
              )} />
              <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] mb-5">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1.5 bg-[#E74C3C] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE NOW
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4.5 bg-cream-white rounded-sm">
            <div className="font-semibold flex items-center gap-2 mb-2 text-base">
              <Activity className="w-4.5 h-4.5 text-sage-green" /> Morning Yoga - 8 participants
            </div>
            <button className="bg-sage-green text-white text-sm font-semibold px-4 py-2 rounded-pill hover:bg-[#8BA86E]">Join Now</button>
          </div>
          <div className="p-4.5 bg-cream-white rounded-sm">
            <div className="font-semibold flex items-center gap-2 mb-2 text-base">
              <BookOpen className="w-4.5 h-4.5 text-soft-lavender" /> Hindi Poetry - 12 participants
            </div>
            <button className="bg-sage-green text-white text-sm font-semibold px-4 py-2 rounded-pill hover:bg-[#8BA86E]">Join Now</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="font-bold text-lg mb-2.5 flex items-center gap-2">
            <Sprout className="w-4.5 h-4.5" /> My Clubs
          </div>
          <div className="space-y-3">
            {clubs.map((club) => (
              <div key={club.name} className="flex items-center gap-4 p-4.5 bg-white rounded-md shadow-sm transition-all hover:translate-x-1 hover:shadow-md cursor-pointer">
                <div className={clsx("shrink-0 w-12 h-12 rounded-xl flex items-center justify-center", club.bg)}>
                  <club.icon className={clsx("w-6 h-6", club.color)} />
                </div>
                <div>
                  <div className="font-bold text-[17px]">{club.name}</div>
                  <div className="text-[14px] text-gray-500">{club.members} members / {club.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-2.5 min-h-[50px] border-2 border-soft-lavender bg-white rounded-pill font-bold flex items-center justify-center gap-2 hover:bg-soft-lavender transition-all">
            <PlusCircle className="w-4.5 h-4.5" /> Join More Clubs
          </button>
        </div>

        <div>
          <div className="bg-white rounded-md p-6 shadow-sm border border-[rgba(197,185,224,0.15)] h-full">
            <div className="font-bold text-lg mb-4 flex items-center gap-2">
              <Video className="w-4.5 h-4.5" /> Connect with Family
            </div>
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {[
                { name: 'Rohit', theme: 'bg-indigo-500' },
                { name: 'Priya', theme: 'bg-warm-orange' },
                { name: 'Neha', theme: 'bg-sage-green' },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className={clsx("w-16 h-16 rounded-full flex items-center justify-center text-white mb-2 shadow-sm", member.theme)}>
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="font-bold text-[15px]">{member.name}</div>
                  <button className="mt-1.5 px-3 py-1.5 rounded-pill border-2 border-soft-lavender text-xs font-bold hover:bg-soft-lavender transition-all flex items-center gap-1 mx-auto">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
