import { getProduct,getProductVariantsByProductId } from "@/app/lib/data";
import { notFound } from 'next/navigation';
import { playfair} from "@/app/ui/fonts";
import SizePicker from '@/app/ui/products/product-size-picker';

export default async function Page({params}:{params:{id:string}}){
    const {id}  = params;
    // DONT NEET TO NECESARALY MOVE THIS INTO API LAYER BECAUSE --> SERVER COMPONENT
    const product = await getProduct(id);
    
    const productVariants = await getProductVariantsByProductId(id);

    if(!product || !productVariants){
        notFound();
    }
    return(
        <div className="flex flex-col items-center">
            {/* page for {productData?.name} */}
            <div className="w-[80%] flex flex-row">

            {/* PRODUCT IMAGE */}
            <div className="w-[50%] flex">
                <div className="h-[60rem] w-[100%] flex justify-center">
                    <img src={product.imageurls[0]} alt={`picture of ${product.name}`} className=" object-cover" />
                </div>

            </div>
            {/* PRODUCT INFO */}
            <div className={`w-[50%] flex flex-col pt-40 ${playfair.className} antialiased`}>

                <div className=" w-[100%] flex pl-5">  
                    <span className={`text-3xl font-bold`}>{product.name}</span>
                    <span className={`pl-10 text-2xl font-semibold`} >${product.price}</span>
                </div>
                <span className="pl-5">{product.category}</span>
                {/* SIZE PICKER COMPONENT,PASS IN VARAITNS */}
                <SizePicker productVariants ={productVariants}/>
                <div className="px-5 py-5">
                    <p>Delivery in 2-4 days | Free from $75 USD | Free Exchanges</p>

                    <p>Details</p>
                    <p>{product.description}</p>

                </div>
            </div>
            </div>

        </div>
    )

}