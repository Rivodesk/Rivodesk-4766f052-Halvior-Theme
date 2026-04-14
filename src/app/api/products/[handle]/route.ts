export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { rivoGet, mapProducts, SHOP_ID } from '@/lib/rivodesk';

export async function GET(_req: Request, { params }: { params: { handle: string } }) {
  const { data, error } = await rivoGet<{ product: Record<string, unknown> }>(
    `products/${params.handle}`,
    { shop_id: SHOP_ID },
  );
  if (error || !data?.product) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(mapProducts([data.product])[0]);
}
