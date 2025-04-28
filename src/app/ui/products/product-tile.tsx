// as a server component, NextJS prodives searchParams as default
// Next fetches searchParams for us without any additional work
'use client';
import {useState,useEffect} from 'react';
import {useSearchParams,usePathname} from 'next/navigation';
import { Product } from '@/app/lib/definitions';
import ProductBox from './product-box';

export default function ProductTile(){

  const path = usePathname();
  // get the filter parameters(?color=red&size=S)
  const params = useSearchParams();
  // 
  const gender = path.includes('women')?'w':'m';
  // color=red&size=S
  const filter = params.toString();
  //appened gender with & if filter params are present
  const queryString = `?${filter}${filter?'&':''}gender=${gender}`

  const [products,setProducts] = useState<Product[]>([])

  const productBoxes = products?.map((product:Product)=>(
    <ProductBox data={product} key = {product.productid}/>
  ))

  async function getProducts(){
    try{
      // fetching through api layer using built query string
      const res = await fetch(`/api/products${queryString}`);
      
      const data = await res.json();
      setProducts(data);
    }
    catch(e){
      console.log('Error retrieving products: ',e)
    }
  }
  // use hook to get updated products whenever we have new params from filtering boxes
  useEffect(()=>{

    getProducts();
    console.log('***use effect has ran, due to change in params**')

  },[params])
    return(
      <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-3 px-8 py-8 gap-6'>
        {productBoxes}
      </div>
  )
}