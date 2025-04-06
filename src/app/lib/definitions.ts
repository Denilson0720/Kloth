// Structure for row in Product table
export type Product = {
    productid:string;
    name:string;
    price:string;
    description:string;
    imageurls:string[];
    datecreated:Date;
    colors:string[];
    gender:string;
    category:string;
}
// Structure for row in PopularProduct table
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
// Structure for row in ProductVariant table
export type ProductVariant = {
    variantid:string;
    productid:string;
    size:string;
    stockquantity:number;
}
// Structure for when Product and ProductVariant table rows are joined
export type ProductVariantWithProduct = {
    variantid: string;
    productid: string;
    size: string;
    stockquantity: number;
    datecreated:Date;
    imageurls:string[];
    colors:string[];
    gender:string;
    category:string;
    name: string;
    price: number;
    description: string;
};
// Structure for when Variants are stored in LocalStorage under 'cart'--> cart: <LocalCart[]>
export type LocalCart = {
    variantId:string;
    quantity:number;
}
