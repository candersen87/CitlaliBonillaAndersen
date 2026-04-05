import type { Metadata } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

export const metadata: Metadata = {
  title: 'Commissions',
  description:
    'Commission a custom painting by Ally Bruglii. Work together to create a unique original piece tailored to your vision, space, and palette.',
}

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description:
      'We start with a conversation about your vision — the colours, mood, size, and the space where the work will live. Share references, inspiration, or simply a feeling you want to evoke.',
  },
  {
    number: '02',
    title: 'Concept Development',
    description:
      'Based on our conversation I develop initial sketches and colour studies. We refine the direction together until the concept feels right before work begins on the final piece.',
  },
  {
    number: '03',
    title: 'Creation',
    description:
      'Once the concept is approved, I begin the painting. The process typically takes 4–8 weeks depending on size and complexity. Progress photos are shared along the way.',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'The finished work is professionally packaged and shipped directly to you, accompanied by a certificate of authenticity and care instructions.',
  },
]

const expectations = [
  {
    title: 'Pricing',
    description:
      'Prices vary depending on the size and complexity of the piece. Commission prices start from 3,500 DKK for smaller works. A detailed quote is provided after the initial consultation.',
  },
  {
    title: 'Timeline',
    description:
      'Most commissions are completed within 4–8 weeks from the approved concept. Rush orders may be possible depending on current availability — please enquire.',
  },
  {
    title: 'Payment',
    description:
      'A 50% deposit is required to confirm the commission and secure your place in the schedule. The remaining balance is due before delivery.',
  },
  {
    title: 'Revisions',
    description:
      'Two rounds of feedback are included during the concept phase. Once painting has begun, significant directional changes may incur an additional fee.',
  },
]

export default function CommissionsPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gray-900">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">
          Custom Work
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
          Commission a Painting
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-300 font-light leading-relaxed">
          Work with me to create a custom piece that reflects your vision and
          the atmosphere of your space.
        </p>
      </section>

      {/* The Process */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-2 text-center">
            The Process
          </h2>
          <p className="text-gray-400 text-center mb-16 text-sm tracking-wide uppercase">
            From first conversation to final delivery
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <span className="text-3xl font-light text-gray-400 leading-none select-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light tracking-tight text-white mb-2 text-center">
            What to Expect
          </h2>
          <p className="text-gray-400 text-center mb-16 text-sm tracking-wide uppercase">
            Practical details
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {expectations.map((item) => (
              <div
                key={item.title}
                className="border-t border-gray-700 pt-8"
              >
                <h3 className="text-base font-medium text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-4">
          Ready to begin?
        </h2>
        <p className="text-gray-500 font-light mb-10 max-w-md mx-auto">
          Reach out to start a conversation about your commission. I look
          forward to hearing about your vision.
        </p>
        <Link
          href="/contact"
          className="px-8 py-3 border border-black font-light text-black hover:bg-black hover:text-white transition inline-block"
        >
          Get in Touch
        </Link>
      </section>
    </Layout>
  )
}
