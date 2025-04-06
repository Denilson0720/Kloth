'use client'
import {useState} from 'react';
import { Product } from "@/app/lib/definitions";
import { playfair} from "../fonts";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function ProductBox({data}:{data:Product}){

    const [showAddtionalImages,setShow] = useState<boolean>(false);

    const secondImage = data?.imageurls[1]?data.imageurls[1]:data.imageurls[0]

    const gender  = usePathname().replace("\/",'');

    return(
        // link will /products/gender/productId
        <Link href ={`${gender}/products/${data.productid}`}>

        <div className=" flex flex-col items-center border-red-500 p-2 hover:cursor-pointer">
            <div className="w-[100%] h-[80%] overflow-hidden flex justify-center items-center" 
                onMouseOver={()=>setShow(x=>!x)}
                onMouseOut={()=>setShow(x=>!x)}
                >
                
                <img src={showAddtionalImages?secondImage:data.imageurls[0]} alt={`Image of ${data.name}`} className="w-full object-cover"/>

            </div>
            <div className={`${playfair.className} antialiased w-[100%] h-[20%]`}>
                {/* TITLE */}
                <div className=" flex text-md font-bold pt-2">
                    {data.name}
                </div>

                <div className="flex items-center">
                    <div className="w-[80%] text-sm font-normal text-gray-800">{data.category}</div>
                    <div className={`w-[20%] text-lg antialiased font-semibold flex justify-end`}>${data.price}</div>

                </div>
                <p>{gender}</p>
            </div>
            
        </div>
        </Link>

    )
}