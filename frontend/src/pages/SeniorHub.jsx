import React, { useState } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, AlertTriangle, Coffee, Check, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const subtleJaliPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 0h40L20 20zM0 40h40L20 20 0 40z' fill='%23FF7043' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
};

const SeniorHub = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({ date: '', time: '', duration: '', location: 'Home' });

  // Dummy wallet state
  const totalSessions = 5;
  const usedSessions = 3;

  const handleSOS = () => {
    alert("SOS ALERT ACTIVATED!\nNotifying your emergency contacts and Aasra support team immediately.");
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!booking.date || !booking.time || !booking.duration) return;
    alert(`Booking Confirmed for ${booking.date} at ${booking.time} for ${booking.duration}. We are matching you with a verified volunteer.`);
    setBooking({ date: '', time: '', duration: '', location: 'Home' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] text-[var(--color-primary-black)] pb-32 font-inter relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50" style={subtleJaliPattern}></div>

      {/* Custom Senior Navbar */}
      <nav className="bg-white/80 backdrop-blur-md text-[var(--color-primary-black)] p-6 md:px-12 border-b border-[var(--color-gray-soft)] flex justify-between items-center relative z-20">
        <h1 className="text-3xl font-black font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)]">
          Aasra Senior Hub
        </h1>
        <button onClick={() => navigate('/')} className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] hover:text-[var(--color-accent-orange)] transition-colors px-6 py-2 border border-[var(--color-gray-soft)] rounded-full hover:shadow-sm">
          Sign Out
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-6 mt-12 relative z-10">

        {/* Wallet Component */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-xl shadow-[var(--color-primary-black)]/5 border border-white/50 mb-12">
          <h2 className="text-2xl font-black mb-2 flex items-center gap-3 text-[var(--color-primary-black)] font-poppins">
            <Coffee className="text-[var(--color-accent-orange)]" size={28} strokeWidth={2.5} />
            Session Wallet
          </h2>
          <p className="text-sm font-medium text-[var(--color-gray-mid)] mb-8">You have {totalSessions - usedSessions} free sessions remaining this month.</p>
          <div className="flex flex-wrap gap-4">
            {[...Array(totalSessions)].map((_, i) => (
              <div key={i} className={`flex-1 min-w-[60px] h-20 rounded-2xl flex items-center justify-center border-2 transition-all ${i < usedSessions ? 'bg-[var(--color-accent-orange)]/10 border-[var(--color-accent-orange)]/30 text-[var(--color-accent-orange)]' : 'bg-white border-[var(--color-gray-soft)] text-[var(--color-gray-soft)] shadow-sm'}`}>
                {i < usedSessions ? <Check size={32} strokeWidth={3} /> : <Star size={24} />}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-xl shadow-[var(--color-primary-black)]/5 border border-white/50 relative overflow-hidden">
          <h2 className="text-3xl font-black mb-8 text-[var(--color-primary-black)] font-poppins">Request a Companion</h2>

          <form onSubmit={handleBookingSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Select Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-mid)]" size={20} />
                  <input
                    type="date"
                    required
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-mid)]" size={20} />
                  <select
                    required
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Choose preferred time</option>
                    <option value="09:00 AM">Morning (09:00 AM)</option>
                    <option value="12:00 PM">Noon (12:00 PM)</option>
                    <option value="03:00 PM">Afternoon (03:00 PM)</option>
                    <option value="06:00 PM">Evening (06:00 PM)</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-mid)] pointer-events-none" size={20} />
                </div>
              </div>

              {/* Duration Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Duration</label>
                <div className="relative">
                  <select
                    required
                    value={booking.duration}
                    onChange={(e) => setBooking({ ...booking, duration: e.target.value })}
                    className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>How long?</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="2 Hours">2 Hours</option>
                    <option value="3 Hours">3 Hours</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-mid)] pointer-events-none" size={20} />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-orange)]" size={20} />
                  <input
                    type="text"
                    disabled
                    value={booking.location}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-gray-mid)] outline-none shadow-sm cursor-not-allowed"
                  />
                  <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xs font-bold text-[var(--color-accent-orange)] uppercase tracking-widest">Saved Address</span>
                </div>
              </div>

            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all mt-8"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {/* Persistent SOS Button */}
      <button
        onClick={handleSOS}
        className="fixed bottom-8 right-8 w-24 h-24 bg-red-600 text-white rounded-full shadow-[0_8px_30px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center hover:bg-red-700 hover:scale-105 active:scale-95 transition-all z-50 border-[6px] border-white/50 group"
      >
        <AlertTriangle size={32} strokeWidth={3} className="mb-1 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-[10px] uppercase tracking-widest">SOS</span>
      </button>

    </div>
  );
};

export default SeniorHub;
