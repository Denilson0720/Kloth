export default function Footer(){
    return(
        <div className="grid grid-cols-5 grid-rows-2 h-96 bg-black text-white pt-5">

            <div className="col-1 row-1 flex flex-col pl-10 pt-5 text-sm">
                <p className='font-bold mb-2'>Kloth</p>
                <div>
                    <span>IG</span>
                    <span>Facebook</span>
                    <span>Twitter</span>
                </div>
                <p className="font-bold">Address</p>
                <p>123 Street Manhattan NY</p>
                <p>10011, USA</p>
            </div>
            <div className="col-2 row-1 pl-10 pt-5 text-sm">
                <p className='font-bold mb-2'>My Account</p>
                <p>Sign in</p>
                <p>Register</p>
                <p>Order status</p>

            </div>
            <div className="col-3 row-1 pl-10 pt-5 text-sm">
                <p className='font-bold mb-2'>Help</p>
                <p>Shipping</p>
                <p>Returns</p>
                <p>Sizing</p>

            </div>
            <div className="col-4 row-1 pl-10 pt-5 text-sm">
                <p className='font-bold mb-2'>Shop</p>
                <p>All Products</p>

            </div>
            <div className="col-5 row-1 pl-10 pt-5 text-sm">
                <p className='font-bold mb-2'>Legal Stuff</p>
                <p>Shipping & Delivery</p>
                <p>Terms & Conditions</p>
                <p>Privacy & Policy</p>

            </div>
            <div className="col-span-5 row-2 flex justify-center items-center">
                {/* <p className='text-xl font-bold mb-2'>Kloth</p> */}
                <p className="text-sm">Copyright ©2025 Denilson Lopez. All Rights Reserved</p>

            </div>

        </div>
    )
}