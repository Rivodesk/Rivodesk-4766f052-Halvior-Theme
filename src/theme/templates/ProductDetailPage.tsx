'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, ChevronLeft, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { Product, ProductVariant, formatPrice } from '@/lib/rivodesk';
import { useCart } from '../components/CartContext';

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { addItem, openDrawer } = useCart();

  const sortedImages = [...(product.images ?? [])].sort((a, b) => a.position - b.position);
  const sortedOptions = [...(product.options ?? [])].sort((a, b) => a.position - b.position);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    sortedOptions.forEach(opt => {
      defaults[opt.name] = opt.values[0] ?? '';
    });
    return defaults;
  });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant: ProductVariant | null =
    product.variants?.find(v => {
      if (!v.options || Object.keys(v.options).length === 0) return true;
      return Object.entries(selectedOptions).every(
        ([key, val]) => v.options[key] === val
      );
    }) ?? product.variants?.[0] ?? null;

  const price = selectedVariant?.price ?? 0;
  const compareAtPrice = selectedVariant?.compare_at_price ?? null;
  const isAvailable = (selectedVariant?.inventory_qty ?? 0) > 0;
  const primaryImage = sortedImages[activeImageIndex] ?? null;

  const handleAddToCart = () => {
    if (!selectedVariant || !isAvailable) return;
    for (let i = 0; i < qty; i++) {
      addItem({
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        imageUrl: sortedImages[0]?.url ?? null,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openDrawer();
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="mx-auto px-6 lg:px-16 py-6"
        style={{ maxWidth: 'var(--container-max)' }}
      >
        {/* Breadcrumb — matches Figma: HOME / ESSENTIALS / PRODUCT NAME */}
        <nav className="mb-6">
          <p
            className="text-[9px] font-normal uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            <Link href="/" className="transition-opacity hover:opacity-70">Home</Link>
            {' '}/ {' '}
            <Link href="/products" className="transition-opacity hover:opacity-70">Essentials</Link>
            {' '}/ {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>{product.title}</span>
          </p>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div className="flex gap-4">
            {/* Thumbnails — vertical column left (matches Figma) */}
            {sortedImages.length > 1 && (
              <div className="hidden sm:flex flex-col gap-3 flex-shrink-0">
                {sortedImages.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(i)}
                    className="relative w-[80px] h-[100px] overflow-hidden transition-all"
                    style={{
                      backgroundColor: 'var(--color-bg-elevated)',
                      outline: activeImageIndex === i ? '1px solid rgba(242,237,232,0.3)' : 'none',
                      outlineOffset: '2px',
                      opacity: activeImageIndex === i ? 1 : 0.5,
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt_text ?? `${product.title} ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div
              className="relative aspect-[3/4] w-full overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-elevated)' }}
            >
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt_text ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] font-thin opacity-[0.03]" style={{ color: 'var(--color-text)' }}>
                    H
                  </span>
                </div>
              )}
              {!isAvailable && (
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] font-normal uppercase tracking-[0.15em] px-3 py-1.5"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}
                  >
                    Archived
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <h1
              className="text-xl sm:text-2xl font-light tracking-[0.08em] uppercase mb-5 leading-tight"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <p
              className="text-xl font-normal tracking-wide mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              {formatPrice(price)}
              {compareAtPrice && compareAtPrice > price && (
                <span
                  className="text-sm line-through ml-3"
                  style={{ color: 'var(--color-text-subtle)' }}
                >
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </p>

            {/* Short description */}
            {product.description && (
              <div
                className="text-[13px] font-extralight leading-[24px] mb-8 prose prose-sm max-w-none"
                style={{ color: 'var(--color-text-muted)' }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Options */}
            {sortedOptions.map(option => (
              <div key={option.id} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="text-[10px] font-normal uppercase tracking-[0.18em]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {option.name} — {selectedOptions[option.name]}
                  </p>
                  {option.name.toLowerCase().includes('size') || option.name.toLowerCase().includes('maat') ? (
                    <span
                      className="text-[10px] font-normal uppercase tracking-[0.12em] cursor-pointer transition-opacity hover:opacity-70"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Size guide
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {option.values.map(val => {
                    const isSelected = selectedOptions[option.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() =>
                          setSelectedOptions(prev => ({ ...prev, [option.name]: val }))
                        }
                        className="px-5 py-2.5 text-[12px] font-normal tracking-[0.1em] border transition-all"
                        style={{
                          borderColor: isSelected ? 'var(--color-text)' : 'var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-text)' : 'transparent',
                          color: isSelected ? 'var(--color-bg)' : 'var(--color-text)',
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Qty selector */}
            <div className="mb-6">
              <p
                className="text-[10px] font-normal uppercase tracking-[0.18em] mb-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Quantity
              </p>
              <div
                className="inline-flex items-center border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="p-3 transition-opacity hover:opacity-70"
                  aria-label="Less"
                >
                  <Minus className="h-4 w-4" style={{ color: 'var(--color-text)' }} />
                </button>
                <span
                  className="px-5 text-sm font-normal"
                  style={{ color: 'var(--color-text)' }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="p-3 transition-opacity hover:opacity-70"
                  aria-label="More"
                >
                  <Plus className="h-4 w-4" style={{ color: 'var(--color-text)' }} />
                </button>
              </div>
            </div>

            {/* Add to cart — matches Figma: ADD TO CART — €PRICE */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 text-[12px] font-medium uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mb-3"
              style={{
                backgroundColor: isAvailable ? 'var(--color-text)' : 'var(--color-bg-elevated)',
                color: isAvailable ? 'var(--color-bg)' : 'var(--color-text-subtle)',
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              {!isAvailable
                ? 'Archived'
                : added
                ? 'Added'
                : `Add to cart — ${formatPrice(price)}`}
            </button>

            <p
              className="text-[11px] font-extralight text-center mb-8"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Free shipping over €200 &middot; Free returns within 14 days
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 border"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-subtle)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== TRUST BADGES — matches Figma ===== */}
      <div
        className="border-t border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div
          className="mx-auto px-6 lg:px-16 py-10"
          style={{ maxWidth: 'var(--container-max)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '◆', label: 'Premium materials' },
              { icon: '◇', label: 'Made in Germany' },
              { icon: '○', label: 'Free returns' },
              { icon: '□', label: 'Secure checkout' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center justify-center gap-2.5">
                <span
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {badge.icon}
                </span>
                <span
                  className="text-[10px] font-normal uppercase tracking-[0.15em]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
