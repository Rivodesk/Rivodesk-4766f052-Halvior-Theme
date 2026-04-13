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
    <div
      className="mx-auto px-6 lg:px-16 py-10"
      style={{ maxWidth: 'var(--container-max)' }}
    >
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-subtle)' }}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Terug naar collectie
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image gallery */}
        <div className="space-y-3">
          <div
            className="relative aspect-square overflow-hidden"
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

          {sortedImages.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {sortedImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(i)}
                  className="relative aspect-square overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    outline: activeImageIndex === i ? '1px solid rgba(242,237,232,0.3)' : 'none',
                    outlineOffset: '2px',
                    opacity: activeImageIndex === i ? 1 : 0.6,
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
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <h1
            className="text-2xl font-light tracking-[0.08em] uppercase mb-5 leading-tight"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span
              className="text-xl font-normal tracking-wide"
              style={{ color: 'var(--color-text)' }}
            >
              {formatPrice(price)}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <span
                className="text-sm line-through"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

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
              Aantal
            </p>
            <div
              className="inline-flex items-center border"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="p-3 transition-opacity hover:opacity-70"
                aria-label="Minder"
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
                aria-label="Meer"
              >
                <Plus className="h-4 w-4" style={{ color: 'var(--color-text)' }} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 text-[12px] font-medium uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mb-4"
            style={{
              backgroundColor: isAvailable ? 'var(--color-text)' : 'var(--color-bg-elevated)',
              color: isAvailable ? 'var(--color-bg)' : 'var(--color-text-subtle)',
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            {!isAvailable
              ? 'Archived'
              : added
              ? 'Toegevoegd'
              : `In winkelwagen — ${formatPrice(price)}`}
          </button>

          <p
            className="text-[11px] font-extralight text-center"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            Gratis verzending vanaf €200 &middot; 14 dagen retour
          </p>

          {/* Description */}
          {product.description && (
            <div
              className="mt-10 pt-8 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h3
                className="text-[10px] font-normal uppercase tracking-[0.2em] mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Beschrijving
              </h3>
              <div
                className="text-[13px] font-extralight leading-relaxed prose prose-sm max-w-none"
                style={{ color: 'var(--color-text-muted)' }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
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
  );
}
