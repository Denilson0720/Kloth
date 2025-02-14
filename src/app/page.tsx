import { playfair } from "./ui/fonts";
import Link from "next/link";
import { Favorites } from "./ui/favorites";
import { Suspense } from "react";
import { PopularsSkeleton} from "./ui/skeletons";
export default function Home() {
  return (
    <div>
      <video
        className="absolute top-0 left-0 w-1/2 h-screen object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/man_hero.mp4" type="video/mp4"/>
        Your browser does not support the video tag
      </video>
      <video 
        className="absolute top-0 right-0 w-1/2 h-screen object-cover"
        autoPlay
        loop
        muted
        playsInline
        >
        <source src="/woman_hero.mp4" type="video/mp4"/>
        Your browser does not support the video tag

      </video>
      {/* spacer div */}
      <div className={`${playfair.className} antialiased h-screen m-0 p-0 relative z-10 flex justify-center items-center text-white flex-col`}>
        <h1 className="block text-5xl p-4">Wardrobe Essentials</h1>
        <div className="flex gap-4 pb-16">
          <span className="text-center border-4 border-white py-2 px-4 w-24 hover:bg-white hover:text-black transition-all duration-300"><Link href='/men'>Men</Link></span>
          <span className="text-center border-4 border-white py-2 px-4 w-24 hover:bg-white hover:text-black transition-all duration-300"><Link href='/women'>Women</Link></span>
        </div>
      </div>

      <div className="h-96 relative flex flex-row justify-center items-center px-12 mb-20">
        <div className="h-full w-3/12 flex items-center">
          <h1 className={`${playfair.className} antialiased text-5xl`}>The Pursuit of Simplicity.</h1>
        </div>
        <div className=" h-full w-3/12 flex justify-center flex-col">
          <p className="font-semibold">Buy less,buy better.</p>
          <p>Build your wardrobe with staple garments, invite combinations into your style. </p>
        </div>
        <div className=" h-full w-3/12 flex flex-col justify-center">
        <p className="font-semibold">Know your garments.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ipsa impedit laboriosam culpa faci.</p>
        </div>
        <div className=" h-full w-3/12 flex flex-col justify-center">
        <p className="font-semibold">Make your wardrobe last</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ipsa impedit laboriosam culpa faci.</p>
        </div>
      </div>
      {/* lifecycle */}
      <div className="h-[80vh] bg-[url('https://res.cloudinary.com/duhazr5mo/image/upload/v1739383397/Kloth/combo_hero_y3hwpu.jpg')] bg-center bg-cover grid grid-cols-2 grid-rows-1 text-white">
        <div className="col-span-1 row-span-1 flex justify-center items-center flex-col">
        <p className={`${playfair.className} antialiased text-4xl pl-4`}>Get to know your garment&apos;s lifecycle</p>
        <span className="text-center border-4 border-white py-2 px-4 mt-2  hover:bg-white hover:text-black transition-all duration-300"><Link href={'/lifecycle'}>Learn More</Link></span>

        </div>

      </div>
      <Suspense fallback={<PopularsSkeleton/>}>
        <Favorites/>
      </Suspense>
    </div>
    
  );
}
