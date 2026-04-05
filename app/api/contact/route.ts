import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'

const resend = new Resend(process.env.RESEND_API_KEY)

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Sanity
    const submission = await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    // Send email notification to admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_FORM_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
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
