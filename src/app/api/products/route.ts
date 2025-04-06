// app/api/products/route.ts
import { getFilteredProducts } from "@/app/lib/data"; // same one you're using now
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // abstract from request.url
  const { searchParams} = new URL(req.url);

  const gender = searchParams.get('gender')

  try {
    const products = await getFilteredProducts(searchParams,gender);
    console.log('Succesful GET request on ',gender,'products')

    return NextResponse.json(products);
  } catch (err) {
    console.error('API Error - Failed to fetch filtered products:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
