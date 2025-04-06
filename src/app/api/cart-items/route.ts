// this is a Route handler, API endpoint to retrieve rows from 
// Products and ProductVarients using a VarientId passed in
import { NextResponse } from 'next/server';
import { getProductsByVariantIds } from '@/app/lib/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const variantIds = searchParams.get("variantIds")?.split(",") || [];

  const items = await getProductsByVariantIds(variantIds);
  console.log('testing fetch: ', items);
  console.log('Succesful GET request: ',items)
  return NextResponse.json(items);
}