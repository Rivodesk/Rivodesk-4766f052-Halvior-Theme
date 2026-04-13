'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../components/CartContext';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '@/lib/rivodesk';

export function CheckoutPage() {
  const { items, totalItems, totalPrice } = useCart();
  const router = useRouter();
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setDone(true);
    setTimeout(() => router.push('/'), 3000);
  };

  if (totalItems === 0 && !done) {
    return (
      <div
        className="mx-auto px-6 lg:px-16 py-24 text-center"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <ShoppingBag
          className="h-12 w-12 mx-auto mb-4 opacity-10"
          style={{ color: 'var(--color-text)' }}
        />
        <h1
          className="text-xl font-light tracking-wide mb-3"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          Your cart is empty
        </h1>
        <p
          className="text-[13px] font-extralight mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Add products to continue with checkout.
        </p>
        <a
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
        >
          View collection
        </a>
      </div>
    );
  }

  return (
    <div
      className="mx-auto px-6 lg:px-16 py-12"
      style={{ maxWidth: 'var(--container-max)' }}
    >
      <div className="mb-10 flex items-center gap-3">
        <h1
          className="text-xl font-light tracking-wide"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          Checkout
        </h1>
        <span
          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-subtle)' }}
        >
          <Lock className="h-3 w-3" />
          Secured
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: checkout form */}
        <div>
          <CheckoutForm onDone={handleDone} />
        </div>

        {/* Right: order summary */}
        <div className="lg:order-first xl:order-last">
          <div
            className="border p-6 sticky top-24"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <h2
              className="text-[11px] font-normal uppercase tracking-[0.18em] mb-6"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              Order summary
            </h2>

            <ul className="space-y-4 mb-5">
              {items.map(item => (
                <li key={item.variantId} className="flex gap-3 items-start">
                  <div
                    className="relative w-14 h-14 overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-thin opacity-[0.05]" style={{ color: 'var(--color-text)' }}>H</span>
                      </div>
                    )}
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
                    >
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[12px] font-normal uppercase tracking-[0.06em] line-clamp-1"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.title}
                    </p>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="text-[11px] mt-0.5 font-extralight" style={{ color: 'var(--color-text-muted)' }}>
                        {item.variantTitle}
                      </p>
                    )}
                  </div>

                  <span
                    className="text-[12px] font-normal flex-shrink-0"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="border-t pt-4 space-y-2"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex justify-between text-[12px]">
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span style={{ color: 'var(--color-text)' }}>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
                <span style={{ color: 'var(--color-text-muted)' }}>Free</span>
              </div>
              <div
                className="flex justify-between font-normal text-base pt-3 border-t"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
