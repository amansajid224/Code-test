"use client"


import Image from "next/image";
import Link from "next/link";
import { useFormState } from 'react-dom';
import logo from "../../public/logo.png"
import { saveDataToDB } from "../actions";
import React from 'react'

const initialState = {
    email: "",
    password: "",
    fullName: "",
}


const Register = () => {
    const [state, formAction] = useFormState(saveDataToDB, initialState)

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md flex flex-col  shadow-md lg:max-w-xl">
                <Image src={logo} alt="logo Image" width={100}
                    height={100} className="self-center" />
                <form className="mt-6" action={formAction}>
                    <div className="mb-4">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Full Name
                        </label>
                        <input
                            name="fullName"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-2">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            type="submit"
                        >
                            Signup
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-center text-gray-700">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};



export default Register;