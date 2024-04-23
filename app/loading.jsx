import Image from 'next/image';
import logo from '../public/icon.svg'

export default function Loader () {
    return (
      <div className="flex absolute z-50 bg-white h-screen w-screen justify-center items-center">
  <div className='flex flex-col animate-bounce gap-5'>    <Image
        className='h-10 w-auto aspect-square'
      priority
      src={logo}
      alt="Loading"
    />
        <p className=" text-2xl font-medium ">Loading </p></div>
           
      </div>
    );
  }