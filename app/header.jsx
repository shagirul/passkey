import React from 'react'
import Image from 'next/image';
import logo from '../public/icon.svg'
import Link from 'next/link';
import { LogoutBtn } from '@/components/client';

export function Header() {
  return (
    <><nav className="bg-white border-gray-100 border-b-2 fixed top-0 w-full">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <Image
        className='h-6 w-auto aspect-square'
      priority
      src={logo}
      alt="logo"
    />
            <span className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Passkey</span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
    <LogoutBtn/>
        </div>
    </div>
</nav></>
  )
}

export default Header