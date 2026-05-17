import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const loadRazorpayScript = () => new Promise((resolve) => {
  const existing = document.getElementById('razorpay-js');
  if (existing) return resolve(true);
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.id = 'razorpay-js';
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('razorpay');
  const [userName, setUserName] = useState('Aasra');

  const amount = state?.amount || 0; // INR
  const sessionId = state?.sessionId || null;

  useEffect(() => {
    if (!state) {
      // If navigated here directly, go back
      navigate('/senior-hub');
    }
    // Fetch user's registered name
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (profileData?.full_name) {
          setUserName(profileData.full_name);
        }
      }
    };
    fetchUserName();
  }, [state, navigate]);

  const handlePay = async () => {
    setLoading(true);
    const ok = await loadRazorpayScript();
    if (!ok) {
      alert('Failed to load payment gateway. Please try again.');
      setLoading(false);
      return;
    }

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      alert('Razorpay key not configured. Set VITE_RAZORPAY_KEY_ID in .env.local');
      setLoading(false);
      return;
    }

    const options = {
      key,
      amount: amount * 100, // paisa
      currency: 'INR',
      name: userName,
      description: `Companion session payment - ₹${amount}`,
      // hint to checkout which method to prioritise - Razorpay Checkout will still present available options
      method: method === 'razorpay' ? undefined : 'upi',
      handler: async function (response) {
        try {
          // Record payment in Supabase
          await supabase.from('payments').insert({
            session_id: sessionId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || null,
            amount,
            status: 'paid'
          });

          // Update session status to confirmed
          if (sessionId) {
            await supabase.from('sessions').update({ status: 'confirmed' }).eq('id', sessionId);
          }

          alert('Payment successful! Thank you.');
          navigate('/senior-hub');
        } catch (err) {
          console.error('Payment record error', err);
          alert('Payment succeeded but failed to record transaction. Contact support.');
        }
      },
      prefill: {},
      theme: { color: '#4A90E2' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="mb-6 text-gray-600">You're paying for a companion session. Amount:</p>
        <div className="mb-8">
          <div className="text-4xl font-extrabold">₹{amount}</div>
          <div className="text-sm text-gray-500">One-time payment</div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold uppercase text-gray-600 mb-2">Choose payment method</label>
          <div className="flex gap-4 items-center">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" value="razorpay" checked={method === 'razorpay'} onChange={() => setMethod('razorpay')} />
              <span className="ml-1">Razorpay (card/netbanking/wallets)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" value="gpay" checked={method === 'gpay'} onChange={() => setMethod('gpay')} />
              <span className="ml-1">Google Pay</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} />
              <span className="ml-1">UPI</span>
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">Google Pay and UPI payments will open Razorpay's UPI flow when available.</p>
        </div>

        <button onClick={handlePay} disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-400 to-sky-400 text-white font-bold rounded-full shadow">
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>

        <p className="mt-4 text-sm text-gray-500">You'll be redirected to secure Razorpay checkout.</p>
      </div>
    </div>
  );
};

export default PaymentPage;
