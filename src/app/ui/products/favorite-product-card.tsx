import { PopularProduct } from "@/app/lib/definitions"
import Image from 'next/image'

export default function Card({data}:{data:PopularProduct}){
    return(
        <div className="flex justify-center items-center  flex-col ">
            <Image 
                src={data.imageurls[0]}
                width={384}
                height={512}
                alt={ `picture of ${data.name}`}
                className="transition duration-200 hover:drop-shadow-md"
            /> 
            <p className="font-semibold mt-4">{data.name}</p>
            <p className="font-semibold">${data.price}</p>

        </div>
    )
}