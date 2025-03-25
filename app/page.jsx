"use client";

import Image from "next/image";
import { Red_Hat_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoChevronDown, IoChevronDownOutline } from "react-icons/io5";
import { BsDashLg } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";

const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [value, setValue] = useState(2.75);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div>
      {mobileNav && (
        <nav className="flex flex-col items-center justify-between py-[20px] md:px-[80px] px-[16px] bg-[#F8F8F8] fixed w-full top-[0px]">
          <div className="flex items-center justify-between w-full mb-10">
            <Link href="/">
              <Image
                src="./images/mammon-app-logo.svg"
                alt="Logo"
                width={250}
                height={250}
              />
            </Link>
            <RxDashboard
              onClick={() => setMobileNav(!mobileNav)}
              className="lg:hidden block text-[22px] cursor-pointer text-[#ffffff]"
            />
          </div>
          <ul className="flex flex-col items-start gap-[30px] w-full">
            {/* <li className='text-[#ffffff]'>
                        <Link href="/">Individual</Link>
                    </li> */}
            {/* <li className='flex items-center gap-1 text-[#667085] cursor-pointer w-full justify-between'>
                        <p>Business</p>
                        <IoChevronDownOutline />
                    </li> */}
            {/* <Link href="https://mammonapp100.medium.com" className='flex items-center gap-1 text-[#667085] cursor-pointer w-full justify-between'>
                        <p className="font-[300]">Blog</p>
                        <IoChevronDownOutline />
                    </Link> */}
            <div className="items-center gap-5 flex">
              <button
                onClick={() => router.push("/login")}
                className="text-white px-[20px] py-[6px] rounded-[8px] bg-primary-color"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/create-account")}
                className="text-white px-[20px] py-[6px] rounded-[8px] bg-primary-color"
              >
                Sign Up
              </button>
            </div>
            {/* <li className='text-[#667085]'>
                        <Link href="/">Faq</Link>
                    </li> */}
            <button
              onClick={() => router.replace("/create-account")}
              className="text-white px-[20px] py-[10px] rounded-[8px] w-full mt-3"
            >
              Get Started
            </button>
          </ul>
          {/* <RxDashboard className="lg:hidden block text-[22px] cursor-pointer text-[#ffffff]"/> */}
        </nav>
      )}
      <nav className="flex items-center justify-between py-[20px] lg:max-w-[1240px] mx-auto md:px-[60px] px-[16px]">
        <Link href="/">
          <Image
            src="./images/mammon-app-logo.svg"
            alt="Logo"
            width={250}
            height={250}
          />
        </Link>
        <ul className="lg:flex items-center gap-[50px] hidden">
          {/* <li className='text-[#ffffff]'>
                    <Link href="/">Individual</Link>
                </li> */}
          {/* <li className='flex items-center gap-1 text-[#667085] cursor-pointer'>
                    <p>Business</p>
                    <IoChevronDownOutline />
                </li> */}
          {/* <Link href="https://mammonapp100.medium.com" className='flex items-center gap-1 text-[#667085] cursor-pointer'>
                    <p className="font-[300]">Blog</p>
                    <IoChevronDownOutline />
                </Link> */}
          {/* <li className='text-[#667085]'>
                    <Link href="/">Faq</Link>
                </li> */}
        </ul>
        <RxDashboard
          onClick={() => setMobileNav(!mobileNav)}
          className="lg:hidden block text-[22px] cursor-pointer text-[#ffffff]"
        />
        <div className="items-center gap-5 lg:flex hidden">
          <button
            onClick={() => router.push("/login")}
            className="text-white px-[20px] py-[6px] rounded-[8px] bg-primary-color"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/create-account")}
            className="text-white px-[20px] py-[6px] rounded-[8px] bg-primary-color"
          >
            Sign Up
          </button>
        </div>
      </nav>
      <main className="md:px-[64px] px-[16px] flex items-center lg:max-w-[1240px] w-[100%] mx-auto mt-[2rem] flex-col md:flex-row">
        <div className="md:mt-[2rem]">
          <p className="home-text-gradient lg:text-[72px] md:text-[52px] text-[45px] font-[600] md:w-[400px] md:leading-[68px] leading-[45px]">
            Earn, Save, Spend
          </p>
          <p className="text-[#ffffff] lg:text-[72px] md:text-[52px] text-[45px] font-[600]">
            Like A Boss.
          </p>
          <p className="text-[#ffffff] md:w-[70%] font-[300]">
            Mammon App offers the opportunity to experience Hassle-Free
            Cryptocurrency transactions for individuals and businesses.
          </p>
          <button
            onClick={() => router.push("/create-account")}
            className="text-white px-[20px] py-[6px] rounded-[10px] mt-[1rem] bg-primary-color hidden md:block"
          >
            Get Started
          </button>
        </div>
        <div className="flex justify-center items-center rounded-[11px] mt-9 flex-col">
          <div className="flex justify-center items-center w-full">
            <div className="border border-[#B2B2B27A] py-6 sm:px-[40px] p-[15px] rounded-[8px]  lg:w-[500px] w-full">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <p
                    className={`text-[#ffffff] text-[14px] font-[300] ${redHatMono.className}`}
                  >
                    Save amount
                  </p>
                  <div
                    className={`flex text-[14px] text-[#ffffff] ${redHatMono.className}`}
                  >
                    <p className={`text-[#ffffff]`}>Balance:</p>
                    <span className="text-white">200.00</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 border border-[#B2B2B27A] rounded-[24px] p-2 items-center">
                  <div className="flex item-center gap-2">
                    <div className="flex items-center bg-[#76748014] rounded-full p-2">
                      <img src="./images/Nigeria.svg" alt="" />
                      <p className="mr-2 ml-1 text-[14px]">NGN</p>
                      <IoChevronDown className="text-white" />
                    </div>
                    <input
                      type="number"
                      id="input-amount"
                      className="outline-none lg:w-1/2 w-full bg-transparent text-[#ffffff]"
                      placeholder="300000"
                    />
                  </div>
                  <p className="text-whitemr-3 text-[12px]">Max</p>
                </div>
              </div>

              <div className="my-4">
                <div className="flex justify-between items-center">
                  <p
                    className={`text-[#ffffff] text-[14px] font-[300] ${redHatMono.className}`}
                  >
                    Receive amount
                  </p>
                  <div
                    className={`flex text-[14px] text-[#ffffff] ${redHatMono.className}`}
                  >
                    <p className="text-[#ffffff]">Balance:</p>
                    <span className="text-white">200.00</span>
                  </div>
                </div>
                <div className="flex justify-between border border-[#B2B2B27A] rounded-[24px] p-2 items-center">
                  <div className="flex item-center gap-2">
                    <div className="flex items-center bg-[#76748014] rounded-full p-2">
                      <img
                        src="./images/Stellar_(XLM).svg"
                        className="w-[20px]"
                        alt=""
                      />
                      <p className="mr-2 ml-1 text-[14px]">XLM</p>
                      <IoChevronDown className="text-white" />
                    </div>
                    <input
                      type="number"
                      id="input-amount"
                      className="outline-none w-1/2 bg-transparent text-[#ffffff]"
                      placeholder="0.00345"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="small-range"
                  className={`text-[#ffffff] text-[14px] font-[300] ${redHatMono.className}`}
                >
                  Slippage
                </label>
                <input
                  id="small-range"
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.01}
                  value={value}
                  onChange={handleChange}
                  className="w-full h-1 mb-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                />
                <p className="text-[#ffffff] text-[14px] font-[300] text-center">
                  {value}%
                </p>
              </div>
              <button className="bg-primary-color text-white p-3 rounded-lg w-full mt-[1rem]">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <div
        className={`flex md:flex-row-reverse flex-col md:px-[64px] px-[16px] items-end justify-between lg:max-w-[1240px] md:w-[100%] mx-auto ${redHatMono.className}`}
      >
        <div className="flex justify-center items-center w-full">
          <div className="py-4 px-[40px] rounded-[8px] lg:w-[500px] w-full mt-[1rem] border border-[#B2B2B27A]">
            <p className="text-[14px] text-[#ffffff] border-b border-[#CFCFCF] pb-2">
              yUSDC = $3,000
            </p>
            <div className="flex flex-col gap-[8px] mt-5">
              <div className="flex items-center justify-between text-[14px] text-[#ffffff]">
                <p>Reference APR</p>
                <p>3.50%</p>
              </div>
              <div className="flex items-center justify-between text-[14px] text-[#ffffff]">
                <p>Exchange Rate</p>
                <p>1 USDC = 0.98911 yUSDC</p>
              </div>
              <div className="flex items-center justify-between text-[14px] text-[#ffffff]">
                <p>Transaction Cost</p>
                <p>~$11.24</p>
              </div>
              <div className="flex items-center justify-between text-[14px] text-[#ffffff]">
                <p>Reward Fee</p>
                <p>10%</p>
              </div>
              <div className="flex items-center justify-between text-[14px] text-[#ffffff]">
                <p>Referrer</p>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:mr-[20rem] md:mt-0 mt-10">
          <p className="text-[#ffffff] uppercase tracking-[8.319px] self-end font-[500]">
            Supported by:
          </p>
          <div className="flex items-center gap-10 mt-[2rem]">
            <img
              src="./images/stellar-foundation.svg"
              className="w-[70px] md:w-[100%]"
              alt=""
            />
            <img
              src="./images/stellar.svg"
              className="w-[70px] md:w-[100%]"
              alt=""
            />
          </div>
        </div>
      </div>
      <section className="mt-[10rem] lg:max-w-[1240px] md:w-[100%] mx-auto px-[16px] md:px-[80px]">
        <p className="text-[#ffffff] tracking-[8px] font-[500] text-center">
          WHY SAVE WITH US
        </p>
        <div className="flex items-center justify-center gap-[12rem] md:gap-[7rem] flex-col md:flex-row text-center mt-[3rem]">
          <div>
            <img
              src="./images/CurrencyCrush-Mobile-Money.svg"
              className="mx-auto"
              alt=""
            />
            <p className="text-[#ffffff] font-[500] text-[24px] my-3">
              Desktop & Mobile
            </p>
            <p className="text-[#ffffff] text-[14px] font-[300]">
              Manage your funds anytime and anywhere with our great mobile and
              web apps. Track prices and stay up to date with markets.
            </p>
          </div>
          <div>
            <img
              src="./images/Currency-Crush-Shield.svg"
              className="mx-auto"
              alt=""
            />
            <p className="text-[#ffffff] font-[500] text-[24px] my-3">
              Safe & Secure
            </p>
            <p className="text-[#ffffff] text-[14px] font-[300]">
              Mammon provides highly secure storage for your Lumens and other
              digital assets, offering 2FA and multisig protection.
            </p>
          </div>
          <div>
            <img src="./images/Spakles.svg" className="mx-auto" alt="" />
            <p className="text-[#ffffff] font-[500] text-[24px] my-3">
              Simple & Clean
            </p>
            <p className="text-[#ffffff] text-[14px] font-[300]">
              Nice design, simple interface, clear instructions and helpful
              tips. Mammon is an easy way to get started with crypto.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[10rem] lg:max-w-[1200px] md:w-[100%] mx-auto px-[16px] md:px-[40px]">
        <div className="flex items-start justify-start flex-col-reverse md:flex-row">
          <div className="md:mx-auto border border-[#B2B2B27A] rounded-[4px] lg:p-6 p-3 md:w-[400px] w-full mt-6">
            <div className="flex items-center my-10">
              <img
                src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" // Replace with the appropriate URL of the USD Coin logo
                alt="USD Coin"
                className="h-6 w-6 mr-2"
              />
              <h2 className="text-[#ffffff]">Lumen</h2>
            </div>
            <div className="my-[3rem]">
              <div className="inline-flex items-center gap-1 py-2 lg:px-4 px-2 bg-[#899EFD1A] rounded-[4px]">
                <img src="./images/tag-user.svg" alt="" />
                <p className="text-white text-[10px]">
                  9143 Participants
                </p>
              </div>
              <div className="mb-2 mt-[2.5rem]">
                <span className="text-[70px] text-[#ffffff] leading-[26px]">
                  7%
                </span>
                <span className="text-2xl">APY</span>
              </div>
              <div className="mb-6">
                <p className="text-[#ffffff] text-[12px] lg:text-[16px] font-[300]">
                  With yXLM asset
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className={`${redHatMono.className} bg-primary-color w-full text-white lg:px-6 px-3 py-2 rounded-lg text-[12px] lg:text-[16px]`}
              >
                Earn with yXLM &rarr;
              </button>
            </div>
          </div>
          <div className="text-white md:w-[500px] w-full mt-16">
            <p className="font-[500] md:leading-[42px] text-[25px] md:text-[40px] mb-4">
              EARN UP TO 7% INTEREST ANNUALLY. PAID DAILY.
            </p>
            <p className="leading-[20px] w-[70%] text-[14px] font-[300] md:text-[16px] text-[#ffffff]">
              Create a savings account in USD and get 3-7% yearly interest, paid
              daily. You can track your earnings & add or withdraw money
              anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 lg:max-w-[1200px] md:w-[100%] mx-auto px-[16px] md:px-[40px]">
        <div className="flex items-start justify-start flex-col md:flex-row">
          <div className="text-white md:w-[300px] w-full md:mx-auto md:mt-[12rem] mt-[6rem] mb-7">
            <p className="font-[500] leading-[42px] text-[25px] md:text-[40px] mb-4">
              NO MONTHLY CHARGES.
            </p>
            <p className="leading-[20px] text-[14px] md:text-[16px] font-[300] text-[#ffffff]">
              Create a savings account in USD and get 3-7% yearly interest, paid
              daily. You can track your earnings & add or withdraw money
              anytime.
            </p>
          </div>
          <div
            className={`md:mx-auto border border-[#B2B2B27A] lg:p-6 p-3 md:w-[400px] w-full mt-6 md:hidden block`}
          >
            <div className="flex items-center mb-4">
              <img
                src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" // Replace with the appropriate URL of the USD Coin logo
                alt="USD Coin"
                className="h-6 w-6 mr-2"
              />
              <h2 className="text-[#ffffff]">Lumen</h2>
            </div>
            <div className="my-[3rem]">
              <div className="inline-flex items-center gap-1 py-2 lg:px-4 px-2 bg-[#899EFD1A] rounded-[4px]">
                <img src="./images/tag-user.svg" alt="" />
                <p className="text-white text-[10px]">
                  9143 Participants
                </p>
              </div>
              <div className="mb-2 mt-[2.5rem]">
                <span className="text-[70px] text-[#ffffff] leading-[26px]">
                  4%
                </span>
                <span className="text-2xl">APY</span>
              </div>
              <div className="mb-6">
                <p className="text-[#ffffff] text-[12px] lg:text-[16px] font-[300]">
                  With yXLM asset
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-white w-full text-white lg:px-6 px-3 py-2 rounded-lg font-semibold text-[12px] lg:text-[16px]">
                Earn with yXLM &rarr;
              </button>
            </div>
          </div>
          <div className="mx-auto border border-[#B2B2B27A] md:w-[500px] w-full rounded-[8px] hidden md:block">
            <div className="flex items-center mb-4">
              <img
                src="./images/mission.svg" // Replace with the appropriate URL of the USD Coin logo
                alt="USD Coin"
                className="rounded-t-[8px]"
              />
            </div>
            <div className={`mt-[2rem] mb-[3rem] ${redHatMono.className}`}>
              <p className="text-[#4BAC0D] text-center text-[20px]">
                Transaction Successful !
              </p>
              <p className="font-[300] text-center text-[#919090] mt-8">
                The receiver received:
              </p>
              <p className="text-[#ffffff] text-center font-[500] mt-4">
                2.00000 XLM (Fee: 0.1500 XLM)
              </p>

              <div className="mb-6 px-[4.5rem] mt-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[#ffffff] font-[300]">Coin</p>
                  <div className="flex items-center gap-1">
                    {/* <img src="./images/Stellar.svg" alt="" /> */}
                    <p className="text-[#ffffff]">Stellar Lumen</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#ffffff] font-[300]">Address</p>
                  <p className="text-primary-color">0xe4iJ78ufP9kwH56...k8Ty</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#ffffff] font-[300]">Network</p>
                  <p className="text-[#ffffff]">Stellar Classic Network</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#ffffff] font-[300]">Source</p>
                  <p className="text-[#ffffff]">Spot wallet</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center px-[4rem] pb-10">
              <button
                className={`${redHatMono.className} bg-primary-color w-full text-white lg:px-6 px-3 py-2 rounded-lg text-[12px] lg:text-[16px]`}
              >
                Go to wallet
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 lg:max-w-[1600px] md:w-[100%] mx-auto px-[16px] md:px-[40px]">
        <div className="flex items-start justify-center flex-col-reverse md:flex-row">
          <div
            className={`${redHatMono.className} mx-auto border border-[#B2B2B27A] w-[500px] rounded-[8px] hidden md:block`}
          >
            <div className="flex items-center mb-4">
              <img
                src="./images/success_check.png" // Replace with the appropriate URL of the USD Coin logo
                alt="USD Coin"
                className="rounded-t-[8px] w-[150px] mx-auto mt-12"
              />
            </div>
            <div className="mt-[2rem] mb-[3rem]">
              <p className="text-[#ffffff] font-[300] text-center text-[20px]">
                Saving successful
              </p>
              <p className="text-[#ffffff] text-center font-[500] text-[30px] mt-4">
                0.05456788 XLM
              </p>

              <div className="mb-6 px-[4.5rem] mt-10 flex flex-col gap-4">
                <div className="flex items-center gap-1 text-[#ffffff]">
                  <FiTarget />
                  <p>Summary</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[#ffffff] font-[300]">Save date:</p>
                  <p className="text-[#ffffff]">May 6, 2024</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[#ffffff] font-[300]">Value date:</p>
                  <p className="text-[#ffffff]">May 6, 2024</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[#ffffff] font-[300]">
                    Interest end date:
                  </p>
                  <p className="text-[#ffffff]">May 6, 2024</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[#ffffff] font-[300]">
                    Redemption period:
                  </p>
                  <p className="text-[#ffffff]">May 6, 2024</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[#ffffff] font-[300]">Redemption date:</p>
                  <p className="text-[#ffffff]">May 6, 2024</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center px-[4rem] pb-10 flex-col gap-2">
              <button className="bg-primary-color w-full text-white lg:px-6 px-3 py-2 rounded-lg text-[12px] lg:text-[16px]">
                Go to wallet
              </button>
              <button className="border border-primary-color w-full text-primary-color lg:px-6 px-3 py-2 rounded-lg text-[12px] lg:text-[16px]">
                Monitor Savings
              </button>
            </div>
          </div>
          <div className="md:mx-auto border border-[#B2B2B27A] lg:p-6 p-3 md:w-[400px] w-full mt-6 md:hidden block">
            <div className="flex items-center mb-4">
              <img
                src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" // Replace with the appropriate URL of the USD Coin logo
                alt="USD Coin"
                className="h-6 w-6 mr-2"
              />
              <h2 className="text-[#ffffff]">Lumen</h2>
            </div>
            <div className="my-[3rem]">
              <div className="inline-flex items-center gap-1 py-2 lg:px-4 px-2 bg-[#899EFD1A] rounded-[4px]">
                <img src="./images/tag-user.svg" alt="" />
                <p className="text-white text-[10px]">
                  9143 Participants
                </p>
              </div>
              <div className="mb-2 mt-[2.5rem]">
                <span className="text-[70px] text-[#ffffff] leading-[26px]">
                  4%
                </span>
                <span className="text-2xl">APY</span>
              </div>
              <div className="mb-6">
                <p className="text-[#ffffff] text-[12px] lg:text-[16px] font-[300]">
                  With yXLM asset
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-white w-full text-white lg:px-6 px-3 py-2 rounded-lg font-semibold text-[12px] lg:text-[16px]">
                Earn with yXLM &rarr;
              </button>
            </div>
          </div>
          <div className="text-white md:w-[300px] w-full md:mx-auto md:mt-[12rem] mt-[6rem] mb-7">
            <p className="font-[500] leading-[42px] text-[25px] md:text-[40px] mb-4">
              INVEST IN THE FUTURE.
            </p>
            <p className="leading-[20px] text-[14px] md:text-[16px] font-[300]">
              Create a savings account in USD and get 3-7% yearly interest, paid
              daily. You can track your earnings & add or withdraw money
              anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[10rem] lg:max-w-[1240px] md:w-[100%] mx-auto px-[16px] md:px-[80px]">
        <p className="font-[500] leading-[42px] md:text-[38px] text-[32px]">
          From cash to crypto — and back again.
        </p>
        <div className="lg:grid grid-cols-3 flex flex-col gap-2 mt-10">
          <div className="w-full border border-[#B2B2B27A] rounded-[8px] md:p-10 py-5 px-4">
            <p className="font-[500] text-[32px] mb-2 leading-[42px]">
              Deposit.
            </p>
            <p className="text-[#ffffff] text-[14px] font-[300] leading-[20px]">
              Use a card, Apple Pay, Google Pay or PayPal to buy crypto fast. We
              also accept bank transfers and wires in applicable jurisdictions.
            </p>
            <img
              src="./images/CurrencyCrush-Cash2.svg"
              className="mx-auto mt-10 w-[80%]"
              alt=""
            />
          </div>
          <div className="w-full border border-[#B2B2B27A] rounded-[8px] py-5 px-4">
            <p className="font-[500] text-[32px] mb-2 leading-[42px]">Save.</p>
            <p className="text-[#ffffff] text-[14px] font-[300] leading-[20px]">
              Swap between tokens, even if they’re on different chains (we make
              bridging seamless too).
            </p>
            <img
              src="./images/Currency-Crush-Currency-Coins.svg"
              className="mx-auto mt-10 w-[80%]"
              alt=""
            />
          </div>
          <div className="w-full border border-[#B2B2B27A] rounded-[8px] py-5 px-4">
            <p className="font-[500] text-[32px] mb-2 leading-[42px]">
              Withdraw.
            </p>
            <p className="text-[#ffffff] text-[14px] font-[300] leading-[20px]">
              Turn your crypto into cash. In a flash. Get paid straight to your
              bank account, card or PayPal account.
            </p>
            <img
              src="./images/CurrencyCrush-Pushcart.svg"
              className="mx-auto mt-10 w-[80%]"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* <section className='lg:max-w-[1240px] px-[16px] md:px-[80px] md:w-[100%] mx-auto flex items-start flex-col md:flex-row'>
            <div className='max-w-[600px] mt-[3rem] w-full'>
                <p className='text-[#2D2A2A] md:w-[70%] w-[90%] font-[300]'>Convert your native tokens to yield generating assets and receive daily interest in your Mammon wallet.</p>
                <button className='text-white px-[20px] py-[10px] rounded-[8px] mt-[1rem] bg-primary-color md:w-auto w-full'>Start Earning</button>
            </div>
            <img src="./images/CurrencyCrushMoneyplant.svg" className='mx-auto w-[200px] mt-[3rem]' alt="" />
        </section> */}

      <footer className="mt-[10rem] text-[white]  lg:max-w-[1240px] px-[16px] md:px-[80px] text-center md:w-[100%] mx-auto flex items-center md:items-start md:justify-between justify-center md:flex-row flex-col mb-10 text-[14px]">
        <p>
          &copy; {new Date().getFullYear()} Mammon finance. All rights reserved.
        </p>
        <div className="flex items-center gap-[2rem] my-5 md:my-0">
          <div className="flex items-center gap-1">
            <Link href="/login">Login</Link>
            <BsDashLg />
            <Link href="/create-account">Signup</Link>
          </div>
          <RxDividerVertical />
          <div className="flex items-center gap-1">
            <p>Privacy</p>
            <BsDashLg />
            <p>Terms</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white">
          {/* <Link
            href="https://www.linkedin.com/devcharlezen"
            target="_blank"
            className="text-[white] p-2 text-[20px] rounded-full"
          >
            <FaLinkedinIn className="text-[14px] cursor-pointer" />
          </Link> */}
          <Link
            href="https://x.com/Mammon_App"
            target="_blank"
            className="text-[white] p-2 text-[20px] rounded-full"
          >
            <FaTwitter className="text-[14px] cursor-pointer" />
          </Link>
          <div className="text-[white]  p-2 text-[20px] rounded-full">
            <RiInstagramFill className="text-[14px] cursor-pointer" />
          </div>
          <div className="text-[white]  p-2 text-[20px] rounded-full">
            <FaTelegramPlane className="text-[14px] cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
