"use client"

import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import SideNav from '../components/side-nav/SideNav';
import TopNav from '../components/top-nav/TopNav';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Withdraw = () => {

  const currencies = [
    { name: 'Nigerian Naira', code: 'NGN', icon: "NGN" },
    { name: 'Stellar Lumens', code: 'XLM', icon: '⭐' },
    { name: 'Bitcoin', code: 'BTC', icon: '₿' },
    { name: 'Ethereum', code: 'ETH', icon: 'Ξ' },
    { name: 'USD Coin', code: 'USDC', icon: '💵' },
    { name: 'British Pound Sterling', code: 'GBP', icon: '💷' },
    { name: 'Canadian Dollar', code: 'CAD', icon: '🇨🇦' },
    { name: 'Austrian Dollar', code: 'AUD', icon: '🇦🇹' },
  ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');

    const router = useRouter()

    const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
        <div className='flex items-start'>
            <SideNav />
            <div className="w-full lg:w-[84%] ml-auto">
                <TopNav />
                <div className="py-[20px] px-[30px] h-[100vh] mt-5 lg:mx-[25px]">
                  <div className='mt-5 ml-1 hidden lg:block'>
                    <p className='text-[32px] text-primary-color'>Withdraw Crypto</p>
                    <p className='font-[300] text-[#ffffff]'>Send crypto from your balance</p>
                  </div>
                  <div className='mt-9'>
                    <div className='flex items-center gap-5 flex-col md:flex-row'>
                        <div className='bg-primary-color h-[420px] text-white p-[1.5rem] cursor-pointer w-[300px] hover:scale-[1.01] transition-all' onClick={() => router.replace(`/withdraw-crypto`)}>
                            <div className='bg-white p-2 inline-block rounded-full'>
                                <Image src="./images/empty-wallet.svg" width={20} height={20} alt="" />
                            </div>
                            <div className='mt-[12rem] mb-[52px]'>
                                <p className='font-[500] text-[20px]'>Withdraw crypto</p>
                                <p className='mt-3 font-[300] text-[14px]'>Transfer crypto to an external Wallet</p>
                            </div>
                        </div>
                        <div className='w-[300px] h-[420px] bg-[#EBEFFF] text-[#222222] p-[1.5rem] cursor-pointer hover:scale-[1.01] transition-all' onClick={() => router.replace(`/withdraw-fiat`)}>
                            <div className='bg-white p-2 inline-block rounded-full'>
                                <Image src="./images/bank.svg" width={20} height={20} alt="" />
                            </div>
                            <div className='mt-[12rem] mb-7'>
                                <p className='font-[500] text-[20px]'>Withdraw with Fiat</p>
                                <p className='mt-3 text-[#757575] text-[14px] font-[300]'>Send crypto and get fiat</p>
                            </div>
                        </div>
                    </div>
                  </div>
                  {/* <div className='mt-9'>
                    <h2 className="lg:text-center lg:text-[#151517] text-primary-color mb-2 font-[500] lg:font-[400] text-left">Choose your withdrawal currency</h2>
                    <div className='flex items-center gap-5'>
                        <div className="lg:w-[550px] w-full mx-auto lg:px-4 py-4 lg:bg-[#F8F8F8] bg-transparent rounded-lg border border-transparent lg:border-[#B2B2B27A]">
                            
                            <ul className='flex items-center justify-between'>
                              <li className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedCurrency('local')}>
                                  <p>Withdraw Local Currency</p>
                                  {selectedCurrency === "local" && (
                                      <FaCheckCircle className="text-green-500 ml-2" />
                                  )}
                              </li>
                              <li  className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-100 cursor-pointer"  onClick={() => setSelectedCurrency('crypto')}>
                                  <p>Withdraw Crypto Currency</p>
                                  {selectedCurrency === "crypto" && (
                                      <FaCheckCircle className="text-green-500 ml-2" />
                                  )}
                              </li>
                            </ul>
                            <button onClick={() => router.replace(`/withdraw-currency/${selectedCurrency}`)} className="w-full p-2 mt-4 bg-primary-color text-white rounded-lg hover:bg-blue-600">
                                Proceed
                            </button>
                        </div>
                    </div>
                  </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Withdraw