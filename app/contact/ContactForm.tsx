'use client'

import { useState } from 'react'
import Layout from '@/app/components/Layout'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-light mb-6 text-black text-center">Get in Touch</h1>
        <p className="text-lg text-gray-600 font-light mb-12 text-center">
          Have a question or want to commission a work? I'd love to hear from you.
        </p>

        {submitted && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 font-light">
            Thank you for your message! I'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-light mb-2 text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-light text-gray-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-light mb-2 text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={254}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-light text-gray-600"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-light mb-2 text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              maxLength={5000}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black font-light resize-none text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 border border-black font-light text-black hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </Layout>
  )
}
