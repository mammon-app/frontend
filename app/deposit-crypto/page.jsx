"use client";

import React, { useEffect, useState } from "react";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import { FaChevronDown } from "react-icons/fa6";
import Cookies from "js-cookie";
import { BsQrCodeScan } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import Alert from "../components/alert/Alert";
import QRCode from "react-qr-code";
import { Red_Hat_Mono } from "next/font/google";
import Loader from "../components/loader/Loader";

const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

const DepositCrypto = () => {
  // const API_KEY = import.meta.env.VITE_API_KEY
  // const BASE_URL = import.meta.env.VITE_BASE_URL
  const user = Cookies.get("token");
  const [assets, setAssets] = React.useState([]);
  const [dropDown, setDropDown] = useState("");
  const [selectedAsset, setSelectedAsset] = useState();
  const [address, setAddress] = useState();
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);

  async function getMyAssets() {
    const storedWalletAssets = localStorage.getItem("allWalletAssets");
    const parsedWalletAssets = JSON.parse(storedWalletAssets);
    const storedSelectedAsset = localStorage.getItem("selectedAsset");
    const parsedSelectedAsset = JSON.parse(storedSelectedAsset);

    if (parsedWalletAssets) {
      setAssets(parsedWalletAssets);
    }
    if (parsedSelectedAsset) {
      setAssets(data?.data?.allWalletAssets);
      setSelectedAsset(data?.data?.allWalletAssets[0]);
    }
    if (!parsedWalletAssets || !parsedSelectedAsset) {
      setLoadingWalletAssets(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/horizonQueries/getAllWalletAssets/ngn`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();

      //   setSelectedAsset(data?.data?.walletAssets[0])
      if (!res.ok) throw new Error(data, "Failed to fetch user assets");
      localStorage.setItem(
        "allWalletAssets",
        JSON.stringify(data.data.allWalletAssets)
      );
      localStorage.setItem(
        "selectedAsset",
        JSON.stringify(data?.data?.allWalletAssets[0])
      );
      setAssets(data?.data?.allWalletAssets);
      setSelectedAsset(data?.data?.allWalletAssets[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingWalletAssets(false);
    }
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData= JSON.parse(storedUserData);
    setAddress(parsedUserData?.stellarPublicKey);
    getMyAssets();
  }, []);

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%] ml-auto">
          <TopNav />
          <div className="py-[20px] h-[100vh] px-[10px]  mt-5 lg:mx-[25px] ">
            <div className="mt-5 ml-1 hidden lg:block">
              <p className="text-primary-color text-[32px]">
                Choose preferred crypto
              </p>
              <p className="font-[300] text-[#ffffff]">Select wallet address</p>
            </div>
            {loadingWalletAssets ? (
              <div  className="mt-9 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="mt-9">
                {/* <h2 className="lg:text-center lg:text-[#151517] text-primary-color mb-2 font-[500] lg:font-[400] text-left">Choose your deposit currency</h2> */}
                <div className="md:flex block items-center gap-5 md:justify-between w-full">
                  <div className="w-full mx-auto lg:px-4 py-4 bg-transparent rounded-lg">
                    <div className="relative">
                      <label className="text-[#ffffff] font-[300] text-[14px] mb-1 block">
                        Select Coin
                      </label>
                      <div className="flex cursor-pointer items-center justify-between border border-gray-300 p-3 rounded-[6px] w-full"
                       onClick={() =>
                        setDropDown(
                          dropDown === "assets" ? false : "assets"
                        )
                      }>
                        <div className="flex gap-2">
                          <img src={selectedAsset?.image} alt="" width="25px" />
                          <p>{selectedAsset?.asset_name || 'Select coin'}</p>
                        </div>
                        <FaChevronDown
                          className=" text-gray-300"
                         
                        />
                      </div>
                      <p
                        className={`text-[12px] text-primary-color ${redHatMono.className}`}
                      >
                        Wallet address automatically matched to corresponding
                        network
                      </p>
                      {dropDown === "assets" && (
                        <div className="bg-white w-full absolute top-[75px] rounded-[4px] border border-gray-300 h-[300px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3">
                          <div>
                            {assets?.map((asset, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 my-2 cursor-pointer"
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  setDropDown(false);
                                }}
                              >
                                <img src={asset.image} alt="" width="25px" />
                                <div>
                                  <p className="text-[#1C1C1C] font-[300] text-[14px]">
                                    {asset.asset_name}
                                  </p>
                                  <p className="text-[10px] text-[#1C1C1C]">
                                    {asset.asset_code}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="my-5">
                      <label className="text-[#ffffff] font-[300] text-[14px] mb-1 block">
                        Network
                      </label>
                      <div className="flex items-center justify-between border border-gray-300 p-3 rounded-[6px] w-full">
                        <div className="flex gap-2">
                          <img
                            src="https://ipfs.io/ipfs/bafkreihntcz2lpaxawmbhwidtuifladkgew6olwuly2dz5pewqillhhpay"
                            alt=""
                            width="25px"
                          />
                          <p>Lumens</p>
                        </div>
                        <FaChevronDown
                          className="cursor-pointer text-gray-300"
                          onClick={() =>
                            setDropDown(
                              dropDown === "network" ? false : "network"
                            )
                          }
                        />
                      </div>
                      <p
                        className={`text-[12px] text-primary-color ${redHatMono.className}`}
                      >
                        Wallet address automatically matched to corresponding
                        network
                      </p>
                    </div>
                    <div>
                      <p className="text-[#ffffff] text-[14px] font-[300]">
                        Recipient address
                      </p>
                      <div className="flex justify-between mt-2 border border-gray-300 rounded-[24px] px-3 py-4 items-center">
                        <input
                          value={address}
                          type="text"
                          className="bg-transparent text-[#ffffff] font-[300] outline-none w-[90%]"
                        />
                        {/* <p className='text-[#ffffff] font-[300]'></p> */}
                        <BiCopy
                          className="text-[#5D5D5D] cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(address);
                            setMsg("Address copied successfully!");
                            setAlertType("success");
                          }}
                        />
                      </div>
                      <p className="text-[#ffffff] py-4 px-2 bg-[#D2D9F542] rounded-[6px] mt-2 text-[12px] font-[300]">
                        It’s a Mammon account. Send instantly and 0 fee via
                        mammonappId: (comming soon){" "}
                        <span className="text-primary-color">****</span>
                      </p>
                    </div>
                    <button></button>
                  </div>
                  <div className="w-full">
                    {address && <QRCode value={address} />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default DepositCrypto;
