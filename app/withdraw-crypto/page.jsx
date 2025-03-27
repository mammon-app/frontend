"use client";

import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import { BsQrCodeScan } from "react-icons/bs";
import Alert from "../components/alert/Alert";
import Cookies from "js-cookie";
import BtnLoader from "../components/btn-loader/BtnLoader";
import { Red_Hat_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { BsLightningCharge } from "react-icons/bs";

const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

const Send = () => {
  const settingsTypeArray = ["Address"];
  const [selectedTab, setSelectedTab] = useState(settingsTypeArray[0]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);

  const userInfoArrayTab = ["Email", "Phone", "Pay ID", "Mammon ID"];
  const [selectedInfo, setSelectedInfo] = useState(userInfoArrayTab[0]);
  const [selectedInfoIndex, setSelectedInfoIndex] = useState(0);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [amount, setAmount] = useState();
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const [assets, setAssets] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState();
  const [currentBalance, setCurrentbalance] = useState(0);

  const [sourceAmount, setSourceAmount] = useState("");

  const user = Cookies.get("token");

  useEffect(() => {
    getMyAssets();
  }, []);

  const router = useRouter();

  useEffect(() => {
    const storedWalletAssets = localStorage.getItem("walletAssets");
    const parsedWalletAssets = JSON.parse(storedWalletAssets);

    if (!selectedAsset) {
      setAssets(parsedWalletAssets);
      setSelectedAsset(parsedWalletAssets?.allWalletAssets[0]);
      setCurrentbalance(parsedWalletAssets?.allWalletAssets[0].balance);
    }
  }, [assets]);

  async function sendMoney() {
    if (!sourceAmount || !address) {
      setMsg("Please enter both amount and address");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/transaction/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({
            amount: Number(sourceAmount),
            address,
            assetCode: selectedAsset.asset_code,
            currencyType: "crypto",
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        await getMyAssets();
        setMsg(data.message);
        setAlertType("success");
        setLoading(false);
      } else {
        setMsg(data.message);
        setAlertType("error");
        setLoading(false);
      }
    }
  }

  async function getMyAssets() {
    const storedWalletAssets = localStorage.getItem("walletAssets");
    const parsedWalletAssets = JSON.parse(storedWalletAssets);

    if (!parsedWalletAssets) {
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
      if (!res.ok) throw new Error(data, "Failed to fetch user assets");
      setAssets(data?.data);

      if (!selectedAsset) {
        setSelectedAsset(data?.data?.allWalletAssets[0]);
        setCurrentbalance(data?.data?.allWalletAssets[0].balance);
        localStorage.setItem(
          "selectedAsset",
          JSON.stringify(data?.data?.allWalletAssets[0])
        );
        localStorage.setItem(
          "allWalletTotalBalanceInUsd",
          JSON.stringify(data?.data?.allWalletTotalBalanceInUsd)
        );
      }

      localStorage.setItem("walletAssets", JSON.stringify(data.data));
      localStorage.setItem(
        "allWalletAssets",
        JSON.stringify(data.data.allWalletAssets)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="lg:w-[84%] w-full ml-auto">
          <TopNav />
          <div className="py-[20px] px-[10px] h-[100vh]  mt-5 mx-[25px] ">
            <div className="mt-5 ml-1">
              <p className="text-primary-color text-[20px] md:text-[36px]">
                Choose Recipient
              </p>
              <small className="text-[#ffffff]">
                Leave at least 1.5XLM for gas fee
              </small>

              <p className="font-[300] text-[#ffffff]">
                Send money to self or buisness partners
              </p>
            </div>
            <div className="pt-[3rem] pb-[9rem] flex justify-center items-center rounded-[11px] mt-9 flex-col">
              <div className="flex justify-center items-center">
                <div className="py-6 px-[20px] border border-[#B2B2B27A] rounded-[8px] shadow max-w-[500px]">
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <p className="flex text-[#ffffff] text-[14px] font-[300]">
                        Withdrawal amount
                      </p>
                      <div
                        className={`flex text-[14px] ${redHatMono.className}`}
                      >
                        <p className="text-[#ffffff] mr-1">Balance:</p>
                        <span className={`text-white`}>
                          {currentBalance?.toFixed(8)}
                        </span>
                      </div>
                    </div>
                    <small className="text-[#ffffff]">
                      Leave at least 1.5XLM for gas fee
                    </small>

                    <div className="relative">
                      <div className="flex justify-between border border-[#B2B2B27A] rounded-[24px] relative z-[12] p-2 items-center">
                        <div className="flex item-center gap-2">
                          <div
                            className="flex items-center bg-[#76748014] rounded-full p-2 cursor-pointer"
                            onClick={() =>
                              setCurrencyDropDown(
                                currencyDropDown === "from" ? false : "from"
                              )
                            }
                          >
                            <img
                              src={selectedAsset?.image}
                              alt=""
                              width="20px"
                            />
                            <p className="mr-3 ml-1 text-[12px] uppercase">
                              {selectedAsset?.asset_code}
                            </p>
                            <IoChevronDown />
                          </div>
                          <input
                            type="number"
                            disabled={loading}
                            onChange={(e) => setSourceAmount(e.target.value)}
                            className="outline-none w-1/2  bg-transparent text-[#ffffff]"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>
                      {currencyDropDown === "from" && (
                        <div className="absolute bg-[white] mt-[37px] w-full pt-3 pb-3 z-[11] top-[18px] shadow-md">
                          {assets?.allWalletAssets?.map((asset, index) => (
                            <div
                              key={index}
                              className="py-2 px-4 cursor-pointer hover:bg-[#D2D9F542]"
                              onClick={() => {
                                if (loading) return;
                                setSelectedAsset(asset);
                                setCurrencyDropDown(false);
                                setCurrentbalance(asset.balance);
                              }}
                            >
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <img src={asset.image} alt="" width="25px" />
                                <div>
                                  <p className="text-[#000000] font-[300] text-[14px]">
                                    {asset.asset_name}
                                  </p>
                                  <p className="text-[10px] text-[#000000]">
                                    {asset.asset_code}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 mt-10">
                    <div>
                      <p className="text-[#ffffff] text-[14px] font-[300]">
                        Send to
                      </p>
                      <div className="flex items-center border-b border-[#EAECF0] mt-4">
                        {settingsTypeArray.map((item, index) => {
                          return (
                            <p
                              key={index}
                              className={`px-[.8rem] pb-[18px] font-[300] text-[#ffffff] cursor-pointer ${
                                selectedTabIndex === index
                                  ? "text-white border-b border-primary-color"
                                  : ""
                              }`}
                              onClick={() => {
                                if (loading) return;
                                setSelectedTab(item);
                                setSelectedTabIndex(index);
                              }}
                            >
                              {item}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    {selectedTab === "Address" && (
                      <div className="mt-5">
                        <p className="text-[#ffffff] text-[14px] font-[300]">
                          Recipient address
                        </p>
                        <div className="flex border border-[#B2B2B27A] justify-between mt-2 rounded-[24px] px-3 py-4 items-center">
                          <input
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="Enter recipient address..."
                            disabled={loading}
                            className="bg-transparent  text-[#ffffff] font-[300] outline-none w-[90%]"
                          />
                          {/* <p className='text-[#ffffff] font-[300]'></p> */}
                          {/* <BsQrCodeScan className='text-[#ffffff]'/> */}
                        </div>
                        <p className="text-[#ffffff] py-4 px-2 bg-[#D2D9F542] rounded-[6px] mt-2 text-[12px] font-[300]">
                          It’s a Mammon account. Send instantly and 0 fee via
                          PayID: <span className="text-white">****</span>
                        </p>
                      </div>
                    )}

                    {selectedTab === "User Info" && (
                      <div className="mt-10">
                        <div className="flex items-center gap-[1rem] mb-3">
                          {userInfoArrayTab.map((info, index) => (
                            <p
                              key={index}
                              onClick={() => {
                                if (loading) return;
                                setSelectedInfo(info);
                                setSelectedInfoIndex(index);
                              }}
                              className={`bg-[#EEF0F7] py-1 px-2 rounded-[4px] ${
                                selectedInfoIndex === index
                                  ? "text-primary-color"
                                  : ""
                              } text-[12px] font-[300] cursor-pointer`}
                            >
                              {info}
                            </p>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 bg-[#F1F1F1] rounded-[8px] p-3 items-center">
                          <p className="text-[#414553] font-[300]">
                            {selectedInfo === "Email"
                              ? `Enter your email`
                              : selectedInfo === "Phone"
                              ? `Enter your phone number`
                              : selectedInfo === "Pay ID"
                              ? `My Pay ID`
                              : `Enter your Pay ID`}
                          </p>
                        </div>
                        <p className="text-[#ffffff] py-4 px-2 bg-[#D2D9F542] rounded-[6px] mt-2 text-[12px] font-[300]">
                          It’s a Mammon account. Send instantly and 0 fee via
                          PayID: <span className="text-white">****</span>
                        </p>
                      </div>
                    )}

                    {selectedTab === "Transaction" && (
                      <div className="mt-5">
                        <div className="flex items-center justify-between bg-[#FFF] rounded-[8px] p-3 border shadow">
                          <input
                            type="text"
                            placeholder="To: Name or address"
                            className="outline-none bg-transparent"
                          />
                          <BsQrCodeScan className="text-[#ffffff]" />
                        </div>
                        <p className="text-[#414553] text-[14px] my-5">
                          Recently Used
                        </p>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BsQrCodeScan className="text-[#ffffff]" />
                              <div>
                                <p className="text-[14px]">Ben Charles</p>
                                <p className="text-[#ffffff] text-[14px]">
                                  CvDQ...WcVn
                                </p>
                              </div>
                            </div>
                            <p className="text-[#ffffff] text-[14px]">
                              Yesterday
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BsQrCodeScan className="text-[#ffffff]" />
                              <div>
                                <p className="text-[14px]">Ben Charles</p>
                                <p className="text-[#ffffff] text-[14px]">
                                  CvDQ...WcVn
                                </p>
                              </div>
                            </div>
                            <p className="text-[#ffffff] text-[14px]">
                              Yesterday
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTab !== "Transaction" && (
                      <div className="mt-8">
                        <p className="text-[#ffffff] text-[14px] font-[300]">
                          Network
                        </p>
                        <div className="flex items-center mt-1 justify-between cursor-pointer mb-1 py-[10px] border border-[#B2B2B27A] rounded-[6px] px-2 shadow-s bg-transparent">
                          <p className="text-[#ffffff] font-[300]">Stellar</p>
                          {/* <IoChevronDown /> */}
                        </div>
                        <p className="font-[300] text-white text-[12px]">
                          Wallet address automatically matched to corresponding
                          network
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={sendMoney}
                    disabled={loading}
                    className="flex justify-center items-center bg-primary-color text-white p-3 rounded-lg w-full mt-[2rem]"
                  >
                    <span>Confirm</span>
                    {loading && (
                      <img
                        src="./images/loader.gif"
                        className="w-[20px] mx-2"
                        alt=""
                      />
                    )}
                  </button>
                </div>
              </div>
              {/* <div className='bg-[#F8F8F8] py-6 md:px-[40px] px-[16px] rounded-[8px] shadow w-[500px] mt-[1.5rem] border border-[#B2B2B27A]'>
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
                        </div> */}
            </div>
          </div>
        </div>
      </div>
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default Send;
