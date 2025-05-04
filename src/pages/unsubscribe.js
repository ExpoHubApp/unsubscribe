import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);
    setError('');

    const { error: supabaseError } = await supabase
      .from('unsubscribes')
      .insert([{ email, reason, comment }]);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbx1AO5WMm9GVF5mtaSGYDr8genJV2QjeZ_hjQmdnqAkcX7b5x2GOPvzfCW8Q7Md8hUrhA/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason, comment }),
      });
    } catch (err) {
      console.error('Failed to sync with Google Sheets:', err);
    }

    if (supabaseError) {
      setError('Something went wrong, please try again.');
    } else {
      setSubmitted(true);
      setEmail('');
      setReason('');
      setComment('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg">
        <img
          src="/logo.png"
          alt="ExpoHub Logo"
          className="mx-auto mb-6 h-12"
        />
        {submitted ? (
          <div className="text-center text-green-600 text-lg font-medium">
            You've been unsubscribed. Thank you.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center text-[#003366]">
              Unsubscribe from Emails
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-md px-4 py-2"
              />

              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
                required
              >
                <option value="">Reason for unsubscribing</option>
                <option value="Too many emails">Too many emails</option>
                <option value="Not relevant">Not relevant</option>
                <option value="Signed up by mistake">Signed up by mistake</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                placeholder="Optional comments..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              />

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003366] text-white py-2 rounded-xl hover:shadow-xl transition"
              >
                {loading ? 'Submitting...' : 'Unsubscribe'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
