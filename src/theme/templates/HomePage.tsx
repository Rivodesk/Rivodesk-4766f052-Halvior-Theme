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
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-32 md:py-44 relative z-10 text-center"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <span
            className="inline-block text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Drop 01 — Limited Edition
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-6 tracking-[0.04em]"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            Built to outlast.
          </h1>
          <p
            className="text-base font-extralight mb-10 max-w-lg mx-auto leading-relaxed tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Belgische discipline. Ongecompromitteerd vakmanschap. Gelimiteerd tot 72 stuks per drop.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-normal uppercase tracking-[0.18em] transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
            >
              Bekijk de collectie
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-normal uppercase tracking-[0.18em] border transition-all hover:border-opacity-60"
              style={{ borderColor: 'rgba(242,237,232,0.3)', color: 'var(--color-text)' }}
            >
              Bestelling volgen
            </Link>
          </div>
        </div>

        {/* Ghost brand text background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="text-[280px] sm:text-[400px] font-thin tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.015)' }}
          >
            {shopName}
          </span>
        </div>
      </section>

      {/* Social proof bar */}
      <div
        className="border-y"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-5"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '340gsm', label: 'Premium gewicht' },
              { value: '72', label: 'Stuks per drop' },
              { value: '€0', label: 'Korting. Ooit.' },
              { value: 'DE', label: 'Made in Germany' },
            ].map(stat => (
              <div key={stat.label}>
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[9px] font-normal uppercase tracking-[0.2em] mt-1"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products section */}
      <div
        className="mx-auto px-6 lg:px-16 py-20"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[11px] font-normal uppercase tracking-[0.25em] mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Collectie
            </p>
            <h2
              className="text-2xl font-light tracking-wide"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              The Essentials
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Alles bekijken
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} />

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-normal uppercase tracking-[0.15em] border transition-all hover:opacity-70"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            Alle producten bekijken
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Brand philosophy section */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-24 text-center"
          style={{ maxWidth: '720px' }}
        >
          <p
            className="text-[11px] font-normal uppercase tracking-[0.25em] mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            De filosofie
          </p>
          <blockquote
            className="text-2xl sm:text-3xl font-light leading-relaxed tracking-wide mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            &ldquo;Als het niet hoeft te bestaan, dan zal het dat ook niet.&rdquo;
          </blockquote>
          <p
            className="text-sm font-extralight leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Elk kledingstuk verdient zijn plek. Niets decoratiefs. Niets wegwerp.
            Alleen vorm, stof en functie — verfijnd tot er niets meer te verwijderen valt.
          </p>
        </div>
      </div>
    </div>
  );
}
