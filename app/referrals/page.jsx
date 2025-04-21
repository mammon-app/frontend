"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import Cookies from 'js-cookie'
import { GoCopy } from "react-icons/go";
import Alert from '../components/alert/Alert'

const Referrals = () => {
    const user = Cookies.get('token')
    const [userDetail, setUserDetail] = useState(null)
    const [referrals, setReferrals] = useState()
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('userData')
            (userData);
            
            if (userData) {
                setUserDetail(JSON.parse(userData))
            }
        }
    }, [])

    
    

    useEffect(() => {
        getAccountInfo()
    }, [])

    async function getAccountInfo() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/account/referrals`, {
            headers: {
                'Authorization': `Bearer ${user}`,
                'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            }
        })
        const data = await res.json()
        setReferrals(data.data.referrals)
    }

    return (
        <div>
            <div className='flex items-start'>
                <SideNav />
                <div className="w-full lg:w-[84%] ml-auto mb-[30px]">
                    <TopNav />
                    <div className="p-[10px] mt-5 mx-[30px]">
                        <div className='bg-primary-color flex items-start justify-between w-full h-[150px] rounded-[11px] text-white p-3 '>
                            <p className='text-[24px] font-[500]'>Referrals</p>
                            <div className='text-end'>
                                <p>Referral Code</p>
                                <div className='flex items-center gap-3 flex-row-reverse'>
                                    <GoCopy className='cursor-pointer' onClick={() => {
                                        navigator.clipboard.writeText(userDetail?.data?.referralCode)
                                        setMsg('Referral code copied to clipboard')
                                        setAlertType('success')
                                    }} />
                                    <p>{userDetail?.data?.referralCode}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='bg-[#899EFD1A] inline-flex items-center mt-7 rounded-md'>
                            <div className='flex items-center gap-3 border-r border-gray-300 py-2 px-4'>
                                <img src="./images/tag-user.svg" alt="" />
                                <p className='text-primary-color text-[10px]'>139181 Users</p>
                            </div>
                            <div className='flex items-center gap-3 py-2 px-4'>
                                <img src="./images/cup-colored.svg" alt="" />
                                <p className='text-primary-color text-[10px]'>20 Tiers</p>
                            </div>
                        </div> */}
                        {
                            referrals?.length === 0 &&
                            <>
                                <p className='text-center text-[16px] text-gray-500'>No referrals found</p>
                                <div className='mt-10'>
                                    {/* <button className='border-2 border-primary-color text-primary-color text-[16px] w-[200px] py-2 rounded-md hover:bg-primary-color hover:text-white' onClick={()=> navigate('/create-referral')}>
                                        Create a Referral
                                    </button> */}
                                </div>
                            </>
                        }
                        <div className='mt-10 mx-[30px]'>
                            {
                                referrals?.map((item, index) => {
                                    return (
                                        <div className='flex items-center justify-between my-12' key={index}>
                                            <div className='flex items-center gap-7'>
                                                <p>{index + 1}.</p>
                                                <div className='flex items-center gap-3'>
                                                    <img src="./images/user.svg" alt="" />
                                                    <p>GameChanger</p>
                                                </div>
                                            </div>
                                            <p>6465</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />
            }
        </div>
    )
}

export default Referrals
