import { getPopularProducts } from '@/app/lib/data';
import FavoriteCard from '@/app/ui/products/favorite-product-card';
import { PopularProduct } from '../lib/definitions';
import { playfair } from './fonts';

export async function Favorites(){
    const products = await getPopularProducts();
    const cards = products?.length?products.map((product:PopularProduct)=>(
        <FavoriteCard data = {product} key = {product.productid}/>
    )):null;

    return(
        <div className='py-14 bg-slate-100'>
            <h1 className={`${playfair.className} antialiased text-center text-4xl`}>Popular Products</h1>
            <div className='flex justify-evenly h-auto py-4'>

                {cards}
            </div>
        </div>
    )
}