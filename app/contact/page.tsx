import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Citlali Bonilla Andersen to commission a painting or ask a question.',
  openGraph: {
    title: 'Contact — Citlali Bonilla Andersen',
    description: 'Commission a painting or get in touch with Citlali Bonilla Andersen.',
    url: 'https://citlalibonillaandersen.com/contact',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
