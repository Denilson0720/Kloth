import { playfair } from "../ui/fonts";
import ColorFilter from "../ui/products/color-filter";
import SizeFilter from "../ui/products/size-filter";
import Product from '../ui/products/product-tile';



export default function page(){
    return(
        <div className={`${playfair.className} antialiased`}>
      
            <div className="min-h-64 p-10 flex flex-col">
                <p className={`${playfair.className} antialiased text-4xl`}>Men&apos;s Personal Collection</p>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet aliquid ex, exercitationem harum molestias labore nihil libero nulla quidem atque accusantium incidunt!</p>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet aliquid ex, exercitationem harum molestias labore nihil libero nulla quidem atque accusantium incidunt, quasi non sunt </p>
            </div>

            <div className="flex flex-row">
                <div className="flex w-[12%] flex-col">
                    <ColorFilter/>
                    <SizeFilter/>
                </div>
                <div className="flex w-[88%]">
                    <Product/>
                </div>

            </div>

        </div>
    )
}