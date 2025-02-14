// import postgres from 'postgres';

import {neon} from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`)

async function getAllProducts() {
    try {
      const products = await sql`SELECT * FROM products`;
      console.log(products); // Logs the retrieved products
      return products;
    } catch (e) {
      console.error("❌ Error fetching products:", e);
      return [];
    }
}

export async function GET(){
    try {
    const products = await getAllProducts();
    return Response.json(products);

  } catch (error) {
    return Response.json({message:`Error retrievin query results: ${error}`},{status:500})
  }
}