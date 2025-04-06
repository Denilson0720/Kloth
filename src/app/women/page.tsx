// import { getAllWomensProducts } from "../lib/data"
import ColorFilter from "../ui/products/color-filter";
import SizeFilter from '../ui/products/size-filter';
import { playfair } from "../ui/fonts";
import Product from '../ui/products/product-tile';
// import { Suspense } from "react";
// import { ProductsTileSkeleton } from "../ui/skeletons";
// import Products component and pass in 'women' to retrieve women products only and display

export default async function page(){
    return(
        <div className={`${playfair.className} antialiased`}>
         
            <div className="min-h-64 p-10 flex flex-col">
                <p className={`${playfair.className} antialiased text-4xl`}>Women&apos;s Personal Collection</p>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet aliquid ex, exercitationem harum molestias labore nihil libero nulla quidem atque accusantium incidunt!</p>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet aliquid ex, exercitationem harum molestias labore nihil libero nulla quidem atque accusantium incidunt, quasi non sunt </p>
            </div>
            <div className="flex flex-row">
                <div className="flex w-[12%] flex-col">
                    <ColorFilter/>
                    <SizeFilter/>
                </div>
                <div className="w-[88%]">
                    <Product/>  
                </div>
            </div>
        </div>

    )
}