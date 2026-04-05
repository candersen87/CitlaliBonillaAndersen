import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Ally Bruglii to commission a painting or ask a question.',
  openGraph: {
    title: 'Contact — Ally Bruglii',
    description: 'Commission a painting or get in touch with Ally Bruglii.',
    url: 'https://allybruglii.com/contact',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
