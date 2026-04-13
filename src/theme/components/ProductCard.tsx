'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product, formatPrice } from '@/lib/rivodesk';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.sort((a, b) => a.position - b.position)[0] ?? null;
  const primaryVariant = product.variants?.[0] ?? null;
  const isAvailable = product.variants?.some(v => (v.inventory_qty ?? 0) > 0) ?? false;
  const price = primaryVariant?.price ?? 0;
  const compareAtPrice = primaryVariant?.compare_at_price ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/products/${product.handle}`} className="group block">
        {/* Image container */}
        <div
          className="relative aspect-[3/4] overflow-hidden mb-4"
          style={{ backgroundColor: 'var(--color-bg-elevated)' }}
        >
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl font-thin opacity-[0.04]"
                style={{ color: 'var(--color-text)' }}
              >
                H
              </span>
            </div>
          )}

          {/* Archived overlay */}
          {!isAvailable && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(10,10,10,0.7)' }}
            >
              <span
                className="text-[10px] font-normal uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Archived
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <h3
            className="text-[12px] font-normal uppercase tracking-[0.12em] line-clamp-2 leading-snug mb-1.5 transition-opacity group-hover:opacity-70"
            style={{ color: 'var(--color-text)' }}
          >
            {product.title}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="text-[12px] font-normal tracking-wide"
              style={{ color: 'var(--color-text)' }}
            >
              {formatPrice(price)}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <span
                className="text-[11px] line-through"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
