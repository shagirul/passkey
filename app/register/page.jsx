"use client";

import { Context } from "@/components/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import signin from "../assets/signIn.svg";
import Image from "next/image";
import Hide from "../assets/hide.svg"
import Show from "../assets/show.svg"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser,setVerified} = useContext(Context);
  const [hidepassword, setHidePassword] = useState(true);
  const router = useRouter()
  const registerHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      return toast.error("All fields are required.");
    }
    if (password.length !== 4) {
      return toast.error("Password should be of 4 digits.");
    }
    if (!/^\d+$/.test(password)) {
      return toast.error("Password should contain only numeric digits.");
    }
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      setEmail("");
      setName("");
      setPassword("");
      setVerified(true)
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };
  useEffect(() => {
    if (user._id) {
      router.push("/");
      router.refresh(); // Changed from router.refresh()
    }
  }, [user._id]);
  return (
    <div className="flex flex-col items-center justify-center   md:h-screen lg:py-0 h-full p-5">
      <div> <Image alt="register" className="aspect-auto px-20" src={signin}></Image></div>
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create an account
          </h1>
          <form onSubmit={registerHandler} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none sm:text-sm rounded-lg  block w-full p-2.5     "
                placeholder="name@company.com"
                required=""
              ></input>
            </div>
            <div>
              <label
              htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5     "
                placeholder="name@company.com"
                required=""
              ></input>
            </div>

            <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <div className="bg-gray-50 border focus:border-2  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black  w-full    flex ">
              <input maxLength={4}
              value={password}
              type={hidepassword?"password":"text"}
              placeholder="••••"
              onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-transparent p-2.5 rounded-lg focus:outline-none   "></input>
               <Image onClick={()=>{
                setHidePassword(
                  !hidepassword
                )}} className="aspect-square mx-4" src={hidepassword?Hide:Show}></Image>
            </div>
            <p className="text-xs font-light text-gray-500 pt-1">Should be 4 digit numbers</p>
        
          </div>
          

            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="font-medium text-black hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
