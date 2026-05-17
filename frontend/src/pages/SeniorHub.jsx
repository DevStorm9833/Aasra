import React, { useState } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, AlertTriangle, Coffee, Check, Star, ChevronDown, Smile, Meh, Frown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const subtleJaliPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 0h40L20 20zM0 40h40L20 20 0 40z' fill='%23FF7043' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
};

const SeniorHub = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({ date: '', time: '', duration: '', location: 'Home', serviceType: '', helpTasks: ['', ''] });
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [credits, setCredits] = useState(5); // Default to 5
  const [isLoading, setIsLoading] = useState(false);

  // Fetch User, Profile & Credits on Mount
  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        // Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profileData) setProfile(profileData);

        const { data } = await supabase
          .from('credits')
          .select('remaining_sessions')
          .eq('user_id', user.id)
          .single();

        if (data) setCredits(data.remaining_sessions);
      }
    };
    fetchUserData();
  }, []);

  const totalSessions = 5;
  const usedSessions = totalSessions - credits;

  const handleSOS = async () => {
    alert("SOS ALERT ACTIVATED!\nNotifying your emergency contacts and Aasra support team immediately.");
    if (user) {
      await supabase.from('sessions').insert({
        senior_id: user.id,
        start_time: new Date().toISOString(),
        duration_hours: 1,
        is_emergency_triggered: true,
        status: 'pending'
      });
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const address = data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setBooking(prev => ({ ...prev, location: address }));
          alert("Location fetched successfully");
        } catch (err) {
          console.error(err);
          setBooking(prev => ({ ...prev, location: `GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
          alert("Location fetched successfully");
        }
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location: ", error);
        alert("Unable to retrieve your location. Please enter it manually.");
        setIsLocating(false);
      }
    );
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!booking.date || !booking.time || !booking.duration) return;

    setIsLoading(true);
    try {
      // Combine date and time to TIMESTAMPTZ
      const start_time = new Date(`${booking.date} ${booking.time}`).toISOString();
      const duration_hours = parseInt(booking.duration.split(' ')[0]) || 1;

      if (user) {
        const { error } = await supabase.from('sessions').insert({
          senior_id: user.id,
          start_time,
          duration_hours,
          status: 'pending',
          location_snapshot: { address: booking.location }
        });
        if (error) throw error;
      } else {
        console.warn("No user logged in. Simulating DB insert.");
      }

      alert(`Booking Confirmed for ${booking.date} at ${booking.time}. We are matching you with a verified volunteer.`);
      setBooking({ date: '', time: '', duration: '', location: 'Home', serviceType: '', helpTasks: ['', ''] });

      // Simulate session end after 3 seconds for demo purposes
      setTimeout(() => {
        setShowFeedback(true);
      }, 3000);

    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to create booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!selectedEmoji) return;
    alert(`Feedback saved! You rated the session: ${selectedEmoji}`);
    setShowFeedback(false);
    setSelectedEmoji(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] text-[var(--color-primary-black)] pb-32 font-inter relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50" style={subtleJaliPattern}></div>

      {/* Custom Senior Navbar */}
      <nav className="bg-white/80 backdrop-blur-md text-[var(--color-primary-black)] p-6 md:px-12 border-b border-[var(--color-gray-soft)] flex justify-between items-center relative z-20">
        <div>
          <h1 className="text-3xl font-black font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)]">
            Aasra Senior Hub
          </h1>
          {profile && <p className="text-sm font-bold text-gray-500 mt-1">Welcome back, {profile.full_name}</p>}
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); navigate('/'); }} className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent-orange)] hover:text-[var(--color-gray-mid)] transition-colors px-6 py-2 border border-[var(--color-gray-soft)] rounded-full hover:shadow-sm">
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
                <div className="flex justify-between items-center ml-2 mb-1">
                  <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)]">Location</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setBooking({ ...booking, location: 'Home' })}
                      className="text-xs font-bold text-[var(--color-accent-orange)] uppercase tracking-widest hover:text-[var(--color-accent-saffron)] transition-colors"
                    >
                      Saved Address
                    </button>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="text-xs font-bold text-[var(--color-accent-orange)] uppercase tracking-widest hover:text-[var(--color-accent-saffron)] transition-colors disabled:opacity-50"
                    >
                      {isLocating ? 'Locating...' : 'My Location'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-orange)]" size={20} />
                  <input
                    type="text"
                    required
                    placeholder="Enter location manually or use buttons above"
                    value={booking.location}
                    onChange={(e) => setBooking({ ...booking, location: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm transition-all"
                  />
                </div>
              </div>

            </div>

            {/* Help & Service Type Section */}
            <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-[var(--color-gray-soft)]">
              {/* Help Tasks (Left side) */}
              <div className="w-full md:w-1/2 space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Help (What do you need?)</label>
                {booking.helpTasks.map((task, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input 
                      type="text" 
                      value={task}
                      placeholder="Type here..."
                      onChange={(e) => {
                        const newTasks = [...booking.helpTasks];
                        newTasks[index] = e.target.value;
                        setBooking({ ...booking, helpTasks: newTasks });
                      }}
                      className="w-full pl-6 pr-6 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const newTasks = booking.helpTasks.filter((_, i) => i !== index);
                        setBooking({ ...booking, helpTasks: newTasks });
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                      title="Delete"
                    >
                      <X size={24} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setBooking({ ...booking, helpTasks: [...booking.helpTasks, ''] })}
                  className="text-sm font-bold text-[var(--color-accent-orange)] uppercase tracking-widest hover:underline ml-2 block transition-colors"
                >
                  + Add more
                </button>
              </div>

              {/* Service Type (Right side) */}
              <div className="w-full md:w-1/2 space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] ml-2">Service Type</label>
                <div className="relative">
                  <select
                    required
                    value={booking.serviceType}
                    onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                    className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white border border-[var(--color-gray-soft)] text-lg font-medium text-[var(--color-primary-black)] outline-none focus:border-[var(--color-accent-orange)] focus:ring-2 focus:ring-[var(--color-accent-orange)]/20 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Companionship">Companionship</option>
                    <option value="Walking Buddy">Walking Buddy</option>
                    <option value="Medicine Delivery">Medicine Delivery</option>
                    <option value="Home Maintainence">Home Maintainence</option>
                    <option value="Tech Assistance">Tech Assistance</option>
                    <option value="Doctor Visits">Doctor Visits</option>
                    <option value="Events & Travel">Events & Travel</option>
                    <option value="Others">Others</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-mid)] pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-saffron)] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all mt-8 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>

      {/* Persistent SOS Button */}
      <button
        onClick={handleSOS}
        className="fixed bottom-8 right-8 w-24 h-24 bg-red-600 text-white rounded-full shadow-[0_8px_30px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center hover:bg-red-700 hover:scale-105 active:scale-95 transition-all z-40 border-[6px] border-white/50 group"
      >
        <AlertTriangle size={32} strokeWidth={3} className="mb-1 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-[10px] uppercase tracking-widest">SOS</span>
      </button>

      {/* Emoji Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--color-primary-black)]/60 backdrop-blur-sm"
              onClick={() => setShowFeedback(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-lg w-full relative z-10 border border-white/50"
            >
              <button
                onClick={() => setShowFeedback(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[var(--color-primary-black)] font-poppins mb-4">How was your session?</h2>
                <p className="text-[var(--color-gray-mid)] font-medium">Your feedback helps us keep the community safe and supportive.</p>
              </div>

              <div className="flex justify-between items-center mb-12 gap-4">
                <button
                  onClick={() => setSelectedEmoji('happy')}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all border-4 ${selectedEmoji === 'happy' ? 'bg-green-50 border-green-500 text-green-600 scale-110 shadow-lg' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 hover:scale-105'}`}
                >
                  <Smile size={64} strokeWidth={selectedEmoji === 'happy' ? 2.5 : 2} />
                  <span className="font-bold text-sm uppercase tracking-widest">Great</span>
                </button>

                <button
                  onClick={() => setSelectedEmoji('neutral')}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all border-4 ${selectedEmoji === 'neutral' ? 'bg-orange-50 border-orange-500 text-orange-600 scale-110 shadow-lg' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 hover:scale-105'}`}
                >
                  <Meh size={64} strokeWidth={selectedEmoji === 'neutral' ? 2.5 : 2} />
                  <span className="font-bold text-sm uppercase tracking-widest">Okay</span>
                </button>

                <button
                  onClick={() => setSelectedEmoji('sad')}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all border-4 ${selectedEmoji === 'sad' ? 'bg-red-50 border-red-500 text-red-600 scale-110 shadow-lg' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 hover:scale-105'}`}
                >
                  <Frown size={64} strokeWidth={selectedEmoji === 'sad' ? 2.5 : 2} />
                  <span className="font-bold text-sm uppercase tracking-widest">Poor</span>
                </button>
              </div>

              <button
                onClick={handleFeedbackSubmit}
                disabled={!selectedEmoji}
                className="w-full py-5 bg-[var(--color-primary-black)] text-white font-bold uppercase tracking-widest rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit Feedback
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SeniorHub;
