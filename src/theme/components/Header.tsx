'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

const leftLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products', label: 'Collection' },
  { href: '/orders', label: 'About' },
];

const rightLinks = [
  { href: '#', label: 'Search', icon: Search },
  { href: '#', label: 'Account', icon: User },
];

interface HeaderProps {
  shopName: string;
  cartCount?: number;
  brandColor?: string;
}

export function Header({ shopName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();

  return (
    <>
      {/* Announcement bar */}
      <div
        className="text-center py-2 text-[9px] font-normal uppercase tracking-[0.15em]"
        style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)' }}
      >
        Free shipping on all orders over €200 &nbsp;&mdash;&nbsp; Limited drop: 72 pieces remaining
      </div>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div
          className="mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-16"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            {leftLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-normal uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[22px] font-semibold tracking-[0.28em] uppercase transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            {shopName}
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Desktop right links */}
            {rightLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="hidden md:inline-flex text-[11px] font-normal uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text)' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart button */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 transition-opacity hover:opacity-70"
              aria-label="Winkelwagen openen"
            >
              <span
                className="hidden md:inline text-[11px] font-normal uppercase tracking-[0.12em]"
                style={{ color: 'var(--color-text)' }}
              >
                Cart ({totalItems})
              </span>
              <ShoppingBag className="md:hidden h-5 w-5" style={{ color: 'var(--color-text)' }} />
              {totalItems > 0 && (
                <span
                  className="md:hidden absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold"
                  style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 transition-opacity hover:opacity-70"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" style={{ color: 'var(--color-text)' }} />
              ) : (
                <Menu className="h-5 w-5" style={{ color: 'var(--color-text)' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t overflow-hidden"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg)',
              }}
            >
              <nav className="px-6 py-6 flex flex-col gap-1">
                {[...leftLinks, ...rightLinks].map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="py-3 text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
