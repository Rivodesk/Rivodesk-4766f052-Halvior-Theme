'use client';

import Link from 'next/link';

interface AboutPageProps {
  shopName: string;
}

export function AboutPage({ shopName }: AboutPageProps) {
  const brand = shopName === 'Mijn Winkel' ? 'Halvior' : shopName;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* Hero */}
      <section className="text-center py-24 md:py-32 px-6">
        <p
          className="text-[11px] font-normal uppercase tracking-[0.25em] mb-5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          About
        </p>
        <h1
          className="text-4xl sm:text-5xl font-light tracking-[0.04em] mb-6"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          We read every message.
        </h1>
        <p
          className="text-[15px] font-extralight leading-relaxed max-w-lg mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Questions about sizing, orders, or the brand. No bots. Real responses within 24 hours.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />

      {/* Brand story */}
      <section
        className="mx-auto px-6 lg:px-16 py-20"
        style={{ maxWidth: '860px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — origin story */}
          <div>
            <p
              className="text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              The origin
            </p>
            <div
              className="text-[14px] font-extralight leading-[28px] space-y-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <p>
                {brand} started with a rejection. The founder wanted a single black heavyweight tee
                that fit right, felt right, and didn&apos;t come with someone else&apos;s identity printed across the chest.
              </p>
              <p>
                Every brand was either too loud or too cheap. Too much logo. Too little substance.
                So the first {brand} piece was made for an audience of one.
              </p>
              <p>
                People asked about it. Then they asked for it. Then they asked for more.
              </p>
            </div>
          </div>

          {/* Right — philosophy */}
          <div>
            <p
              className="text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              The philosophy
            </p>
            <div
              className="text-[14px] font-extralight leading-[28px] space-y-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <p>
                Every garment earns its place. Nothing decorative. Nothing disposable.
                Just form, fabric, and function — refined until there&apos;s nothing left to remove.
              </p>
              <p>
                We don&apos;t discount. We don&apos;t overproduce. The price reflects the craft.
                Nothing more, nothing less.
              </p>
              <p>
                Belgian discipline. Uncompromising craft. Made in Germany.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />

      {/* Brand values */}
      <section
        className="mx-auto px-6 lg:px-16 py-20"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <p
          className="text-[11px] font-normal uppercase tracking-[0.25em] mb-10 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Brand pillars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: '01', title: 'Permanence', desc: 'Every piece is designed to outlast trends. We build for the next decade, not the next season.' },
            { num: '02', title: 'Restraint', desc: 'We say no more than we say yes. No excess. No decoration. Only what serves the garment.' },
            { num: '03', title: 'Integrity', desc: "We don't discount. We don't overproduce. The price reflects the craft. Nothing more, nothing less." },
            { num: '04', title: 'Silence', desc: "The brand doesn't shout. It doesn't explain itself. The work speaks. The wearer decides." },
          ].map(pillar => (
            <div
              key={pillar.num}
              className="p-6 border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <p
                className="text-2xl font-light mb-4"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                {pillar.num}
              </p>
              <h3
                className="text-[12px] font-medium uppercase tracking-[0.2em] mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-[13px] font-extralight leading-[22px]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />

      {/* Contact info */}
      <section
        className="mx-auto px-6 lg:px-16 py-20"
        style={{ maxWidth: '860px' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: 'Email', content: 'hello@halvior.com' },
            { title: 'Response time', content: "Within 24 hours.\nWe don't use chatbots." },
            { title: 'Business hours', content: 'Monday — Friday\n10:00 — 18:00 CET' },
            { title: 'Follow', content: 'Instagram: @halvior' },
          ].map(info => (
            <div key={info.title}>
              <p
                className="text-[10px] font-normal uppercase tracking-[0.2em] mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                {info.title}
              </p>
              <p
                className="text-[13px] font-extralight leading-[22px] whitespace-pre-line"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {info.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <p
          className="text-xl font-light tracking-wide mb-8"
          style={{ color: 'var(--color-text)' }}
        >
          Built to outlast.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
        >
          Explore the collection
        </Link>
      </section>
    </div>
  );
}
