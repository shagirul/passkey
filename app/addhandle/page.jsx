"use client";

import Header from "../header";
import { Context,  } from "@/components/client";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import Hide from "../assets/hide.svg"
import Show from "../assets/show.svg"
import { decryptPassword, encryptPassword } from "@/utils/features";

export default function page() {
  const [title, setTitle] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(Context);
  const router = useRouter()
  const [hidepassword, setHidePassword] = useState(true);
 
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!uid || !password || !title ) {
      return toast.error("All fields are required.");
    }
    
    const encodedPassword =  encryptPassword(password,user.password)


    try {
      const res = await fetch("/api/newhandle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          uid,
          password:encodedPassword,
        }),
      });
  
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.message); // Throw an error object with the message
      }
  
      toast.success(data.message);
      setTitle("");
      setUid("");
      setPassword("");
    router.push("/")
    router.refresh()
      
    } catch (error) {
      toast.error(error.message); // Render only the error message
    }
  };
  
  if (!user._id) {
    router.push('/login');
    return null; 
  }

  return (
    <main className="flex w-full h-full grow  items-start justify-center pt-20  py-2 gap-5">
      <Header />

      <div className="w-full   px-5 ">
        <form onSubmit={submitHandler} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4 md:space-y-6 ">
          <div>
            <label
              for="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter the Platform Name
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="title"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5     "
              placeholder="instagram, linkedIn, facebook"
              required=""
            ></input>
          </div>
          <div>
            <label
              for="uid"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter the UID for SignIn
            </label>
            <input
            value={uid}
              onChange={(e) => setUid(e.target.value)}
              type="uid"
              name="uid"
              id="uid"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5     "
              placeholder="e.g @jerry, 88897868908"
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
              <input 
              value={password}
              type={hidepassword?"password":"text"}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-transparent p-2.5 rounded-lg focus:outline-none   "></input>
               <Image alt="hide/show" onClick={()=>{
                setHidePassword(
                  !hidepassword
                )}} className="aspect-square mx-4" src={hidepassword?Hide:Show}></Image>
            </div>
        
          </div>
          <span className="w-full flex justify-between">
            {" "}
            <button
              className="bg-black text-white font-bold py-2 px-4 min-w-24 rounded "
              type="submit"
            >
              Add
            </button>
          </span>
        </form>
      </div>
    </main>
  );
}
