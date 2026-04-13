'use client';

import { Product } from '@/lib/rivodesk';
import { ProductGrid } from '../components/ProductGrid';

interface ProductsPageProps {
  products: Product[];
}

export function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div
      className="mx-auto px-6 lg:px-16 py-16"
      style={{ maxWidth: 'var(--container-max)' }}
    >
      <div className="mb-12">
        <p
          className="text-[11px] font-normal uppercase tracking-[0.25em] mb-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Collection
        </p>
        <h1
          className="text-2xl font-light tracking-wide mb-2"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          All products
        </h1>
        <p
          className="text-[12px] font-extralight"
          style={{ color: 'var(--color-text-subtle)' }}
        >
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
