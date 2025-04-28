// a group of buttons based on sizes array, if size present in variants, make it clickable
// will be interactive
'use client'
import { ProductVariant } from "@/app/lib/definitions";
import {useState} from 'react';
import { addToCartLocal } from "@/app/lib/data";
export default function Page({productVariants}:{productVariants:ProductVariant[]}){

    const sizeOrder = ['XS','S','M','L','XL','XXL'];
    // no longer track product with just size, but track with entire variant object, 
    // Much easier to send to cart or display stock messages based on state
    const [selectedVariant,setVariant] = useState<ProductVariant|undefined>();
    // State to display low stock

    // succesfully added to cart state
    const [successfulCartAdd,setSuccess] = useState<ProductVariant>();

    const [loading,setLoading] = useState<boolean>(false);

    // function to sort productVariants by ascending size XS,S,M,L,XL,XXL
    const sortProductVariantsBySize = (variants:ProductVariant[]) => {
        return variants.sort((a, b) => {
        // sort by correct index referenced from sizeOrder
          const indexA = sizeOrder.indexOf(a.size);
          const indexB = sizeOrder.indexOf(b.size);
          return indexA - indexB;
        });
    };
    const sortedVariants = sortProductVariantsBySize(productVariants);
      

    function addCart(){

        if(selectedVariant){
            setLoading(true);
            // add cart to local storage
            addToCartLocal(selectedVariant?.variantid);
            setSuccess(selectedVariant);
            setLoading(false);
        }
    };

    function selectVariant(p:ProductVariant){
        if(!selectedVariant){
            setVariant(p);
        }
        else if(selectedVariant==p){
            setVariant(undefined);
        }
        else{
            setVariant(p)
        }
    }

    const conditionalStyling = (s:string)=>(selectedVariant?.size==s?'bg-gray-400':'')

    const sizeButtons = sortedVariants?.map((p,index)=>(
        <button 
            onClick = {()=>selectVariant(p)}
            key= {index} 
            className={`${conditionalStyling(p.size)} transition-all duration-100 border-2 border-black hover:bg-gray-400 cursor-pointer w-14 py-2 text-center`}>
            {p.size}
        </button>
    ))


    return(
        <div className={`pl-5 `}>
            {/* {sizeButtons} */}
            <p className={`text-lg font-semibold my-4`}>Select a size:</p>
            {/* SUCCESFULLY ADDED TO CART MESSAGE */}
            {successfulCartAdd &&
                <p className=" font-semibold text-green-500">Succesfully added size {successfulCartAdd.size} to cart!</p>
            }
            {/* LOW STOCK MESSAGE */}
            {
                selectedVariant && selectedVariant.stockquantity<5?
                <p className="font-semibold text-red-500">Low stock. Order soon!</p>
                :null
            }
        
            <div className="flex flex-row w-[50%]">
                {sizeButtons}
            </div>
     
            {/* <button className="bg-red-500 w-10 h-10" onClick = {()=>console.log(selectedVariant)}>meow</button> */}
            <div className="flex justify-center">
                { loading==true?
                <span className="p-4 bg-orange-300 border-2 border-black rounded-md">Adding...</span>
                :
                <button 
                    className="bg-orange-300 p-4 border-2 border-black rounded-md mt-5"
                    onClick = {()=>addCart()}
                    >
                        Add to Cart
                     
                </button>
                }

            </div>


        </div>
    )

}