'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/rivodesk';

export function CartDrawer() {
  const { items, removeItem, updateQty, totalItems, totalPrice, drawerOpen, closeDrawer } =
    useCart();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col shadow-2xl"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <h2
                  className="text-[11px] font-normal uppercase tracking-[0.18em]"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                >
                  Winkelwagen
                </h2>
                {totalItems > 0 && (
                  <span
                    className="text-[10px] font-normal px-2 py-0.5"
                    style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 transition-opacity hover:opacity-70"
                aria-label="Sluiten"
              >
                <X className="h-5 w-5" style={{ color: 'var(--color-text)' }} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag
                    className="h-12 w-12 opacity-10"
                    style={{ color: 'var(--color-text)' }}
                  />
                  <p
                    className="text-sm font-light"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Je winkelwagen is leeg
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Verder winkelen
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map(item => (
                    <li
                      key={item.variantId}
                      className="flex gap-4 pb-5 border-b last:border-b-0"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="relative w-20 h-24 flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-thin opacity-[0.05]" style={{ color: 'var(--color-text)' }}>H</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[12px] font-normal uppercase tracking-[0.08em] line-clamp-2 leading-snug"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {item.title}
                        </p>
                        {item.variantTitle !== 'Default Title' && (
                          <p
                            className="text-[11px] mt-0.5 font-extralight"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {item.variantTitle}
                          </p>
                        )}
                        <p
                          className="text-[13px] font-normal mt-1.5"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        <div className="flex items-center gap-2 mt-2.5">
                          <div
                            className="flex items-center border"
                            style={{ borderColor: 'var(--color-border)' }}
                          >
                            <button
                              onClick={() => updateQty(item.variantId, item.quantity - 1)}
                              className="p-1.5 transition-opacity hover:opacity-70"
                              aria-label="Minder"
                            >
                              <Minus className="h-3 w-3" style={{ color: 'var(--color-text)' }} />
                            </button>
                            <span
                              className="px-3 text-[12px] font-normal"
                              style={{ color: 'var(--color-text)' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.variantId, item.quantity + 1)}
                              className="p-1.5 transition-opacity hover:opacity-70"
                              aria-label="Meer"
                            >
                              <Plus className="h-3 w-3" style={{ color: 'var(--color-text)' }} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="p-1.5 transition-opacity hover:opacity-70"
                            aria-label="Verwijderen"
                          >
                            <Trash2 className="h-3.5 w-3.5" style={{ color: 'var(--color-text-subtle)' }} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-6 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[11px] font-normal uppercase tracking-[0.15em]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Subtotaal
                  </span>
                  <span
                    className="text-base font-normal"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="block w-full text-center py-4 px-6 text-[11px] font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                >
                  Afrekenen
                </Link>
                <button
                  onClick={closeDrawer}
                  className="block w-full text-center mt-3 py-2 text-[11px] font-normal uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Verder winkelen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
