import { Resend } from 'resend'
import { render } from '@react-email/render'
import { client } from '@/sanity/lib/client'
import { ContactNotification } from '@/app/emails/ContactNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    // Send email notification to admin
    const submittedAt = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    const html = await render(
      ContactNotification({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        submittedAt,
      })
    )

    await resend.emails.send({
      from: 'Bruglii <notifications@citlalibonillaandersen.com>',
      to: process.env.CONTACT_FORM_EMAIL!,
      replyTo: email.trim(),
      subject: `New message from ${name.trim()}`,
      html,
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
