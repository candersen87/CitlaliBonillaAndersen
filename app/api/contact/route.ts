import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'

const resend = new Resend(process.env.RESEND_API_KEY)

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate presence
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate types
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return Response.json({ error: 'Invalid input' }, { status: 400 })
    }

    // Validate lengths
    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return Response.json({ error: 'Input too long' }, { status: 400 })
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Save to Sanity
    const submission = await writeClient.create({
      _type: 'contactSubmission',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    })

    // Send email notification to admin (values escaped to prevent XSS)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_FORM_EMAIL!,
      subject: `New Contact Form Submission from ${escapeHtml(name.trim())}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
      `,
    })

    return Response.json(
      { success: true, id: submission._id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
