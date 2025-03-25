"use client"

import React, { useEffect, useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { BsTrophy } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { PiHandDepositBold, PiHandWithdrawBold, PiNotepad } from "react-icons/pi";
import { RiSettingsLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { BsEmojiSmile } from "react-icons/bs";
import Cookies from 'js-cookie';
import { MdSwapVert } from "react-icons/md";
import Image from "next/image";

const SideNav = () => {

   const router = useRouter()
   const pathname = usePathname();

   const user = Cookies.get('token')
  //  const API_KEY = import.meta.env.VITE_API_KEY
  //  const BASE_URL = import.meta.env.VITE_BASE_URL
   const [userData, setUserData] = useState()

   function handleLogout(){
    localStorage.clear()
    Cookies.remove('token')
    router.replace('/login')
   }

  //  async function getUserInfo(){
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/account/profile`, {
  //       headers: {
  //         'Authorization': `Bearer ${user}`,
  //         'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  //       }
  //     })
  //     const data = await res.json()
  //     if(!res.ok) throw new Error(data, 'Failed to fetch user info')
  //     setUserData(data.data)
  //     // localStorage.setItem('userData', JSON.stringify(data.data))
  //   } catch (error) {
  //     console.error(error)
  //   }
  //  }

  //  useEffect(() => {
  //   getUserInfo()
  //  },[])
   
  
  return (
    <div className=' z-[1] bg-[#6363631f] fixed h-screen scrollbar w-[18%] hidden lg:block' style={{ borderTopRightRadius:'8px', borderBottomRightRadius:'8px' }}>
      <div className='p-5 border-b cursor-pointer'>
          <Image src="./images/mammon-app-logo.svg"  width={250} height={250} alt="Logo" />
      </div>
      <div className="mt-7 text-white">
        <p className="text-[12px] text-[#ffffff] mb-2 px-5">DASHBOARD</p>
        {/* <Link href='/get-started' className={ pathname.includes('/get-started') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            <BsEmojiSmile />
            <p className="ml-[10px]">Get Started</p>
          </div>
        </Link> */}
        <Link href='/dashboard' className={ pathname.includes('/dashboard') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
              {/* <RxDashboard /> */}
              {
                pathname.includes('/dashboard') ?
                <Image src="./images/element-3.svg" width={20} height={20} alt="cup image" />
                :
                <Image src="./images/element-3-color.svg" width={20} height={20} alt="cup image" />
              }
              <p className="ml-[10px]">Dashboard</p>
          </div>
        </Link>
        {/* <Link href='/earn-points' className={ pathname.includes('/earn-points') ? `flex items-center justify-between py-[10px] text-[#ffffff] px-8 bg-[#ffffff1F]` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {
              pathname.includes('/earn-points') ?
              <Image src="./images/cup-colored.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/cup.svg" width={20} height={20} alt="cup image" />
            }
              <p className="ml-[10px]">Earn Points</p>
          </div>
        </Link> */}
      </div>

      <div className="mt-7 text-white">
        <p className="text-[12px] text-[#ffffff] mb-2 px-5">FINANCE</p>
        <Link href='/wallet' className={ pathname.includes('/wallet') || pathname.includes('send')  ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
              {
                pathname.includes('/wallet') ?
                <Image src="./images/wallet-colored.svg" width={20} height={20} alt="cup image" />
                :
                <Image src="./images/wallet.svg" width={20} height={20} alt="cup image" />
              }
              <p className="ml-[10px]">Wallet</p>
          </div>
        </Link>
        <Link href='/deposit' className={ pathname.includes('deposit')? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
              {
                pathname.includes('deposit') ?
                <Image src="./images/money-recive-colored.svg" width={20} height={20} alt="cup image" />
                :
                <Image src="./images/money-recive.svg" width={20} height={20} alt="cup image" />
              }
              <p className="ml-[10px]">Deposit</p>
          </div>
        </Link>
        <Link href='/withdraw' className={ pathname.includes('withdraw') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {   
              pathname.includes('withdraw') ?
              <Image src="./images/money-send-colored.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/money-send.svg" width={20} height={20} alt="cup image" />
            }
              <p className="ml-[10px]">Withdraw</p>
          </div>
        </Link>
        <Link href='/swap-assets' className={ pathname.includes('/swap-assets') || pathname.includes('swap-assets')  ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {   
              pathname.includes('swap') ?
              <Image src="./images/swap-colored.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/swap.svg" width={20} height={20} alt="cup image" />
            }
              <p className="ml-[10px]">Swap Assets</p>
          </div>
        </Link>
        <Link href='/history' className={ pathname.includes('/history') || pathname.includes('/transaction-info') ? `flex items-center justify-between py-[10px] text-[#ffffff] px-8 bg-[#ffffff1F]` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {
              pathname.includes('history') ?
              <Image src="./images/receipt@3x-1.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/receipt@3x.svg" width={20} height={20} alt="cup image" />
            }
              <p className="ml-[10px]">History</p>
          </div>
        </Link>
      </div>

      {/* <div className="mt-7 text-white">
        <p className="text-[12px] text-[#ffffff] mb-2 px-5">EARN</p>
        <Link href='/savings' className={ pathname.includes('/savings') || pathname.includes('/save-asset') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {
              pathname.includes('savings') ?
              <Image src="./images/strongbox@3x-1.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/strongbox@3x.svg" width={20} height={20} alt="cup image" />
            }
            <p className="ml-[10px]">Savings</p>
          </div>
        </Link>
      </div> */}

      <div className="mt-7 text-white">
        <p className="text-[12px] text-[#ffffff] mb-2 px-5">ACCOUNT</p>
        <Link href='/settings' className={ pathname.includes('/settings') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {
              pathname.includes('settings') ?
              <Image src="./images/settings-colored.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/setting@3x.svg" width={20} height={20} alt="cup image" />
            }
            <p className="ml-[10px]">Settings</p>
          </div>
        </Link>
        {/* <Link href='/help-and-support' className={ pathname.includes('/help-and-support') ? `flex items-center justify-between py-[10px] text-[#ffffff] bg-[#ffffff1F] px-8` :`px-8 flex items-center justify-between py-[10px] text-[#ffffff]`}>
          <div className="flex items-center">
            {
              pathname.includes('help-and-support') ?
              <Image src="./images/message-question@3x-1.svg" width={20} height={20} alt="cup image" />
              :
              <Image src="./images/message-question@3x.svg" width={20} height={20} alt="cup image" />
            }
              <p className="ml-[10px]">Help & Support</p>
          </div>
        </Link> */}
        <div onClick={handleLogout} className='cursor-pointer px-8 flex items-center justify-between py-[10px] text-[#ffffff]'>
          <div className="flex items-center">
            <Image src="./images/logout@3x.svg" width={20} height={20} alt="cup image" />
            <p className="ml-[10px]">Logout</p>
          </div>
        </div>
      </div>

      {/* <div className="ml-[10px] mt-[15rem] mb-16">
        <div className="flex align-center">
            <img src={userData?.userProfileUrl} className="w-[50px]" style={{ marginRight: 12, }} />
            <div>
              <p className='text-[#ffffff] text-[14px] font-[500]'>{userData?.username}</p>
              <p className="text-[#6F7975] text-[12px] tex-[#ffffff]">{userData?.primaryEmail}</p>
            </div>
          </div>
      </div> */}
  </div>
  )
}

export default SideNav