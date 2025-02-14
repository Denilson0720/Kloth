import {neon} from '@neondatabase/serverless';
import {PopularProduct,Product } from './definitions';

const sql = neon(`${process.env.DATABASE_URL}`)

  
export async function getAllProducts() {
    try {
      const products = await sql`SELECT * FROM products`;
      console.log(products); // Logs the retrieved products
      return products;
    } catch (e) {
      console.error("Error fetching products:", e);
      return [];
    }
}
export async function getPopularProducts():Promise<PopularProduct[]>{
    // await Promise
    try{
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const products = (await sql`SELECT * FROM popular`) as unknown as PopularProduct[];

        return products;
    }catch(e){
        console.log('Error fetching popular products: ', e)
        return [];

    }
}
export async function getAllWomensProducts():Promise<Product[]>{
    try{
        // const products = (await sql`SELECT * FROM Product WHERE gender="w"`) as unknown as Product[];
        const products = (await sql`SELECT * FROM Products WHERE gender = 'w'`) as unknown as Product[];

        return products;
    }catch(e){
        console.log("Error fetching Women's products: ",e);
        return [];
    }
}
export async function getAllMensProducts():Promise<Product[]>{
    try{
        // const products = (await sql`SELECT * FROM Product WHERE gender="w"`) as unknown as Product[];
        const products = (await sql`SELECT * FROM Products WHERE gender = 'm'`) as unknown as Product[];

        return products;
    }catch(e){
        console.log("Error fetching Women's products: ",e);
        return [];
    }
}