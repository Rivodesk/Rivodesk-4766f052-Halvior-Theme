'use client';

import { useState, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/rivodesk';


interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

interface StripePaymentProps {
  clientSecret: string;
  customerName: string;
  onDone: () => void;
}

function StripePaymentForm({ clientSecret, customerName, onDone }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders?status=success`,
        payment_method_data: {
          billing_details: { name: customerName || 'Customer' },
        },
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.');
      setLoading(false);
    } else {
      onDone();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ fields: { billingDetails: { name: 'never' } } }} />
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing
          </>
        ) : (
          <>
            Pay now
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

interface CheckoutFormProps {
  onDone: () => void;
}

type Step = 'info' | 'payment' | 'success';

export function CheckoutForm({ onDone }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('info');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
    country: 'NL',
  });

  const handleInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: items.map(i => ({
            variant_id: i.variantId,
            product_id: i.productId,
            title: i.title,
            variant_title: i.variantTitle,
            price: i.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
          currency: 'EUR',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Er is een fout opgetreden.');
      }

      setClientSecret(data.clientSecret);
      setPublishableKey(data.publishable_key ?? '');
      setStep('payment');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentDone = () => {
    clearCart();
    setStep('success');
    onDone();
  };

  const fieldClass =
    'w-full px-4 py-3 border text-[13px] font-extralight outline-none transition-all';
  const fieldStyle = {
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
    backgroundColor: 'transparent',
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#d1fae5' }}
        >
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          Order placed
        </h2>
        <p className="text-sm max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
          Thank you for your order. You will receive a confirmation at {customer.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {(['info', 'payment'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className="h-px w-8 flex-shrink-0"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: step === s || (s === 'info' && step === 'payment') ? 'var(--color-primary)' : 'var(--color-border)',
                  color: step === s || (s === 'info' && step === 'payment') ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color: step === s ? 'var(--color-text)' : 'var(--color-text-muted)',
                }}
              >
                {s === 'info' ? 'Details' : 'Payment'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {step === 'info' && (
        <form onSubmit={handleInfoSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Full name
              </label>
              <input
                type="text"
                value={customer.name}
                onChange={e => setCustomer(p => ({ ...p, name: e.target.value }))}
                className={fieldClass}
                style={fieldStyle}
                placeholder="John Smith"
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Email address *
              </label>
              <input
                type="email"
                required
                value={customer.email}
                onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))}
                className={fieldClass}
                style={fieldStyle}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Street and number *
              </label>
              <input
                type="text"
                required
                value={customer.address}
                onChange={e => setCustomer(p => ({ ...p, address: e.target.value }))}
                className={fieldClass}
                style={fieldStyle}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-xs font-medium mb-1"
                  style={{ color: 'var(--color-text)' }}
                >
                  Postal code *
                </label>
                <input
                  type="text"
                  required
                  value={customer.postcode}
                  onChange={e => setCustomer(p => ({ ...p, postcode: e.target.value }))}
                  className={fieldClass}
                  style={fieldStyle}
                  placeholder="1234 AB"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-medium mb-1"
                  style={{ color: 'var(--color-text)' }}
                >
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={e => setCustomer(p => ({ ...p, city: e.target.value }))}
                  className={fieldClass}
                  style={fieldStyle}
                  placeholder="Amsterdam"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Country *
              </label>
              <select
                required
                value={customer.country}
                onChange={e => setCustomer(p => ({ ...p, country: e.target.value }))}
                className={fieldClass}
                style={fieldStyle}
              >
                <option value="NL">Netherlands</option>
                <option value="BE">Belgium</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="GB">United Kingdom</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="pt-2">
            <div
              className="flex justify-between items-center mb-4 py-3 border-t border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                Total to pay
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-[11px] font-normal uppercase tracking-[0.15em] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  Continue to payment
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {step === 'payment' && clientSecret && publishableKey && (
        <Elements
          stripe={loadStripe(publishableKey)}
          options={{
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#F2EDE8',
                colorBackground: '#111111',
                colorText: '#F2EDE8',
                colorTextSecondary: '#B8A692',
                borderRadius: '0px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
            },
          }}
        >
          <StripePaymentForm clientSecret={clientSecret} customerName={customer.name} onDone={handlePaymentDone} />
        </Elements>
      )}
    </div>
  );
}
