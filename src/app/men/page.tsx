import { playfair } from "../ui/fonts"
export default function page(){
    return(
        <div className={`${playfair.className} antialiased`}>
            <div className={`${playfair.className} antialiased flex justify-center items-center bg-[url('/mens_clothing_hero.jpg')] bg-center bg-cover h-96 w-full`}>
                <h1 className="text-white text-4xl font-bold">Mens</h1>
            </div>

        </div>
    )
}