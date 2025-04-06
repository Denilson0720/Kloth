'use client'
import { useState,useEffect } from "react"
import { CheckIcon } from "@heroicons/react/16/solid";
import { useSearchParams,useRouter,usePathname } from 'next/navigation';

export default function Filter(){

    const [selectedColors,setColors] = useState<string[]>([]);
    const searchParams = useSearchParams();
    // get current pathname ex: dashboard/invoices
    const pathname = usePathname();
    const {replace} = useRouter();
    // my state to updae to whatever the url params have

    // tailwind does not support dynamic string manipulation
    const colorMap:Record<string,string> = {
        red: "bg-red-500 ",
        blue: "bg-sky-500 border-blue-200",
        green: "bg-green-400 border-green-200",
        yellow: "bg-yellow-400 border-yellow-200",
        orange:'bg-orange-400 border-orange-200',
        brown:'bg-amber-900 border-amber-900',
        cream:'bg-orange-200 boder-orange-200',
        black:'bg-black border-black',
        white:'bg-white '
      };
    const colors = ["black","red",'brown','yellow',"blue","orange",'cream',"green","white"];

    async function toggleColor(color: string) {
        // Derive new state
        // Because react state update does not trigger immediately, rather react puts in a request for it
        // Once we send signal to update State, state wont be updated immediately causing params to not have the correct references
            // buggy: change state and use it to change params
        // Solution: Derive state manually and use as manual reference for both state update and params update
        // 
        const updatedColors = selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color];
    
        // Update state
        setColors(updatedColors);
    
        // Update URL params using the new state
        const params = new URLSearchParams(searchParams);

        // if color not present, append to params
        updatedColors.forEach((col) => {
            if (!params.has('color', col)) {
                params.append('color', col);
            }
        }); 
    
        // Remove colors that are no longer selected
        searchParams.getAll('color').forEach((col) => {
            if (!updatedColors.includes(col)) {
                params.delete('color', col);
            }
    });
    
        // debugging logs
        // console.log('Updated Colors State:', updatedColors);
        // console.log('Updated Params:', params.toString());
        // console.log('Pathname',pathname)
    
        // Replace the URL with the new parameters
        replace(`${pathname}?${params.toString()}`);
    }

    // reset params for colors and state to blank []
    function resetColors(){
        const params = new URLSearchParams(searchParams);
        setColors([]);
        searchParams.getAll('color').forEach((col)=>{
            params.delete('color',col);
        })
        replace(`${pathname}?${params.toString()}`)
    }

    // Sync state with URL params on initial render
    // To facilitate succesful deep linking we need to update state on initial mount depending on available parameters
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const colorsFromParams = params.getAll('color'); // Get all 'color' query params
        setColors(colorsFromParams);
    }, []); // Runs once on mount
    
    // upon color selection add url params for color as: color:red,color:blue
    return(
        <div className="flex flex-col w-full">
            <p className="text-md font-semibold pl-4 py-3">Sort by Color</p>
            <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 w-full gap-1 py-2">


            {colors.map((color)=>(
                <label key = {color} htmlFor={color} className=" flex justify-center flex-col items-center">
                    <div
                        onClick={()=>toggleColor(color)}
                        className={`w-6 h-6 cursor-pointer ${colorMap[color]} border-2 border-gray-300 rounded-full hover:border-1 hover:border-gray-600 transition-all duration-200 ${selectedColors.includes(color)?'ring-2 ring-black ':'opacity-90'}`}>
                        <CheckIcon className={`mix-blend-darken ${selectedColors.includes(color)?'':'hidden'}`}/>
                    </div>
                    <span className="text-sm">{color}</span>
                </label>

            ))}
        </div>
        
        <div className="flex justify-center items-center">
            <button className="font-semibold p-2 bg-black text-white rounded-md" onClick={()=>resetColors()}>reset</button>

        </div>
        </div>
    )
    
}

//  <input 
// type="checkbox" 
// value={color} 
// onChange={()=>toggleColor(color)}
// checked={selectedColors.includes(color)}
// className="hidden"
// /> 