import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface ContactNotificationProps {
  name: string
  email: string
  message: string
  submittedAt: string
}

export function ContactNotification({
  name,
  email,
  message,
  submittedAt,
}: ContactNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New message from {name} via bruglii.com</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>BRUGLII</Text>
          </Section>

          {/* Label */}
          <Section style={labelSection}>
            <Text style={label}>NEW CONTACT SUBMISSION</Text>
          </Section>

          {/* Main content */}
          <Section style={card}>
            <Heading style={senderName}>{name}</Heading>
            <Text style={senderEmail}>
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>
            </Text>

            <Hr style={divider} />

            <Text style={messageLabel}>MESSAGE</Text>
            <Text style={messageBody}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerMeta}>
              Received {submittedAt}
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerText}>
              Reply directly to{' '}
              <Link href={`mailto:${email}`} style={footerLink}>
                {email}
              </Link>{' '}
              to respond to this enquiry.
            </Text>
            <Text style={footerBrand}>bruglii.com</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#f5f5f3',
  fontFamily: "'Georgia', 'Times New Roman', serif",
  margin: 0,
  padding: '40px 0',
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
}

const header: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  padding: '28px 40px',
}

const brandName: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '13px',
  fontFamily: "'Arial', sans-serif",
  letterSpacing: '4px',
  fontWeight: 400,
  margin: 0,
}

const labelSection: React.CSSProperties = {
  padding: '20px 40px 0',
}

const label: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '10px',
  fontFamily: "'Arial', sans-serif",
  letterSpacing: '2px',
  fontWeight: 400,
  margin: 0,
}

const card: React.CSSProperties = {
  padding: '24px 40px 32px',
}

const senderName: React.CSSProperties = {
  color: '#1a1a1a',
  fontSize: '26px',
  fontWeight: 400,
  margin: '0 0 6px',
  lineHeight: '1.2',
}

const senderEmail: React.CSSProperties = {
  margin: '0 0 24px',
}

const emailLink: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  fontFamily: "'Arial', sans-serif",
  textDecoration: 'none',
}

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  borderTopWidth: '1px',
  margin: '0 0 24px',
}

const messageLabel: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '10px',
  fontFamily: "'Arial', sans-serif",
  letterSpacing: '2px',
  fontWeight: 400,
  margin: '0 0 10px',
}

const messageBody: React.CSSProperties = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const footerSection: React.CSSProperties = {
  padding: '0 40px 32px',
}

const footerMeta: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '12px',
  fontFamily: "'Arial', sans-serif",
  margin: '0 0 16px',
}

const footerDivider: React.CSSProperties = {
  borderColor: '#f3f4f6',
  borderTopWidth: '1px',
  margin: '0 0 16px',
}

const footerText: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '12px',
  fontFamily: "'Arial', sans-serif",
  margin: '0 0 8px',
}

const footerLink: React.CSSProperties = {
  color: '#6b7280',
  textDecoration: 'underline',
}

const footerBrand: React.CSSProperties = {
  color: '#d1d5db',
  fontSize: '11px',
  fontFamily: "'Arial', sans-serif",
  letterSpacing: '2px',
  margin: 0,
}
