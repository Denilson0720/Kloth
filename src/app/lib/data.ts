import {neon} from '@neondatabase/serverless';
import {PopularProduct,Product,ProductVariant,ProductVariantWithProduct } from './definitions';

const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`)

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
export async function getProduct(productId:string):Promise<Product|null>{
    try{
        const product = await sql`SELECT * FROM Products WHERE productid = ${productId}` as unknown as Product[];

        if (!product || product.length === 0) {
            console.log(`No product found with ID: ${productId}`);
            return null;
        }
        
        console.log('succesful fetch of product from server!:',product[0]);
        return product[0];
    }catch(e){
        console.log('Error fetching product with id of: ',productId,e);
        return null;
    }
}
export async function getProductVariantsByProductId(productId:string):Promise<ProductVariant[]|[]>{
    try{
        const products : ProductVariant[]= await sql`SELECT * FROM Product_variants WHERE productid = ${productId}` as unknown as ProductVariant[];
        if (!products || products.length === 0) {
            console.log(`No product found with ID: ${productId}`);
            return [];
        }
        
        console.log('succesful fetch of product variants from server! :',products);
        return products;
    }
    catch(e){
        console.log('Error fetching product variants with id of: ',productId,e);
        return [];
    }
}
export async function getProductVariantsByVariantId(variantId:string):Promise<ProductVariant[]|[]>{
    try{
        const products : ProductVariant[]= await sql`SELECT * FROM Product_variants WHERE variantid = ${variantId}` as unknown as ProductVariant[];
        if (!products || products.length === 0) {
            console.log(`No product found with ID: ${variantId}`);
            return [];
        }
        
        console.log('succesful fetch of product variants from server! :',products);
        return products;
    }
    catch(e){
        console.log('Error fetching product variants with id of: ',variantId,e);
        return [];
    }
}
export async function getFilteredProducts(
    params: URLSearchParams,
    gender: string | null
  ): Promise<Product[]> {
    const sizes = params.getAll("size");
    const colors = params.getAll("color");
  
    try {
      let query;
      const useSize = sizes.length > 0;
      const useColor = colors.length > 0;
  
      if (useSize && useColor) {
        query = sql`
          SELECT DISTINCT p.*
          FROM products p
          INNER JOIN product_variants pv ON p.productid = pv.productid
          WHERE pv.size = ANY(${sizes})
            AND pv.stockquantity > 0
            AND p.colors && ${colors}
            AND p.gender = ${gender}
        `;
        console.log("Filtered by size & color");
      } else if (useColor) {
        query = sql`
          SELECT *
          FROM products
          WHERE colors && ${colors}
            AND gender = ${gender}
        `;
        console.log("Filtered by color only");
      } else if (useSize) {
        query = sql`
          SELECT DISTINCT p.*
          FROM products p
          INNER JOIN product_variants pv ON p.productid = pv.productid
          WHERE pv.size = ANY(${sizes})
            AND pv.stockquantity > 0
            AND p.gender = ${gender}
        `;
        console.log("Filtered by size only");
      } else {
        query = sql`
          SELECT *
          FROM products
          WHERE gender = ${gender}
        `;
        console.log(`No filters applied, returning all ${gender} products`);
      }
      
      const products = await query as Product[];
      return products;
    } catch (e) {
      console.error("❌ Error fetching products:", e);
      return [];
    }
  }
  
// export async function getFilteredProducts(params:URLSearchParams,gender:string|null):Promise<Product[]>{

//     const sizes = params.getAll('size');
//     const colors = params.getAll('color');
//     //  simulate delay
//     // await new Promise(resolve => setTimeout(resolve, 1000));
//     try{
//         // const products = (await sql`SELECT * FROM Products WHERE colors &&(${colors})`) as unknown as Product[];
//         if(sizes.length>0 && colors.length>0){
//         const products = await sql`
//             SELECT DISTINCT p.*
//             FROM products p
//             INNER JOIN product_variants pv ON p.productid = pv.productid
//             WHERE pv.size = ANY(${sizes})
//                 AND pv.stockquantity > 0
//                 AND p.colors &&(${colors})
//                 AND p.gender = ${gender}
//         ` as Product[];
//         return products
//         }
//         // if only colors is filtered, no need to join
//         else if(sizes.length==0 && colors.length>0){
//             const products = await sql`
//               SELECT *
//               FROM products WHERE colors &&(${colors}) AND gender = ${gender}
//             ` as Product[];
//             console.log('no specific size chosen, all sizes returned. Filtered through colors')
//             return products
//         }
//         // colors array is 0, no filtered colors to choose all
//         else if(colors.length==0 && sizes.length>0){
//             const products = await sql`
//               SELECT DISTINCT p.*
//                 FROM products p
//                 INNER JOIN product_variants pv ON p.productid = pv.productid
//                 WHERE pv.size = ANY(${sizes})
//                 AND pv.stockquantity > 0
//                 AND p.gender = ${gender}
//             ` as Product[];
//             console.log('no specific colors chosen, filtered through sizes')
//             return products

//         }
//         else{
//             const products = await sql`
//             SELECT * FROM products WHERE gender = ${gender}
//             ` as Product[];
//             console.log(`no filter chosen, all ${gender} products returned`)
//             return products
//         }
//     }catch(e){
//         console.log('Error fetching products: ',e);
//         return []
//     }   
// }
export async function addToCartLocal(variantId:string){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    // cart.push({variantId,quantity:1})
    const existingItem = cart.find((item: { variantId: string, quantity: number }) => item.variantId === variantId);

    if (existingItem) {
      // 3. If it exists, increase the quantity
      existingItem.quantity += 1;
    } else {
      // 4. If not, add new item with quantity 1
      cart.push({ variantId, quantity: 1 });
    }
    localStorage.setItem("cart",JSON.stringify(cart))

}
// Retrieve rows from Products and ProductVariants combined for a matching VariantId
export async function getProductsByVariantIds(variantIds: string[]):Promise<ProductVariantWithProduct[]> {
    try {
      const result : ProductVariantWithProduct[] = await sql`
        SELECT *
        FROM Product_Variants
        JOIN Products ON Product_Variants.productid = Products.productid
        WHERE Product_Variants.variantid = ANY(${variantIds})
      ` as unknown as ProductVariantWithProduct[];
  
      return result; // Each row contains fields from both tables
    } catch (error) {
      console.error('Failed to fetch products by variantIds:', error);
      return [];
    }
  }
  
