"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLoader } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import AuthNav from '../components/auth-nav/AuthNav';
import Alert from '../components/alert/Alert';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Cookies from 'js-cookie';
import BtnLoader from '../components/btn-loader/BtnLoader';

const ForgotPassword = () => {

    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')

    const [email, setEmail] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleForgotPassword(e){
        e.preventDefault()
        if(!email){
            setMsg('Please enter your email address')
            setAlertType('error')
            return
        }else{
            localStorage.setItem("forgot-password-email", email)
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
                },
                body: JSON.stringify({email})
            })
            if(res) setLoading(false)
            const data = await res.json()
            if(res.ok){
                router.replace('/password-reset')
            }else{
                // const data = await res.json()
                setMsg(data.message)
                setAlertType('error')
            }
        }
    }


  return (
    <div className="relative">
        <AuthNav />
        <div className="sm:mt-[10rem] h-[100vh] mt-[7rem]">
            <div className="flex flex-col justify-center items-center relative z-[11]">
                <div className="border border-[#B2B2B27A] px-4 sm:px-8 pt-8 pb-5 rounded-[16px] w-full sm:w-[588px]">
                    <div className="hidden top-bg relative top-[-20px] sm:flex items-center justify-center w-[300px] mx-auto">
                        <img src="./images/mammon-finance-favicon.svg" alt="Mammon App Logo" className="mx-auto mb-4 relative top-[-65px]" />
                    </div>
                    <div className="text-center mb-12 mt-[-80px] relative z-[100]">
                        <h2 className="sm:text-2xl text-[18px] font-semibold mb-2">Forgot Password</h2>
                        {/* <p className="text-[#667085] text-[12px] sm:text-[14px]">Login to access your dashboard</p> */}
                    </div>
                    <form onSubmit={handleForgotPassword} className="flex flex-col sm:w-[400px] mx-auto">
                        <div>
                            <label className="text-[#ffffff] gont-[500] text-[14px] mb-1 block">Email</label>
                            <input
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="border border-[#B2B2B27A] bg-transparent text-[#ffffff] p-2 rounded-[6px] outline-none w-full"
                            />
                        </div>
                        
                        {
                            loading?
                            <BtnLoader />
                            :
                            <button className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5">
                                Proceed
                            </button>
                        }
                        <div className="text-center text-white mt-5 sm:mt-[70px] text-[14px]">
                            Don&apos;t have an account? <Link href="/create-account" className="text-blue-600">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="mt-[100px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
            <p className="text-[white] text-[12px]">
                &copy; {new Date().getFullYear()} Mammon finance. All rights reserved.
            </p>
            <div className="text-[white] text-[12px] flex items-center gap-4">
                <Link href="#">Privacy Policy</Link>
                <Link href="#" className="mr-4">Terms of Use</Link>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default ForgotPassword