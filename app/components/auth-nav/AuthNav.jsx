"use client"

import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { BsLightningCharge } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AuthNav = () => {

    const [openNav, setOpenNav] = useState(false)

  return (
    <nav className=" flex items-center justify-between py-5 relative md:px-[100px] px-[20px] z-[1000]">
        <div className="flex items-center gap-10">
            <Link href='/' className='block'>
                <img src="./images/mammon-app-logo.svg" className='w-[250px]' alt="Logo" />
            </Link>
            
            {
                openNav &&
                <div className="px-[20px] py-[20px] w-full flex flex-col fixed bg-white left-0 translate-x-0 h-[100vh] z-[12] top-0 items-center gap-10">
                    <div className='flex items-center justify-between w-full'>
                        <Link href='/' className='block'>
                            <img src="./images/mammon-app-logo.svg" className='w-[250px]' alt="Logo" />
                        </Link>
                        <IoClose className='text-[25px] cursor-pointer' onClick={() => setOpenNav(false)}/>
                    </div>
                    {/* <ul className='w-full'>
                        <Link href="https://mammonapp100.medium.com" className="text-[#667085] flex items-center gap-2 cursor-pointer w-full justify-between mb-9">
                            Blog
                        </Link>
                    </ul> */}
                </div>
            }
            {/* <ul className="sm:flex hidden">
                <Link href="https://mammonapp100.medium.com" className="text-[#667085] flex items-center w-full gap-2 cursor-pointer">
                    Blog
                </Link>
            </ul> */}
        </div>
        {/* <button className="hidden sm:flex items-center gap-2 bg-primary-color text-white px-4 py-[10px] rounded-[8px]">
            <BsLightningCharge />
            <p>Leaderboard</p>
        </button> */}
        {/* <BiMenu className='text-[25px] cursor-pointer sm:hidden' onClick={() => setOpenNav(true)}/> */}
    </nav>
  )
}

export default AuthNav