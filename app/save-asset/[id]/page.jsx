"use client"

import React, { useEffect, useState } from 'react'
// import { IoChevronDown, IoChevronDownOutline } from 'react-icons/io5'
// import { BsDashLg } from "react-icons/bs";
// import { RxDividerVertical } from "react-icons/rx";
// import { FaLinkedinIn } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa6";
// import { RiInstagramFill } from "react-icons/ri";
// import { FaTelegramPlane } from "react-icons/fa";
// import { FiTarget } from "react-icons/fi";
// import SideNav from '../../components/side-nav/SideNav';
// import TopNav from '../../components/top-nav/TopNav';
// import Cookies from 'js-cookie';
// import BtnLoader from '../../components/btn-loader/BtnLoader';
// import Alert from '../../components/alert/Alert';

const SaveAsset = () => {

    // const { asset } = useParams()

    // const pricesArray = ["200", "300", "500", "1,000"]
    // const [currencyDropDown, setCurrencyDropDown] = useState(false)
    // const [assets, setAssets] = useState([])

    // const [selectedAsset, setSelectedAsset] = useState()
    // const [selectedAssetReceive, setSelectedAssetReceive] = useState()
    // // const [currencyDropDown, setCurrencyDropDown] = useState()
    // const navigate = useNavigate()
    // const API_KEY = import.meta.env.VITE_API_KEY
    // const BASE_URL = import.meta.env.VITE_BASE_URL
    // const user = Cookies.get('token')
    // const [sourceAmount, setSourceAmount] = useState()

    // const [msg, setMsg] = useState('')
    // const [alertType, setAlertType] = useState('')

    // const [loading, setLoading] = useState(false)

    // async function getMyAssets(){
    //     try {
    //       const res = await fetch(`${BASE_URL}/horizonQueries/getAllWalletAssets`, {
    //         headers: {
    //           'Authorization': `Bearer ${user}`,
    //           'Api-Key': `${API_KEY}`,
    //         }
    //       })
    //       const data = await res.json()
    //       setAssets(data?.data?.walletAssets);
    //       setSelectedAssetReceive(data?.data?.walletAssets[0])
    //       setSelectedAsset(data?.data?.walletAssets[0])
    //       if(!res.ok) throw new Error(data, 'Failed to fetch user assets')
    //       // localStorage.setItem('userData', JSON.stringify(data.data))
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }

    // async function swapAssets(){
    //     try {
    //         if(selectedAsset.asset_code === selectedAssetReceive.asset_code){
    //             setMsg('Please select different assets')
    //             setAlertType('error')
    //             return
    //         }else if(sourceAmount <= 0 || !sourceAmount){
    //             setMsg('Please enter a valid amount')
    //             setAlertType('error')
    //             return
    //         }else if(Number(selectedAsset.balance) < sourceAmount){
    //             setMsg('Insufficient balance')
    //             setAlertType('error')
    //             return
    //         }else if(Number(sourceAmount) < 0.0000001){
    //             setMsg('The amount is too small')
    //             setAlertType('error')
    //             return
    //         } else {
    //             setLoading(true)
    //             const res = await fetch(`${BASE_URL}/account/transaction/swap`, {
    //               method: 'POST',
    //               headers: {
    //                 'Authorization': `Bearer ${user}`,
    //                 'Api-Key': `${API_KEY}`,
    //                 'Content-Type': 'application/json'
    //               },
    //               body: JSON.stringify({
    //                   sourceAssetCode: selectedAsset.asset_code,
    //                   desAssetCode: selectedAssetReceive.asset_code,
    //                   sourceAmount:Number(sourceAmount),
    //                   slippage: 0.5,
    //               })
    //             })
    //             const data = await res.json()
    //             setLoading(false)
    //             if(res.ok){
    //               setMsg(data.message)
    //               setAlertType('success')
    //             }
    //             if(!res.ok){
    //               setMsg(data.message)
    //               setAlertType('error')
    //             }
    //         }
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     getMyAssets()
    // },[])

  return (
    <div>
      {/* <div className='flex items-start bg-[#F5F5F5]'>
          <SideNav />
          <div className="lg:w-[84%] w-full bg-[#F5F5F5] ml-auto">
              <TopNav />
              <div className="p-[10px] rounded-[8px] mt-5 lg:mx-[25px] lg:bg-[#FFFFFF] lg:shadow-[inset_5px_0px_10px_black,inset_-5px_0px_10px_#E1E1E1]">
                <div className='mt-5 ml-1'>
                  <p className='text-primary-color lg:text-[32px] text-[20px]'>Save {asset}</p>
                  <p className='font-[300] text-[#ffffff] lg:text-[14px] text-[12px]'>Choose your crypto and start earning daily interest today.<br />Rates may increase or decrease in the future. The change will be communicated in advance.</p>
                </div>
                <div className='pt-[3rem] pb-[9rem] flex justify-center items-center rounded-[11px] lg:mt-9 lg:bg-[#F1F1F1] flex-col'>
                <div className="bg-[#F8F8F8] py-6 sm:px-[40px] p-[15px] rounded-[8px] shadow lg:max-w-[500px] md:w-[100%] mx-auto w-full border border-[#B2B2B27A]">
                  <div className="my-4">
                          <div className="flex justify-between items-center">
                              <p className="text-[#ffffff] text-[14px] font-[300]">Source amount</p>
                              <div className='flex text-[14px]'>
                                  <p className='text-[#ffffff]'>Balance:</p>
                                  <span className="text-primary-color">${Number(selectedAsset?.balance).toFixed(8)}</span>
                              </div>
                          </div>
                          <div className='relative'>
                              <div className="flex justify-between bg-[#F1F1F1] rounded-[24px] relative z-[12] p-2 items-center">
                                  <div className='flex item-center gap-2'>
                                      <div className='flex items-center bg-[#76748014] rounded-full p-2 cursor-pointer' onClick={() => setCurrencyDropDown(currencyDropDown === "from" ? false : "from")}>
                                          <img src={selectedAsset?.image} alt="" width="20px"/>
                                          <p className='mr-3 ml-1 text-[12px] uppercase'>{selectedAsset?.asset_code}</p>
                                          <IoChevronDown />
                                      </div>
                                      <input type="number" onChange={e => setSourceAmount(e.target.value)} className="outline-none w-1/2 bg-transparent text-[#ffffff]" placeholder="0.00345" />
                                  </div>
                              </div>
                              {
                                  currencyDropDown === "from" &&
                                  <div className='absolute bg-[#F1F1F1] w-[200px] pt-[3.5rem] pb-3 z-[11] top-[18px] shadow-md'>
                                      {
                                          assets.map(asset => (
                                              <div className='py-2 px-4 cursor-pointer hover:bg-[#E5E5E5]' onClick={() => {
                                                  setSelectedAsset(asset)
                                                  (asset);
                                              }}>
                                                  <div className='flex items-center gap-2'>
                                                      <img src={asset.image} alt="" width="25px" />
                                                      <div>
                                                          <p className='text-[#1C1C1C] font-[300] text-[14px]'>{asset.asset_name}</p>
                                                          <p className='text-[10px] text-[#BEBEBE]'>{asset.asset_code}</p>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                      }
                                  </div>
                              }
                          </div>
                      </div>

                      <div className="my-4">
                          <div className="flex justify-between items-center">
                              <p className="text-[#ffffff] text-[14px] font-[300]">Receive amount</p>
                          </div>
                          <div className='relative'>
                              <div className="flex justify-between bg-[#F1F1F1] rounded-[24px] relative z-[10] p-2 items-center">
                                  <div className='flex item-center gap-2'>
                                      <div className='flex items-center bg-[#76748014] rounded-full p-2 cursor-pointer' onClick={() => setCurrencyDropDown(currencyDropDown === "to" ? false : "to")}>
                                          <img src={selectedAssetReceive?.image} alt="" width="20px" />
                                          <p className='mr-3 ml-1 text-[12px] uppercase'>{selectedAssetReceive?.asset_code}</p>
                                          <IoChevronDown />
                                      </div>
                                      <input type="number" id="input-amount" className="outline-none w-1/2 bg-transparent text-[#ffffff]" placeholder="0.00345" />
                                  </div>
                              </div>
                              {
                                  currencyDropDown === "to" &&
                                  <div className='absolute bg-[#F1F1F1] w-[200px] pt-[3.5rem] pb-3 top-[18px] shadow-md'>
                                      {
                                          assets.map(asset => (
                                              <div className='py-2 px-4 cursor-pointer hover:bg-[#E5E5E5]' onClick={() => setSelectedAssetReceive(asset)}>
                                                  <div className='flex items-center gap-2'>
                                                      <img src={asset.image} alt="" width="25px" />
                                                      <div>
                                                          <p className='text-[#1C1C1C] font-[300] text-[14px]'>{asset.asset_name}</p>
                                                          <p className='text-[10px] text-[#BEBEBE]'>{asset.asset_code}</p>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                      }
                                  </div>
                              }
                          </div>
                      </div>
                      <div className='grid grid-cols-2 sm:grid-cols-4 place-content-center place-items-center text-center gap-5 sm:gap-10 mb-4'>
                          {
                              pricesArray.map((price, index) => (
                                  <p className='bg-[#F1F1F1] rounded-full py-[6px] text-center w-full cursor-pointer' key={index}>${price}</p>
                              ))
                          }
                      </div>
                      {
                          loading?
                          <BtnLoader />
                          :
                          <button onClick={swapAssets} className="bg-primary-color text-white p-3 rounded-lg w-full mt-[1rem]">Next</button>
                      }
                  
              </div>
                  <div className='bg-[#F8F8F8] py-6 md:px-[40px] px-[16px] rounded-[8px] shadow lg:w-[500px] w-full mt-[1.5rem] border border-[#B2B2B27A]'>
                    <p className='text-[14px] text-[#ffffff] border-b border-[#CFCFCF] pb-2'>y{asset} = $3,000</p>
                    <div className='flex flex-col gap-[8px] mt-5'>
                      <div className='flex items-center justify-between text-[14px] text-[#ffffff]'>
                        <p>Reference APR</p>
                        <p>3.50%</p>
                      </div>
                      <div className='flex items-center justify-between text-[14px] text-[#ffffff]'>
                        <p>Exchange Rate</p>
                        <p>1 {asset} = 0.98911 y{asset}</p>
                      </div>
                      <div className='flex items-center justify-between text-[14px] text-[#ffffff]'>
                        <p>Transaction Cost</p>
                        <p>~$11.24</p>
                      </div>
                      <div className='flex items-center justify-between text-[14px] text-[#ffffff]'>
                        <p>Reward Fee</p>
                        <p>10%</p>
                      </div>
                      <div className='flex items-center justify-between text-[14px] text-[#ffffff]'>
                        <p>Referrer</p>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div> */}
  </div>
  )
}

export default SaveAsset