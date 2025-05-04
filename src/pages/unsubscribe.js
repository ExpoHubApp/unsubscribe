import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function UnsubscribeForm() {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    comment: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, reason, comment } = formData

    const { error } = await supabase.from('unsubscribes').insert([
      { email, reason, comment }
    ])

    if (error) {
      console.error('Supabase insert error:', error.message)
      alert('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral text-green-700 px-4">
        <img src="/expohub-logo.png" alt="ExpoHub Logo" className="h-12 mb-6" />
        <p className="text-xl font-semibold text-center">✅ You’ve been unsubscribed. Thank you.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
          <div className="flex justify-center mb-6">
            <img src="/expohub-logo.png" alt="ExpoHub Logo" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Manage Your Emails
          </h2>

          <label className="block mb-2 text-sm font-medium text-slate-700">
            Email (required):
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <label className="block mb-2 text-sm font-medium text-slate-700">
            Reason for unsubscribing:
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded mb-4"
          >
            <option value="">Select a reason</option>
            <option value="Not interested">Not interested</option>
            <option value="Too many emails">Too many emails</option>
            <option value="Not the right person">Not the right person</option>
            <option value="Other">Other</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-slate-700">
            Comments (optional):
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded mb-6"
          />

          <button
            type="submit"
            className="w-full bg-[#003366] text-white py-2 rounded-xl hover:shadow-xl transition"
          >
            Unsubscribe
          </button>
        </form>
      </div>
    </div>
  )
}
