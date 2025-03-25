"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { BsEmojiSmile, BsCurrencyEuro } from 'react-icons/bs'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaXTwitter, FaQuestion, FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineFeedback, MdOutlineSavings } from "react-icons/md";
import { PiHandDepositBold, PiHandWithdrawBold, PiUserCircle } from "react-icons/pi";
import { MdOutlinePolicy } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { SiSolana } from "react-icons/si";
import { PiCurrencyNgn } from "react-icons/pi";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const HelpAndSupport = () => {

  const stagesArray = ["Stage 1", "Stage 2", "Stage 3"]
  const [stage, setStage] = useState(stagesArray[0])
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if(token) router.replace('/help-and-support')
  }, [])


  return (
    <div>
        <div className='flex items-start'>
            <SideNav />
            <div className="w-full lg:w-[84%] ml-auto">
                <TopNav />
                <div className="px-[10px] pb-[70px] pt-[70px]  mt-5 mx-[30px]">
                    <div className='px-[10px]'>
                      <p className='text-center mb-3'>How can we help?</p>
                      {
                        stage === "Stage 1" &&
                          <div className='w-[500px] mx-auto'>
                            <div className='bg-[#C7C7C71F] rounded-[11px] py-[30px] px-[30px] shadow'>
                                <div className="flex items-center flex-col justify-center gap-5 w-full mx-auto">
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                    <Image src="./images/emoji-happy@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Getting Started</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <Image src="./images/profile-circle@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Account & Profile</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <Image src="./images/bubble@3x.svg" width={20} height={20} alt="cup image" />
                                      <p>Getting more out of Mammon finance</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/message-question@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>FAQ</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <Image src="./images/key@3x.svg" width={20} height={20} alt="cup image" />
                                      <p>Policy & Security</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/Group@3x.svg" width={20} height={20} alt="cup image" />
                                      <p>Contact us on X</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/sms@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Provide Feedback</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  {/* <div className='flex items-center gap-[1rem] w-full flex-col'>
                                    <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                      <p>Contact us on</p>
                                      <FaXTwitter />
                                    </div>
                                    <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                      <p>Provide Feedback</p>
                                      <MdOutlineFeedback />
                                    </div>
                                  </div> */}
                                </div>
                            </div>
                            <div className='flex items-center justify-between mt-3'>
                              <div className='w-full'></div>
                              <button onClick={() => setStage("Stage 2")} className='flex items-center justify-between w-[120px]  mx-auto px-3 py-2 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                Next
                                <FiChevronRight />
                              </button>
                            </div>
                          </div>
                      }

                      {
                        stage === "Stage 2" &&
                          <div className='w-[500px] mx-auto'>
                            <div className='bg-[#C7C7C71F] rounded-[11px] py-[30px] px-[30px] shadow'>
                                <div className="flex items-center flex-col justify-center gap-5 w-full mx-auto">
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/money-recive-colored.svg" width={20} height={20} alt="cup image" />
                                      <p>Deposits</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/money-send-colored.svg" width={20} height={20} alt="cup image" />
                                      <p>Withdrawals</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  {/* <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/strongbox@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Savings</p>
                                    </div>
                                    <FiChevronRight />
                                  </div> */}
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <Image src="./images/emoji-happy@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Transfers</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <Image src="./images/key@3x.svg" width={20} height={20} alt="cup image" />
                                      <p>Policy & Security</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/Group@3x.svg" width={20} height={20} alt="cup image" />
                                      <p>Contact us on X</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <Image src="./images/sms@3x-1.svg" width={20} height={20} alt="cup image" />
                                      <p>Provide Feedback</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                </div>
                            </div>
                            <div className='flex items-end justify-end mt-3 gap-3'>
                              <button onClick={() => setStage("Stage 1")} className='flex items-center justify-between w-[100px]  px-3 py-2 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                <FiChevronLeft />
                                Prev
                              </button>
                              <button onClick={() => setStage("Stage 3")} className='flex items-center justify-between w-[100px]  px-3 py-2 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                Next
                                <FiChevronRight />
                              </button>
                            </div>
                          </div>
                      }
                      {
                        stage === "Stage 3" &&
                          <div className='w-[500px] mx-auto'>
                            <div className='bg-[#C7C7C71F] rounded-[11px] py-[30px] px-[30px] shadow'>
                                <div className="flex items-center flex-col justify-center gap-5 w-full mx-auto">
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <PiHandWithdrawBold />
                                      <p>Mammon Essential: 3 ways to withdraw funds</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <BiDollar />
                                      <p>How to withdraw USD</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <BsCurrencyEuro />
                                      <p>How to withdraw Euro</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <SiSolana />
                                      <p>How to withdraw SOL</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                      <PiCurrencyNgn />
                                      <p>How to withdraw NGN</p>
                                    </div>
                                    <FiChevronRight />
                                  </div>
                                  <div className='flex items-center gap-[1rem] w-full'>
                                    <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                      <p>Contact us on</p>
                                      <FaXTwitter />
                                    </div>
                                    <div className='flex items-center justify-between w-full  mx-auto p-3 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                      <p>Provide Feedback</p>
                                      <MdOutlineFeedback />
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className='flex items-end justify-end mt-3 gap-3'>
                              <button onClick={() => setStage("Stage 2")} className='flex items-center justify-between w-[100px]  px-3 py-2 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                <FiChevronLeft />
                                Prev
                              </button>
                              {/* <button onClick={() => setStage("Stage 2")} className='flex items-center justify-between w-[100px]  px-3 py-2 rounded-[8px] text-primary-color shadow-md cursor-pointer'>
                                Next
                                <FiChevronRight />
                              </button> */}
                            </div>
                          </div>
                      }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HelpAndSupport