"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {HiOutlineChevronLeft} from 'react-icons/hi'

export default function Navigation() {
  const router = useRouter()
  return (
    <nav className="flex flex-col h-4 mt-4 mb-4 w-full px-5 items-center">
      <div className="flex w-full py-4 justify-between">
        <button onClick={() => router.back()}>
          <HiOutlineChevronLeft size={24}/>
        </button>
        <Link className="text-xl font-bold" href="/">
          <span className='flex flex-row gap-x-1 items-center' >lux</span>
        </Link>
      </div>

    </nav>
  );
};