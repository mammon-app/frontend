"use client";

import React, { useEffect, useState } from "react";

import { IoIosLogOut } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
// import { Link, useLocation, useNavigate } from 'react-router-dom';

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import Cookies from "js-cookie";
import { LuUserCircle } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import Image from "next/image";

const TopNav = () => {
  const router = useRouter();
  // const location = useLocation()
  const [notification, setNotification] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const notificationArray = [
    {
      title: "New Daily Mint by Atari",
      desc: "Unlock community, gaming, and IRL utility with a new generation of Atari.",
    },
    // {
    //   title:'Your weekly summary is ready for review🔥 ',
    //   desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    // },
    // {
    //   title:'Bitcoin(BTC) +1.1% ($40,00) in the last 18 mins.',
    //   desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    // },
    // {
    //   title:'Invitation Accepted!',
    //   desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    // },
    // {
    //   title:'50% off the service fee',
    //   desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    // }
  ];

  const user = Cookies.get("token");
  // const API_KEY = import.meta.env.VITE_API_KEY
  // const BASE_URL = import.meta.env.VITE_BASE_URL
  const [userData, setUserData] = useState();

  async function getUserInfo() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/profile`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data, "Failed to fetch user info");
      setUserData(data.data);
      // localStorage.setItem('userData', JSON.stringify(data.data))
    } catch (error) {
      console.error(error);
    }
  }

  const [selectedNav, setSelectedNav] = useState();

  useEffect(() => {
    getUserInfo();
  }, []);

  const pathname = usePathname();

  function handleLogout() {
    localStorage.clear();
    Cookies.remove("token");
    router.replace("/login");
  }

  return (
    <div>
      <div
        style={{ display: "none" }}
        className="bg-[#FFFFFF]  shadow-[inset_5px_0px_10px_black,inset_-5px_0px_10px_#E1E1E1] rounded-[8px] hidden lg:flex items-center justify-center gap-[70px] w-[95%] py-[1.2rem] top-0 right-0 z-[99] mx-auto mt-[1.2rem] relative"
      >
        <div className="flex justify-between px-[3rem] w-full">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              {/* <img src="./images/overview.svg" alt="" /> */}
              <p>
                {/* <p className='text-black capitalize'>{location.pathname.replace(/^\//, '')}</p> */}
              </p>
            </div>
            {/* <div className='flex items-center gap-2 bg-[#F8F8F8] shadow-[inset_5px_0px_10px_black,inset_-5px_0px_10px_#E1E1E1] rounded-[4px] px-[12px] py-[7px] w-[200px] lg:w-[400px] '>
              <CiSearch className='text-black text-[26px] cursor-pointer'/>
              <input type="text" placeholder='Search transactions, assets etc.' className='text-[#333333] w-full placeholder:text-[#333333] bg-transparent text-[14px] outline-none'/>
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            {/* <img src="./images/moon.svg" alt="" /> */}
            <div className="p-2 rounded-[8px] bg-[#B9B9B926]">
              <img
                src="./images/notification.svg"
                alt=""
                className="cursor-pointer"
                onClick={() => setNotification(true)}
              />
            </div>
            <button
              className="flex items-center gap-2 text-white px-4 py-[10px] rounded-[8px] cutom-btn-gradient text-[14px]"
              onClick={() => router.replace("/leader-board")}
            >
              <img src="./images/ranking.svg" alt="" />
              <p>Leaderboard</p>
            </button>
          </div>
        </div>

        {notification && (
          <div className="h-[500px] overflow-y-scroll absolute z-[9999] mt-[590px] right-0 bg-white shadow-md border w-[360px] p-5 rounded-[8px]">
            <div className="flex items-center justify-between">
              <p className="text-[#282828] font-[500] text-[20px]">
                Notifications
              </p>
              <MdClose
                className="text-black cursor-pointer text-[20px]"
                onClick={() => setNotification(false)}
              />
            </div>
            {notificationArray.map((item, index) => {
              return (
                <div key={index} className="border-b mt-5 pb-1">
                  <p className="text-primary-color font-[600]">{item.title}</p>
                  <p className="text-[#767676] font-[300] text-[14px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={
          mobileNav === true
            ? `p-[20px] flex items-center bg-white justify-between z-[9999] lg:hidden fixed w-full `
            : `p-[20px] flex lg:hidden items-center justify-between`
        }
      >
        <Link href="/">
          <Image
            src={mobileNav === true ? `/images/mammon-app-logo-dark.svg`:`/images/mammon-app-logo.svg`}
            width={200}
            height={200}
            alt="Mammon Logo"
          />
        </Link>
        <div className="flex items-center gap-4" style={{ display: "none" }}>
          <div className="p-2 rounded-[8px] bg-[#B9B9B926]">
            <Image
              src="/images/notification.svg"
              alt="Notification Icon"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setNotification(true)}
            />
          </div>
        </div>
        {/* */}
        {notification && (
          <div
            style={{ display: "none" }}
            className="h-[500px] overflow-y-scroll absolute z-[999999] mt-[590px] right-0 bg-white shadow-md border w-[360px] p-5 rounded-[8px]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[#282828] font-[500] text-[20px]">
                Notifications
              </p>
              <MdClose
                className="text-black cursor-pointer text-[20px]"
                onClick={() => setNotification(false)}
              />
            </div>
            {notificationArray.map((item, index) => {
              return (
                <div
                  style={{ display: "none" }}
                  key={index}
                  className="border-b mt-5 pb-1"
                >
                  <p className="text-primary-color font-[600]">{item.title}</p>
                  <p className="text-[#767676] font-[300] text-[14px]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={
          mobileNav === true
            ? `py-4 px-6 flex items-center bg-white justify-between z-[9999] lg:hidden fixed w-full top-[62px]`
            : `py-4 px-6 flex items-center justify-between lg:hidden relative`
        }
      >
        <div>
          <p
            className={
              mobileNav === true
                ? `text-black font-[500] text-[18px]`
                : `text-white font-[500] text-[18px]`
            }
          >
            Hi, {userData?.username}
          </p>
          <p
            className={
              mobileNav === true
                ? `text-[#474646] text-[14px] font-[300]`
                : `text-[#959595] text-[14px] font-[300]`
            }
          >
            Welcome to Mammon App
          </p>
        </div>
        <div className={
              mobileNav === true
                ? "p-2 rounded-[8px] bg-[#000000] text-[24px] cursor-pointer"
                : "p-2 rounded-[8px] bg-[#B9B9B926] text-[24px] cursor-pointer"
            }
        >
          <BiMenu onClick={() => setMobileNav(!mobileNav)} />
        </div>
        {mobileNav && (
          <div className="fixed bg-white left-0 w-full pb-[20px] top-[140px] z-[9999]">
            <div className="grid gap-5 px-6 text-black text-[12px] font-[500] pt-4">
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setSelectedNav(selectedNav === "home" ? false : "home")
                  }
                >
                  <p>HOME</p>
                  <GoChevronDown className="text-[24px]" />
                </div>
                {selectedNav === "home" && (
                  <div className="ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]">
                    {/* <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Get Started</p>
                    </div> */}
                    <Link
                      href="/dashboard"
                      className={
                        pathname.includes("/dashboard")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {/* <RxDashboard /> */}
                        {pathname.includes("/dashboard") ? (
                          <Image
                            src="./images/element-3.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/element-3-color.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Dashboard</p>
                      </div>
                    </Link>
                    {/* <Link href='/earn-points' className={ pathname.includes('/earn-points') ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]` :`px-5 flex items-center justify-between py-[10px] text-black`}>
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
                )}
              </div>

              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setSelectedNav(
                      selectedNav === "finance" ? false : "finance"
                    )
                  }
                >
                  <p>FINANCE</p>
                  <GoChevronDown className="text-[24px]" />
                </div>
                {selectedNav === "finance" && (
                  <div className="ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]">
                    <Link
                      href="/wallet"
                      className={
                        pathname.includes("/wallet") ||
                        pathname.includes("send")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("/wallet") ? (
                          <Image
                            src="./images/wallet-colored.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/wallet.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Wallet</p>
                      </div>
                    </Link>
                    <Link
                      href="/deposit"
                      className={
                        pathname.includes("deposit")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("deposit") ? (
                          <Image
                            src="./images/money-recive-colored.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/money-recive.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Deposit</p>
                      </div>
                    </Link>
                    <Link
                      href="/withdraw"
                      className={
                        pathname.includes("withdraw")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("withdraw") ? (
                          <Image
                            src="./images/money-send-colored.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/money-send.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Withdraw</p>
                      </div>
                    </Link>
                    <Link
                      href="/swap-assets"
                      className={
                        pathname.includes("withdraw")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("withdraw") ? (
                          <Image
                            src="./images/money-send-colored.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/swap.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Swap Assets</p>
                      </div>
                    </Link>
                    <Link
                      href="/history"
                      className={
                        pathname.includes("/history") ||
                        pathname.includes("/transaction-info")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("history") ? (
                          <Image
                            src="./images/receipt@3x-1.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/receipt@3x.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">History</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* <div>
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setSelectedNav(selectedNav === 'earn' ? false : 'earn')}>
                  <p>EARN</p>
                  <GoChevronDown className='text-[24px]'/>
                </div>
                {
                  selectedNav === "earn" &&
                  <div className='ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]'>
                    <Link href='/savings' className={ pathname.includes('/savings') || pathname.includes('/save-asset') ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5` :`px-5 flex items-center justify-between py-[10px] text-black`}>
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
                  </div>
                }
              </div> */}

              <div>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setSelectedNav(
                      selectedNav === "account" ? false : "account"
                    )
                  }
                >
                  <p>ACCOUNT</p>
                  <GoChevronDown className="text-[24px]" />
                </div>
                {selectedNav === "account" && (
                  <div className="ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]">
                    <Link
                      href="/settings"
                      className={
                        pathname.includes("/settings")
                          ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5`
                          : `px-5 flex items-center justify-between py-[10px] text-black`
                      }
                    >
                      <div className="flex items-center">
                        {pathname.includes("settings") ? (
                          <Image
                            src="./images/settings-colored.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        ) : (
                          <Image
                            src="./images/setting@3x.svg"
                            width={20}
                            height={20}
                            alt="cup image"
                          />
                        )}
                        <p className="ml-[10px]">Settings</p>
                      </div>
                    </Link>
                    {/* <Link href='/help-and-support' className={ pathname.includes('/help-and-support') ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5` :`px-5 flex items-center justify-between py-[10px] text-black`}>
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
                    <div
                      onClick={handleLogout}
                      className="cursor-pointer px-5 flex items-center justify-between py-[10px] text-black"
                    >
                      <div className="flex items-center">
                        <Image
                          src="./images/logout@3x.svg"
                          width={20}
                          height={20}
                          alt="cup image"
                        />
                        <p className="ml-[10px]">Logout</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                style={{ display: "none" }}
                className="flex items-center gap-2 text-white px-4 py-[10px] rounded-[8px] cutom-btn-gradient mt-[3rem] mb-5 justify-center"
                onClick={() => router.replace("/leader-board")}
              >
                <img src="./images/ranking.svg" alt="" />
                <p>Leaderboard</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
