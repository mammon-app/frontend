"use client"

import React, { useState } from 'react'
import { RiBankLine } from 'react-icons/ri'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import BtnLoader from '../components/btn-loader/BtnLoader'
import Cookies from 'js-cookie'
import { TbCurrencyNaira } from "react-icons/tb";


const DepositProvider = () => {

    // const API_KEY = import.meta.env.VITE_API_KEY
    // const BASE_URL = import.meta.env.VITE_BASE_URL
    const user = Cookies.get('token')
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState(null)
    const [transactionInfo, setTransactionInfo] = useState()
    const [id, setId] = useState('')
    const [modal, setModal] = useState(false)

    async function initiateWithdrawal(){
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sep24/initiateTransfer24`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`,
                'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify({
                assetCode: "NGNC",
                txType: "deposit",
            })
        })
        setLoading(false)
        const data = await res.json()
        
        if(res.ok){
            setUrl(data.data.json.url)
            setModal('withdraw')
        }
    }

    async function queryTransaction(){
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sep24/queryTransfers24`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`,
                'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            },
            body: JSON.stringify({
                assetCode: "NGNC"
            })
        })
        if(res) setLoading(false)
        const data = await res.json()
        (data);
        (data?.data?.json?.transactions);
        if(res.ok){
            ('Transaction successful');
            setTransactionInfo(data?.data?.json?.transactions[0])
            setModal('success')
        }
    }

  return (
    <div>
        <div className='flex items-start'>
            <SideNav />
            <div className="w-full lg:w-[84%]  ml-auto">
                <TopNav />
                <div className="py-[20px] px-[30px] h-[100vh] mt-5 lg:mx-[25px] ">
                    <div className='mt-5 ml-1 hidden lg:block'>
                        <p className='text-primary-color text-[32px]'>Bank Transfer</p>
                        <p className='font-[300] text-[#ffffff]'>Send money to get crypto</p>
                    </div>
                    <div className='mt-9'>
                        <h2 className="text-center lg:text-[#ffffff] text-primary-color mb-2 font-[500] lg:font-[400]">Choose a provider</h2>
                        <div className='flex items-center gap-5'>
                            <div className="w-[500px] mx-auto lg:p-2 border border-[#B2B2B27A] rounded-lg responsive-widths">
                                <div className='border bg-[#D2D9F542]A] p-3 rounded-[8px]'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-[#ffffff]'>Link</p>
                                            <p className='font-300 text-[#ffffff]'>
                                                Nigerian Naira
                                            </p>
                                        </div>
                                        <div className='bg-[#ffffff] p-1 rounded-full'>
                                            <RiBankLine className='text-primary-color text-[22px]'/>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <p className='text-white'>Provider fee</p>
                                        <p className='font-300 text-[#ffffff]'>Dynamic partner fees</p>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className='lg:flex items-center justify-center hidden mt-[4rem]'>
                                        <BtnLoader />
                                    </div>
                                ) : (
                                    <div className='lg:flex items-center justify-center hidden'>
                                        <button className='py-2 w-[90%] mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]' onClick={initiateWithdrawal} >Proceed</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {loading ? (
                            <div className='lg:hidden items-center justify-center flex mt-[4rem]'>
                                <BtnLoader />
                            </div>
                        ) : (
                            <div className='lg:hidden items-center justify-center flex mt-[8rem] mb-[3rem] w-[500px] mx-auto responsive-widths'>
                                <button className='py-2 w-full mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]' onClick={initiateWithdrawal} >Proceed</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {
            modal === 'withdraw' &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-[#D2D9F542]" style={{ borderRadius:'0px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col">
                        <p className='text-gray-500 text-[16px] mb-5 text-center'>Note that you are being redirected to a third-party website to make your withdrawal. <br /> Once transaction is completed please come back to the website to confirm your transaction</p>
                        <button className='px-3 py-[6px] text-white bg-primary-color rounded-[5px]' onClick={() => {
                            window.open(url, '_blank')
                            setModal('confirmPayment')
                            }} >Continue
                        </button>
                    </div>
                </div>
            </div>
        }
        {
            modal === 'confirmPayment' &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-[#D2D9F542]" style={{ borderRadius:'0px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col">
                        <p className='text-white text-[16px] mb-5 text-center'>Click on the button to confirm your transaction</p>
                        {loading ? (
                            <div className='lg:flex items-center justify-center mt-[4rem]'>
                                <BtnLoader />
                            </div>
                        ) : (
                            <button className='px-3 py-[6px] text-white bg-primary-color rounded-[5px]' onClick={queryTransaction} >Continue</button>
                        )}
                        
                    </div>
                </div>
            </div>
        }
        {
            modal === 'success' &&
            <>
                <div>
                    <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background: "rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)} ></div>
                    <div className="bg-[#D2D9F542] lg:w-[500px] md:w-[50%] sm:w-[70%] w-[90%] fixed top-[50%] left-[50%] z-[100] rounded-[8px]" style={{ transform: "translate(-50%, -50%)" }}>
                        <img src="./images/check-mark.png" alt="" className='rounded-t-[11px] w-[100px] mx-auto mt-5'/>
                        <div className='md:px-8 px-4 mt-7 mb-[1rem] text-center'>
                            <p className='text-[18px] lg:text-[20px] text-[white] font-[500]'>Transaction Info:</p>
                        </div>
                        <div className='md:w-[80%] w-[90%] mx-auto text-white'>
                            <div className="flex justify-between">
                                <p>Amount Fee</p>
                                <div className='flex items-center justify-between'>
                                    <TbCurrencyNaira/>
                                    <p>{transactionInfo?.amount_fee}</p> 
                                </div>
                                {/* <p>{transactionInfo?.amount_fee}</p> */}
                            </div>
                            <div className="flex justify-between mt-3">
                                <p>Amount In</p>
                                <div className='flex items-center justify-between'>
                                    <TbCurrencyNaira/>
                                    <p>{transactionInfo?.amount_in}</p> 
                                </div>
                                {/* <p>{transactionInfo?.amount_fee}</p> */}
                            </div>
                            <div className="flex justify-between mt-3 border-t pt-3 font-[500]">
                                <p>Total</p>
                                <div className='flex items-center justify-between'>
                                    <TbCurrencyNaira/>
                                    <p>{ Number(transactionInfo?.amount_in) + Number(transactionInfo?.amount_fee) }</p> 
                                </div>
                                {/* <p>{transactionInfo?.amount_fee}</p> */}
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-10 gap-4 md:w-[80%] w-[90%] mx-auto mb-[1.5rem]">
                            <button onClick={() => setModal(false)} className="bg-primary-color text-white py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]">
                                Yes, I understand
                            </button>
                            <button onClick={() => setModal(false)} className="bg-[#EEEFF0] text-[#0C0C0C] py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]">
                                No Cancel
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className="h-full w-full fixed top-0 left-0 z-[1000]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>

                    <div className="bg-white w-[95%] lg:w-[75%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[20px] px-[2rem] z-[10001] rouunded-[10px]">
                        <div className="flex items-center justify-between px-[2rem] flex-col">
                            <p className='font-[500] text-[22px] mb-2 text-gray-500'>Thank you!</p>
                            <p className='text-gray-500 text-[16px] text-center'>Your Transaction is being processed, by the admin <br /> You can monitor this transaction in your transaction history</p>
                            <p>{transactionInfo?.amount_fee}</p>
                            <button className='px-3 py-[6px] text-white bg-primary-color rounded-[5px] mt-3' onClick={() => {
                                navigate('/history')
                                }} >Check transaction history
                            </button>
                        </div>
                    </div> */}
            </>
        }
    </div>
  )
}

export default DepositProvider