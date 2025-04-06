'use client'
import {useState,useEffect} from 'react';
import { useSearchParams,useRouter,usePathname } from 'next/navigation';
// import { getWomensSpecificProducts } from '@/app/lib/data';
import clsx from 'clsx';

export default function Filter(){
    const availableSizes =['XS','S','M','L','XL','XXL']
    const [sizes,setSizes] = useState<string[]>([]);
    // to change URL parameters
    const searchParams = useSearchParams();
    // have access to clean url path without any parameters
    const pathname = usePathname();
    // update url path 
    const {replace} = useRouter();

    async function toggleSize(size:string){
        // SIZES REFERENCE TO AVOID SLOW REACT STATE UPDATE
        // if toggled size is already in sizes state, filter it out: else add it alongside the other prev sizes
        const updatedSizes = sizes.includes(size)
            ? sizes.filter((s)=>s!==size):[...sizes,size];

        setSizes(updatedSizes);
        //used to edit Search Parameters
        const params = new URLSearchParams(searchParams);
        updatedSizes.forEach((s)=>{
            // if current size does not exist as ('size':'S') pair in params,ADD it
            if(!params.has('size',s)){
                params.append('size',s);
            }
        })
        // compare params to new updatedSizes array, remove any that are not present in updated array
        searchParams.getAll('size').forEach((s)=>{
            if(!updatedSizes.includes(s)){
                params.delete('size',s);
            }
        });

        console.log('sizes state: ', updatedSizes)
        console.log('pathname: ', pathname)
        console.log('params: ', params.toString())

        replace(`${pathname}?${params.toString()}`)   
    }
    // console.log(sizes)
    function resetSizes(){
        const params = new URLSearchParams(searchParams);
        setSizes([]);
        searchParams.getAll('size').forEach((s)=>{
            params.delete('size',s);
        })
        replace(`${pathname}?${params.toString()}`);
    }
    useEffect(()=>{
        // getData();
        const params = new URLSearchParams(searchParams);
        const sizesFromParams = params.getAll('size');
        setSizes(sizesFromParams);
    },[])
    const selected = "bg-black text-white font-bold"
    return(
        <div className="">
            <p className="text-md pl-4 pt-4 mb-4 font-semibold">Sort by Size</p>
            <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 px-2 gap-1">
                {availableSizes.map((s)=>(
                    <span className='flex justify-center' key = {s}>
                        <span
                             onClick ={()=>toggleSize(s)} 
                             className={clsx(
                                 "text-center w-[70%] rounded-md border-2 border-gray-500 hover:bg-gray-800 hover:text-white hover:cursor-pointer transition-all duration-200 ",
                                 sizes.includes(s) ?selected :""
                             )}

                        >{s}</span>
                    </span>
                ))}
            </div>
            {/* RESET BUTTON */}
            <div className='flex justify-center mt-2'>
                <button 
                    onClick={()=>resetSizes()}
                    className='p-2 font-semibold bg-black text-white rounded-md'
                >reset</button>
            </div>
            {/* <button className='w-8 h-8 bg-red-500 border-2' onClick = {()=>{getData()}}>meow</button> */}
            {/* <button className='w-8 h-8 bg-blue-500 border-2' onClick={()=>{console.log(searchParams.getAll('color'))}}></button> */}
        </div>
    )
}