'use client'
import { opensans} from '../ui/fonts';
import {useState,useEffect} from 'react';
import { LocalCart,ProductVariantWithProduct } from '../lib/definitions';

export default function Page(){
    // [{variantId:'dedeeded',quantity:2},{},{}]
    // cart is a state that is filled with variantIds and quantity per item
    const [cart, setCart] = useState<LocalCart[]>([]);
    const [items, setItems] = useState<ProductVariantWithProduct[]>([]); // fetched product data
   
    function updateCartQuantity(variantId: string, change: number) {
        //get cart from cart state
        const updatedCart = [...cart];
        // Find the item using variantId
        const itemIndex = cart.findIndex(item => item.variantId === variantId);
      
        if (itemIndex !== -1) {
          // update the quantity
          updatedCart[itemIndex].quantity += change;
      
          // remove the item if quantity goes to 0 or less
          if (updatedCart[itemIndex].quantity <= 0) {
            updatedCart.splice(itemIndex, 1);
            //set Items state to blank to reset cart cards
            setItems([])
          }
        }
      
        // save it back to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        // update cart State
        setCart(updatedCart);

    }
    //1. load cart from localStorage on mount
    // set cart to cart state
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);
  
    //2. fetch product/variant data for those cart items
    // get product details for every variant id in state
    // save result to Items state
    useEffect(() => {
      const fetchCartItems = async () => {
        if (cart.length === 0) return;
        // FETCH USING API LAYER
        const ids = cart.map((item) => item.variantId).join(",");
        const res = await fetch(`/api/cart-items?variantIds=${ids}`);
        const data = await res.json();
        setItems(data);
      };
  
      fetchCartItems();
    }, [cart]); // runs after cart is loaded
    
    const subtotal = items.reduce((total, item) => {
        const quantity = cart.find(c => c.variantId === item.variantid)?.quantity || 0;
        return total + item.price * quantity;
      }, 0);
    

    return(
        <div className={`${opensans.className} antialiased flex justify-center items-center min-h-[90vh]`}>

            <div className='w-[50%] flex flex-col items-center font-semibold h-[70vh] overflow-scroll'>
            <div className='grid grid-cols-5 w-full text-center text-lg font-semibold py-5 bg-orange-200'>
                    <span className='col-1'>Image</span>
                    <span className='col-2'>Name</span>
                    <span className='col-3'>Size</span>
                    <span className='col-4'>Quantity</span>
                    <span className='col-5'>Price</span>
    

            </div>

          
                {items.map((item) => {
                    const currentItem = cart.find(c=>c.variantId===item.variantid)
                    const quantity = currentItem?.quantity || 0;
                    return(
                    <div key={item.variantid} className='grid grid-cols-5 grid-rows-1 border-b-2 w-full text-center'>
                        <div className='col-1 flex justify-center'>
                            <img src={item.imageurls[0]} alt={`picture of ${item.name}`} className='w-[5rem]'/>                            
                        </div>
                        <div className='col-2 flex items-center justify-center'>
                            <span>{item.name}</span>
                        </div>
                        <div className='col-3 flex items-center justify-center'>
                            <span>{item.size}</span>
                        </div>
                        <div className='col-4 flex flex-col items-center justify-center'>
                            <span className='border-2 w-10 hover:bg-slate-300 hover:cursor-pointer' onClick ={()=>updateCartQuantity(item.variantid,1)}>+</span>
                            <span className='border-2 w-10'>{quantity}</span>
                            <span className='border-2 w-10 hover:bg-slate-300 hover:cursor-pointer' onClick = {()=>updateCartQuantity(item.variantid,-1)}>-</span>
                        </div>
                        <div className='col-5 flex items-center justify-center'>
                            <span className=''>${(quantity * item.price).toFixed(2)}</span>
                        </div>

                    </div>
                    )
                }
            )}
            </div>
            <div className='w-[30%] flex flex-col items-center h-[70vh]'>
                {/* <div></div> */}
                {/* <h1 className='mt-10 border-2 w-full pl-5 bg-slate-400 py-4 font-semibold text-lg'>Summary</h1> */}
                <div className='w-full rounded-md overflow-hidden border-black grid grid-cols-2 gap-y-5 bg-slate-200 font-semibold'>
                    <h1 className='col-span-2 w-full bg-slate-400 py-5 font-semibold text-lg text-center'>Summary</h1>
                    <span className='col-1 pl-2'>Subtotal</span><span className='col-2 text-center'>{subtotal.toFixed(2)}</span>
                    <span className='col-1 pl-2'>Estimated Shipping and Handling</span> <span className='col-2 text-center'>$50.00</span>
                    <span className='col-1 pl-2'>Estimated Tax</span><span className='col-2 text-center'>{(subtotal *0.1).toFixed(2)}</span>
                    <span className='col-1 text-xl pl-2 pb-2'>Total</span><span className='col-2 text-center'>${(subtotal +50 +subtotal*0.1).toFixed(2)}</span>
                </div>


            </div>

        </div>
    )
}