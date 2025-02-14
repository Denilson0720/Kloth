//definitions, schemas, interfaces, types
// export type ProductRaw = Omit<Product, 'price'> & {
    // price:number;
//   };
  
export type Product = {
    productid:string;
    name:string;
    price:string;
    description:string;
    imageurls:string[];
    stockquantity:number;
    datecreated:Date;
    colors:string[];
    gender:string;
    category:string;
}

export type PopularProduct = {
    popularid:string;
    productid:string;
    price:string;
    description:string;
    imageurls:string[];
    averagerating:number;
    dateadded:Date;
    name:string;
}