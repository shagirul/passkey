"use client"
import Image from "next/image";
import notFound from "../app/assets/404.svg";
import { Homebutton } from "@/components/client";


export default function NotFound() {


  return (
    <div className="flex absolute z-50 bg-white h-screen w-screen justify-center items-center">
      <div className="flex flex-col gap-5">
    \
        <Image
          className="w-full aspect-square"
          priority
          src={notFound}
          alt="Follow us on Twitter"
        />
      <Homebutton/>
      </div>
    </div>
  );
}
