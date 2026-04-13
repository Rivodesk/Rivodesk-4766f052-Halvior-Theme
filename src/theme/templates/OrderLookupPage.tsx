'use client';

import { useState, FormEvent } from 'react';
import { Search, Package, Loader2 } from 'lucide-react';
import { Order, formatPrice } from '@/lib/rivodesk';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  paid: { label: 'Paid', color: '#F2EDE8' },
  pending: { label: 'Pending', color: '#B8A692' },
  refunded: { label: 'Refunded', color: '#dc2626' },
  voided: { label: 'Cancelled', color: '#5C5C48' },
  fulfilled: { label: 'Shipped', color: '#F2EDE8' },
  unfulfilled: { label: 'Not yet shipped', color: '#B8A692' },
  partial: { label: 'Partially shipped', color: '#B8A692' },
};

function statusBadge(status: string | null) {
  if (!status) return null;
  const s = STATUS_LABELS[status.toLowerCase()] ?? { label: status, color: '#5C5C48' };
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-normal uppercase tracking-[0.12em] px-2.5 py-1 border"
      style={{ borderColor: s.color, color: s.color }}
    >
      {s.label}
    </span>
  );
}

export function OrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const params = new URLSearchParams({ order_number: orderNumber, email });
      const res = await fetch(`/api/orders?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Order not found.');
      }
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'w-full px-4 py-3 border text-[13px] font-extralight outline-none transition-all';

  return (
    <div
      className="mx-auto px-6 lg:px-16 py-20"
      style={{ maxWidth: 'var(--container-max)' }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-normal uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Orders
          </p>
          <h1
            className="text-2xl font-light tracking-wide mb-3"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            Track order
          </h1>
          <p
            className="text-[13px] font-extralight"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Enter your order number and email to check the status.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border p-6 space-y-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <label
              className="block text-[10px] font-normal uppercase tracking-[0.18em] mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Order number
            </label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              className={fieldClass}
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                backgroundColor: 'transparent',
              }}
              placeholder="e.g. 1001"
            />
          </div>
          <div>
            <label
              className="block text-[10px] font-normal uppercase tracking-[0.18em] mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={fieldClass}
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                backgroundColor: 'transparent',
              }}
              placeholder="you@email.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Find order
              </>
            )}
          </button>

          {error && (
            <p
              className="text-[12px] font-extralight px-3 py-2 border"
              style={{ borderColor: 'rgba(220,38,38,0.3)', color: '#dc2626' }}
            >
              {error}
            </p>
          )}
        </form>

        {/* Results */}
        {order && (
          <div
            className="mt-8 border overflow-hidden"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div
              className="px-6 py-5 border-b"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] font-normal uppercase tracking-[0.18em]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Order
                  </p>
                  <p
                    className="text-lg font-light tracking-wide"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                  >
                    #{order.order_number}
                  </p>
                  <p className="text-[11px] font-extralight mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {statusBadge(order.financial_status)}
                  {statusBadge(order.fulfillment_status)}
                </div>
              </div>
            </div>

            {Array.isArray(order.line_items) && order.line_items.length > 0 && (
              <div className="px-6 py-5">
                <p
                  className="text-[10px] font-normal uppercase tracking-[0.18em] mb-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Products
                </p>
                <ul className="space-y-3">
                  {order.line_items.map((item: any, i: number) => (
                    <li key={i} className="flex items-center justify-between text-[13px]">
                      <div>
                        <span style={{ color: 'var(--color-text)' }}>{item.title}</span>
                        {item.variant_title && item.variant_title !== 'Default Title' && (
                          <span className="text-[11px] ml-1" style={{ color: 'var(--color-text-muted)' }}>
                            ({item.variant_title})
                          </span>
                        )}
                        <span className="text-[11px] ml-2" style={{ color: 'var(--color-text-subtle)' }}>
                          x {item.quantity}
                        </span>
                      </div>
                      <span className="font-normal" style={{ color: 'var(--color-text)' }}>
                        {formatPrice(item.price * item.quantity, order.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-normal" style={{ color: 'var(--color-text)' }}>
                  Total amount
                </span>
                <span className="text-base font-normal" style={{ color: 'var(--color-text)' }}>
                  {formatPrice(order.total_price, order.currency)}
                </span>
              </div>
            </div>

            {order.shipping_address && (
              <div
                className="px-6 py-4 border-t"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
              >
                <p
                  className="text-[10px] font-normal uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Shipping address
                </p>
                <p className="text-[13px] font-extralight leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  {order.shipping_address.name ?? order.shipping_address.first_name}
                  <br />
                  {order.shipping_address.address1}
                  <br />
                  {order.shipping_address.zip} {order.shipping_address.city}
                  <br />
                  {order.shipping_address.country}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
