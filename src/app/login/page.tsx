'use client'
import React, { FormEvent } from "react"
import { useState } from "react"

type UserCred = {
    emailOrUsername:string;
    password:string;//hash??
}
export default function Login() {
    const [formData,setFormData] = useState<{email:string,password:string}>({email:'',password:''});

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
        // console.log(formData)

    };

    async function handleSumbit(e:FormEvent){
        e.preventDefault();
        console.log('form has been submited with creds: ',formData);
        // const respone = await fetch('')
    }
    return (
        <div>

            <div className="flex justify-center items-center flex-col h-screen bg-cover bg-no-repeat bg-center absolute top-0 w-full"
                style={{ backgroundImage: "url('https://res.cloudinary.com/duhazr5mo/image/upload/v1743708945/Kloth/nimble-made-7RIMS-NMsbc-unsplash_avqala.jpg')" }}
            >
                {/* <div className="border-2 flex flex-col bg-white border-red-500"> */}
                    <form className={`antialiased flex flex-col justify-center p-5 rounded-md text-lg bg-gray-300 bg-opacity-85 w-[20%]`}
                        // onChange={(e)=>handleChange(e)}
                        onSubmit={handleSumbit}

                    >
                        <h1 className="">Login</h1>
                        <label htmlFor="" className="py-2">Email</label>
                        <input
                            name="email"
                            onChange={(e)=>handleChange(e)}
                            value = {formData.email}
                            type="text"
                            placeholder="Email address"
                            className="p-2"
                            required
                        />
                        <label htmlFor="" className="py-2">Password</label>
                        <input
                            name="password"
                            onChange={(e)=>handleChange(e)}
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            className="p-2"
                            required

                        />
                        <button
                            // disabled={status === "submitting"}
                            type ="submit"
                            className="bg-black rounded-md mt-2 text-white py-2"
                        >
                        Log In
                        </button>
                        <p>Forgot password?</p>
                    </form>
                {/* </div> */}
            </div>
            <div className="h-[90vh]"></div>
        </div>

    )

}