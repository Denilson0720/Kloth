'use client'
import { playfair } from "./fonts";
import Link from "next/link";
import { ShoppingCartIcon,MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";

const links = [
    {name:'Home',href:'/'},
    {name:'Men',href:'/men'},
    {name:'Women',href:'/women'},
    {name:'Life Cycle',href:'/lifecycle'},
    {name:'About',href:'/about'}
]
export default function NavBar(){
    const pathname = usePathname();
    const [isScrolled,setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
          // Check if the user has scrolled down 50px
          setIsScrolled(window.scrollY > 20);
        };
    
        // Add event listener on mount
        window.addEventListener("scroll", handleScroll);
    
        // Cleanup the event listener on unmount
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return(
        // <div className="border-2 border-teal-400 bg-[url('/mens_clothing_hero.jpg')] bg-center bg-cover h-screen">

        <div 
        className={`h-20 ${playfair.className} antialiased text-black flex sticky top-0 left-0 w-full justify-between items-center pl-12 pr-12 bg-transparent z-50 transition-all duration-300 hover:bg-white hover:shadow-md hover:bg-opactiy-100 ${isScrolled ?'bg-white bg-opacity-90 shadow-md h-16':'bg-transparent'}`}
        >
            <div className="text-2xl font-bold">KLOTH</div>
            <div className="flex w-4/12 justify-between">
                 {links.map((link)=>(
                    <Link href={link.href} key={link.name} className={clsx(
                        'text-l font-bold hover:underline hover:text-black hover:font-extrabold',
                        {'text-black underline font-extrabold':pathname === link.href}
                        )}
                    >
                        {link.name}
                    </Link>
                 )
                 )}
            </div>
            <div className="flex w-20 justify-around items-center">
                <ShoppingCartIcon className="size-5 text-black"/>
                <MagnifyingGlassIcon className="size-5 text-black"/>
            </div>

        </div>
        // </div>

    )
}