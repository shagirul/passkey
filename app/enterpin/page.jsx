"use client"
import Image from "next/image";
import Enterpin from "../../public/enterpin.svg"
import OTPInput, { Context } from "@/components/client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function EnterPin({url ="/"}) {
    const { user,setVerified } = useContext(Context);
    const router = useRouter();

    const onComplete = async (password) => {
        
        try {
          const res = await fetch("/api/auth/checkpassword", {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
              password,encodedpassword:user.password
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (!data.success) { 
            if(!data.valid){
            router.refresh()}
            return toast.error("wrong password")};
        
         if(data.success){
            setVerified(true);
            router.push(url);
         }
        } catch (error) {
          return toast.error(error);
        }
      };
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="flex flex-col justify-center items-center px-10"> <Image className="aspect-square max-w-44 w-full" src={Enterpin} alt="EnterPin "></Image>
      <h2 className="font-bold text-2xl text-gray-500 mb-5">Enter the 4 Digit-PIN </h2>
      <OTPInput onComplete={onComplete} length={4}></OTPInput>
      </div>
    </div>
  );
}
