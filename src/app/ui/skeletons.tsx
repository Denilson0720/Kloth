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