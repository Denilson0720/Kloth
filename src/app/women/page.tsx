import { getAllWomensProducts } from "../lib/data"

export default async function page(){
    // return <h1>Womens products page</h1>
    const products = await getAllWomensProducts();
    console.log(products);
    return(
        <div>
            <h1>womens product section</h1>
        </div>

    )
}