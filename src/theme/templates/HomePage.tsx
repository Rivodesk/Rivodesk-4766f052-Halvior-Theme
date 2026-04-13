'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/rivodesk';
import { ProductGrid } from '../components/ProductGrid';

interface HomePageProps {
  products: Product[];
  shopName: string;
}

export function HomePage({ products, shopName }: HomePageProps) {
  const newArrivals = products.slice(0, 8);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-28 md:py-40 relative z-10 text-center"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <span
            className="inline-block text-[11px] font-normal uppercase tracking-[0.25em] mb-5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Autumn / Winter 2026
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-[86px] font-light leading-tight mb-5 tracking-[0.04em]"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            BUILT TO OUTLAST.
          </h1>
          <p
            className="text-base font-extralight mb-10 max-w-lg mx-auto leading-relaxed tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Discipline is the new luxury. Three pieces. That&apos;s enough.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-4 text-[11px] font-normal uppercase tracking-[0.18em] border transition-all hover:opacity-80"
            style={{
              borderColor: 'rgba(242,237,232,0.4)',
              color: 'var(--color-text)',
            }}
          >
            Explore the collection
          </Link>
          <p
            className="mt-12 text-[9px] font-normal uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            Scroll
          </p>
        </div>
      </section>

      {/* ===== THE ESSENTIALS — Product Grid ===== */}
      <div
        className="mx-auto px-6 lg:px-16 py-20"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-[14px] font-light uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-text)' }}
          >
            The Essentials
          </h2>
          <Link
            href="/products"
            className="text-[11px] font-normal uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            View all
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </div>

      {/* ===== BRAND STORY — Split Layout ===== */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-20"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left — Image placeholder */}
            <div
              className="aspect-[4/3] lg:aspect-auto lg:min-h-[480px] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(46,43,39,1) 0%, rgba(30,28,25,1) 50%, rgba(20,18,16,1) 100%)',
              }}
            >
              <span
                className="absolute text-[200px] font-thin select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.03)', left: '20%', top: '20%' }}
              >
                H
              </span>
            </div>

            {/* Right — Text content */}
            <div className="flex flex-col justify-center lg:py-10">
              <p
                className="text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
                style={{ color: 'var(--color-text-muted)' }}
              >
                The Philosophy
              </p>
              <h3
                className="text-2xl sm:text-3xl font-light leading-relaxed tracking-wide mb-8"
                style={{ color: 'var(--color-text)' }}
              >
                If it doesn&apos;t need<br />to exist, it won&apos;t.
              </h3>
              <div
                className="text-[14px] font-extralight leading-[28px] space-y-4 mb-8"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <p>
                  Halvior started with a rejection. The founder wanted a single black heavyweight tee that fit right,
                  felt right, and didn&apos;t come with someone else&apos;s identity printed across the chest.
                </p>
                <p>
                  Every brand was either too loud or too cheap. Too much logo. Too little substance.
                  So the first Halvior piece was made for an audience of one.
                </p>
                <p>
                  People asked about it. Then they asked for it. Then they asked for more.
                </p>
              </div>
              <Link
                href="/products"
                className="text-[11px] font-normal uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text)' }}
              >
                Read our story &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== EDITORIAL BANNER — The First Drop ===== */}
      <div
        className="relative overflow-hidden border-t"
        style={{
          borderColor: 'var(--color-border)',
          background: 'linear-gradient(180deg, rgba(24,24,21,1) 0%, rgba(18,17,15,1) 50%, rgba(14,14,12,1) 100%)',
        }}
      >
        {/* Giant ghost text */}
        <span
          className="absolute text-[240px] sm:text-[300px] font-thin uppercase tracking-[0.2em] select-none pointer-events-none whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.02)', left: '-40px', top: '50%', transform: 'translateY(-50%)' }}
        >
          {shopName}
        </span>

        <div className="relative z-10 text-center py-24 md:py-32 px-6">
          <p
            className="text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Editorial
          </p>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.15em] mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            The First Drop
          </h3>
          <p
            className="text-[14px] font-extralight tracking-wide mb-10"
            style={{ color: 'var(--color-text-muted)' }}
          >
            340gsm cotton. Relaxed shoulder. Made in Germany.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* ===== SOCIAL PROOF / STATS BAR ===== */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-12"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '340gsm', label: 'Premium weight' },
              { value: '12', label: 'Pieces per drop' },
              { value: '97%', label: 'Repeat buyers' },
              { value: '0', label: 'Discounts. Ever.' },
            ].map(stat => (
              <div key={stat.label}>
                <p
                  className="text-2xl sm:text-3xl font-light tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[9px] font-normal uppercase tracking-[0.2em] mt-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== NEWSLETTER — The Index ===== */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-24 text-center"
          style={{ maxWidth: '720px' }}
        >
          <p
            className="text-[11px] font-normal uppercase tracking-[0.25em] mb-5"
            style={{ color: 'var(--color-text-muted)' }}
          >
            The Index
          </p>
          <h3
            className="text-2xl sm:text-3xl font-light tracking-wide mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Early access. No noise.
          </h3>
          <p
            className="text-[14px] font-extralight leading-relaxed mb-10"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Members of The Index get 24-hour early access to every drop.
            No discounts. No spam. Just a private memo when something new exists.
          </p>
          <div className="flex items-center max-w-md mx-auto">
            <div
              className="flex-1 border px-5 py-4"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <p
                className="text-[11px] font-extralight uppercase tracking-[0.15em] text-left"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                Your email
              </p>
            </div>
            <button
              className="px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
