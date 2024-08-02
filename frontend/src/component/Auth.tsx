import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Signupschema } from "../zodvalidation/zod"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postinputs, setPostInputs] = useState<Signupschema>({
        email: "",
        password: "",
        name: ""
    })

    async function sendrequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postinputs)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
            console.log(jwt)
        }
        catch (e) {
            alert("Error while signing up")
            //alert the user here that the request failed
        }
    }
    return <div className="h-screen flex flex-col justify-center ">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className=" text-3xl font-extrabold ">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have any account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}

                        </Link>
                    </div>
                </div>

                <div className="pt-4">
                    <LebelledInput lebel="Email" placeholder="Ex.: haresh@gmail.com" onchage={(e) => {
                        const target = e.target as HTMLInputElement;
                        setPostInputs({
                            ...postinputs,
                            email: target.value
                        })
                    }} />

                    {type === "signup" ? <LebelledInput lebel="Name" placeholder="Ex: Haresh Nayak" onchage={(e) => {
                        const target = e.target as HTMLInputElement;
                        setPostInputs({
                            ...postinputs,
                            name: target.value
                        })
                    }} /> : null}

                    <LebelledInput lebel="Password" type="password" placeholder="Password" onchage={(e) => {
                        const target = e.target as HTMLInputElement;
                        setPostInputs({
                            ...postinputs,
                            password: target.value
                        })
                    }} />
                </div>
                <button onClick={sendrequest} type="button" className=" mt-8 w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
        </div>

    </div>
}

interface LebelledInputtypes {
    lebel: string,
    placeholder: string,
    onchage: (e: ChangeEvent) => void,
    type?: string
}
function LebelledInput({ lebel, placeholder, onchage }: LebelledInputtypes) {
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-black">
                {lebel}
            </label>
            <input onChange={onchage} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}