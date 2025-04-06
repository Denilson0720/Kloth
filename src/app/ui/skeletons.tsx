const pulse = "animate-pulse bg-gray-200 dark:bg-gray-300";

export function PopularCardSkeleton(){
    return(
       <div className={`${pulse} w-96 h-full`}></div>
    )
}

export function PopularsSkeleton(){
    return(
        <div className="flex w-full h-[60vh] justify-evenly py-4">
            <PopularCardSkeleton/>
            <PopularCardSkeleton/>
            <PopularCardSkeleton/>
            <PopularCardSkeleton/>


        </div>
    )

}
export function ProductsTileSkeleton(){
    return(
        <div className="grid grid-cols-4 grid-rows-3 gap-6 p-8">
            {Array.from({ length: 12 }).map((_, index) => (

            <div className={`h-[40rem] flex flex-col p-2`} key = {index}>
                <div className={`${pulse} h-[80%]`}></div>
                <div className="flex flex-col h-[20%]">
                    <div className={`${pulse} mt-2 h-8`}></div>
                    <div className={`${pulse} mt-2 h-8`}></div>
                </div>
            </div>
            ))}
            {/* <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div>
            <div className={`${pulse} bg-gray-400 h-[20rem]`}></div> */}



        </div>
    )

}