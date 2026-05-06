import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, ShieldCheck, MapPin, Clock, Award, Star, AlertTriangle } from 'lucide-react';

const subtleJaliPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 0h40L20 20zM0 40h40L20 20 0 40z' fill='%2316A34A' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
};

const VolunteerHub = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'uploaded', 'verified'

  const handleIDUpload = () => {
    // Simulate upload delay
    setVerificationStatus('uploaded');
    setTimeout(() => {
      setVerificationStatus('verified');
      alert("✅ Identity Verification Complete. You are now an approved Aasra Volunteer!");
    }, 2000);
  };

  const activeRequests = [
    { id: 1, name: "Mr. Sharma", age: 72, task: "Grocery Shopping", distance: "1.2 km", time: "Tomorrow, 10:00 AM" },
    { id: 2, name: "Mrs. Desai", age: 68, task: "Tech Support (Phone Setup)", distance: "2.5 km", time: "Today, 4:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-primary-white)] text-[var(--color-primary-black)] pb-32 font-inter relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50" style={subtleJaliPattern}></div>

      {/* Volunteer Navbar */}
      <nav className="bg-white/80 backdrop-blur-md p-6 md:px-12 border-b border-[var(--color-gray-soft)] flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <ShieldCheck size={32} className="text-green-600" />
          <h1 className="text-3xl font-black font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500">
            Volunteer Hub
          </h1>
        </div>
        <button onClick={() => navigate('/')} className="text-sm font-bold uppercase tracking-widest text-[var(--color-gray-mid)] hover:text-green-600 transition-colors px-6 py-2 border border-[var(--color-gray-soft)] rounded-full hover:shadow-sm">
          Sign Out
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-6 mt-12 relative z-10 space-y-12">
        
        {/* Verification Status Banner */}
        {verificationStatus !== 'verified' && (
          <div className="bg-orange-50 border border-orange-200 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Account Verification Pending</h3>
                <p className="text-sm text-[var(--color-gray-mid)] font-medium max-w-lg">
                  To ensure the safety of our seniors, all volunteers must undergo a strict KYC ID verification process before accepting requests.
                </p>
              </div>
            </div>
            <button 
              onClick={handleIDUpload}
              disabled={verificationStatus === 'uploaded'}
              className="w-full md:w-auto px-8 py-4 bg-orange-600 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-orange-700 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {verificationStatus === 'uploaded' ? (
                <>Verifying ID...</>
              ) : (
                <><Upload size={18} /> Upload Aadhaar/ID</>
              )}
            </button>
          </div>
        )}

        {/* Reputation & Badges Section */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-xl shadow-[var(--color-primary-black)]/5 border border-white/50">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-[var(--color-primary-black)] font-poppins">
            <Award className="text-green-600" size={28} /> 
            My Reputation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-4xl font-black text-green-600 mb-2">0</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Sessions</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-4xl font-black text-green-600 mb-2">0</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Hours</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="flex text-amber-400 mb-2">
                <Star size={24} fill="currentColor" className="opacity-30" />
                <Star size={24} fill="currentColor" className="opacity-30" />
                <Star size={24} fill="currentColor" className="opacity-30" />
                <Star size={24} fill="currentColor" className="opacity-30" />
                <Star size={24} fill="currentColor" className="opacity-30" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Rating</span>
            </div>
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-inner text-gray-500 border border-gray-300 border-dashed">
              <ShieldCheck size={32} className="mb-2 opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Badge Locked</span>
            </div>
          </div>
        </div>

        {/* Active Requests */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-[var(--color-primary-black)] font-poppins">Local Requests</h2>
            {verificationStatus !== 'verified' && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-full uppercase tracking-widest">Verification Required</span>
            )}
          </div>
          {activeRequests.map((req) => (
            <div key={req.id} className={`bg-white rounded-[2rem] p-8 border ${verificationStatus === 'verified' ? 'border-green-100 shadow-sm hover:shadow-md transition-shadow' : 'border-gray-200 opacity-60 pointer-events-none filter grayscale'}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold">{req.name}</h3>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{req.age} yrs</span>
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-4">{req.task}</p>
                  <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><MapPin size={16} className="text-green-600" /> {req.distance}</span>
                    <span className="flex items-center gap-2"><Clock size={16} className="text-green-600" /> {req.time}</span>
                  </div>
                </div>
                <button className="w-full md:w-auto px-10 py-4 bg-green-600 text-white font-bold uppercase text-sm tracking-widest rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg">
                  Accept Request
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VolunteerHub;
