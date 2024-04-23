"use client";
import Image from "next/image";
import Hide from "../app/assets/hide.svg";
import Show from "../app/assets/show.svg";
import Account from "../app/assets/account.svg";
import React, { createContext, useContext, useEffect, useState,useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/loading";
import { decryptPassword } from "@/utils/features";


export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);


  useEffect(() => {
    fetch("/api/auth/account")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        setLoading(false); // Set loading to false when fetching is done
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        loading,
        verified, setVerified
      }}
    >
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </Context.Provider>
  );
};

export const Homebutton =()=>{
 const router =useRouter()
   function goToHome() {
    router.back();
  }
  return   <button onClick={goToHome} className="text-blue-500 text-md font-medium mx-auto">
  Back to home
</button>
}
export const LogoutBtn = () => {
  const { user, setUser,loading,verified } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      const data = await res.json();

      if (!data.success) toast.error(data.message);

      setUser({});

      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  if (loading) {
   
    return <Loader></Loader>;
  }

  if (!user._id) return redirect("/login");
  if (!verified) return redirect("/enterpin");

  return (
    user._id && (
      <Image
        onClick={logoutHandler}
        className="w-7 h-auto aspect-square"
        priority
        src={Account}
        alt="Follow us on Twitter"
      />
    )
  );
};

export function PasswordTile({  Id, title, tileId }) {


 


  return (
    <li className="py-3 sm:py-4 border-[1px] border-gray-200 px-5 rounded-lg">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center">
          <Link href={`handle/${tileId}`} className="flex-1 min-w-0 ">
            <p className="text-sm font-medium text-gray-900 truncate ">
              {title}
            </p>
            <p className="text-sm text-gray-500 truncate ">{Id}</p>
          </Link>
          {/* <button
            onClick={HandleHide}
            className="inline-flex items-center text-base font-semibold text-gray-900 "
          >
            {hide ? (
              <Image alt="Hide" src={Hide} />
            ) : (
              <Image alt="Show" src={Show} />
            )}
          </button> */}
        </div>
      </div>
    </li>
  );
}


export const OTPInput = ({ length = 4, onComplete }) => {

  const inputRef = useRef(Array(length).fill(null).map(() => React.createRef()));
  const [OTP, setOTP] = useState(Array(length).fill(''));

  const handleTextChange = (input, index) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    if (newPin.every((digit) => digit !== '')) {
      const password  = newPin.join('')


      
      onComplete(password);
    }
  };

  return (
    <div className={`grid grid-cols-4 gap-3`}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="password"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref)}
          className={`border-[3px] rounded-xl border-solid border-border-slate-500 focus:border-blue-600  outline-none aspect-square px-2  text-md font-bold`}
        />
      ))}
    </div>
  );
};

export default OTPInput;




