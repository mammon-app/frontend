"use client"

import React from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { RiBankLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { Red_Hat_Mono } from "next/font/google";

const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

const WithdrawCurrency = () => {

    // const { country } = useParams()
    const router = useRouter()

  return (
    <div>
        <div className='flex items-start'>
            <SideNav />
            <div className="w-full lg:w-[84%] ml-auto">
                <TopNav />
                <div className="py-[20px] px-[10px] h-[100vh]  mt-5 lg:mx-[25px]">
                  <div className='mt-5 ml-1 hidden lg:block'>
                    <p className='text-primary-color text-[32px]'>Withdraw</p>
                    <p className='font-[300] text-[#ffffff]'>Buy crypto with your money</p>
                  </div>
                  <div className='mt-9'>
                    <h2 className="text-center text-white mb-2 font-[500] lg:font-[400]">Choose your withdrawal method</h2>
                    <div className='flex items-center gap-5'>
                        <div className="w-[500px] mx-auto lg:p-2 rounded-lg border border-[#B2B2B27A] responsive-widths">
                            <div className='bg-[#D2D9F542] p-3 rounded-[8px]'>
                              <div className='flex items-center justify-between'>
                                <div>
                                  <p className='text-[#ffffff]'>Bank Transfer</p>
                                  <p className='font-300 text-[#ffffff]'>
                                    Nigerian Naira
                                  </p>
                                </div>
                                <div className='bg-[#ffffff] p-1 rounded-full'>
                                  <RiBankLine className='text-primary-color text-[22px]'/>
                                </div>
                              </div>
                              <div className='mt-5'>
                                <p className='text-white'>Transfer Time</p>
                                <p className='font-300 text-[#ffffff]'>0 - 15 hours</p>
                              </div>
                            </div>
                            <div className='lg:flex items-center justify-center hidden'>
                              <button className='py-2 w-[90%] mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]' onClick={() => router.replace(`/withdraw-provider`)} >Proceed</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex items-center gap-5 mt-5 lg:hidden'>
                        <div className="w-[500px] mx-auto lg:p-2 bg-[#F8F8F8] rounded-lg border border-[#B2B2B27A] responsive-widths">
                            <div className='bg-white p-3 rounded-[8px]'>
                              <div className='flex items-center justify-between'>
                                <div>
                                  <p className='text-[#ffffff]'>Wallet Transfer</p>
                                  <p className='font-300 text-[#ffffff]'>
                                    Nigeria
                                  </p>
                                </div>
                                <div className='bg-[#CCD6FF54] p-1 rounded-full'>
                                  <RiBankLine className='text-primary-color text-[22px]'/>
                                </div>
                              </div>
                              <div className='mt-5'>
                                <p className='text-primary-color'>Transfer Time</p>
                                <p className='font-300 text-[#ffffff]'>0 - 15 hours</p>
                              </div>
                            </div>
                            <div className='lg:flex items-center justify-center hidden'>
                              <button className={`py-2 w-[90%] mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem] ${redHatMono.className}`} onClick={() => router.replace(`/withdraw-provider`)} >Proceed</button>
                            </div>
                        </div>
                    </div> */}
                    <div className='lg:hidden items-center justify-center flex mt-[5rem] w-[500px] mx-auto responsive-widths'>
                      <button className='py-2 w-full mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]' onClick={() => router.replace(`/withdraw-provider`)} >Proceed</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WithdrawCurrency