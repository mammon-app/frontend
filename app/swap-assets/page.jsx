"use client";

import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronDownOutline } from "react-icons/io5";
import { BsDashLg } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import Cookies from "js-cookie";
import BtnLoader from "../components/btn-loader/BtnLoader";
import Alert from "../components/alert/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsLightningCharge } from "react-icons/bs";

const SwapAsset = () => {
  const pricesArray = ["200", "300", "500", "1,000"];
  const router = useRouter();
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [assets, setAssets] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedAssetReceive, setSelectedAssetReceive] = useState();
  const [currentBalance, setCurrentbalance] = useState(0);
  // const [currencyDropDown, setCurrencyDropDown] = useState()
  // const API_KEY = import.meta.env.VITE_API_KEY
  // const BASE_URL = import.meta.env.VITE_BASE_URL
  const user = Cookies.get("token");
  const [sourceAmount, setSourceAmount] = useState();

  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(2.75);
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const storedWalletAssets = localStorage.getItem("walletAssets");
    const parsedWalletAssets = JSON.parse(storedWalletAssets);

    if (!selectedAsset) {
      setAssets(parsedWalletAssets);
      setSelectedAsset(parsedWalletAssets?.allWalletAssets[0]);
      setCurrentbalance(parsedWalletAssets?.allWalletAssets[0].balance);
    }
  }, [assets]);

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
    } finally {
      setLoadingWalletAssets(false);
    }
  }

  async function swapAssets() {
    setLoading(true);

    try {
      if (!selectedAsset || !selectedAssetReceive) {
        setMsg("Please select assets to swap.");
        setAlertType("error");
        setLoading(false);
        return;
      }

      if (selectedAsset.asset_code === selectedAssetReceive.asset_code) {
        setMsg("Please select different assets.");
        setAlertType("error");
        setLoading(false);
        return;
      }

      if (!sourceAmount || Number(sourceAmount) <= 0) {
        setMsg("Please enter a valid amount.");
        setAlertType("error");
        setLoading(false);
        return;
      }

      if (Number(selectedAsset.balance) < Number(sourceAmount)) {
        setMsg("Insufficient balance.");
        setAlertType("error");
        setLoading(false);
        return;
      }

      if (Number(sourceAmount) < 0.0000001) {
        setMsg("The amount is too small.");
        setAlertType("error");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/transaction/swap`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceAssetCode: selectedAsset.asset_code,
            desAssetCode: selectedAssetReceive.asset_code,
            sourceAmount: Number(sourceAmount),
            slippage: Number(value),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        await getMyAssets();
        setMsg(data.message);
        setAlertType("success");
        setSourceAmount("");
      } else {
        setMsg(data.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setMsg("An error occurred. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyAssets();
  }, []);

  const filteredReceiveAssets = assets?.allWalletAssets?.filter(
    (asset) =>
      !(
        selectedAsset?.asset_code === "NGNC" &&
        ["BTC", "ETH", "yETH"].includes(asset?.asset_code)
      ) &&
      !(
        selectedAsset?.asset_code === "BTC" &&
        ["NGNC"].includes(asset?.asset_code)
      ) &&
      !(
        selectedAsset?.asset_code === "BTETHC" &&
        ["NGNC"].includes(asset?.asset_code)
      ) &&
      !(
        selectedAsset?.asset_code === "yETH" &&
        ["NGNC"].includes(asset?.asset_code)
      )
  );

  useEffect(() => {
    if (selectedAssetReceive?.asset_code === selectedAsset?.asset_code) {
      setSelectedAsset();
    }
  }, [selectedAssetReceive]);
  useEffect(() => {
    if (selectedAsset?.asset_code === selectedAssetReceive?.asset_code) {
      setSelectedAssetReceive();
    }
  }, [selectedAsset]);

  const filteredFromAssets = assets?.allWalletAssets?.filter(
    (asset) =>
      !(
        selectedAssetReceive?.asset_code === "NGNC" &&
        ["BTC", "ETH", "yETH"].includes(asset?.asset_code)
      )
  );

  return (
    <div>
      <div className="flex items-start ">
        <SideNav />
        <div className="w-full lg:w-[84%]  ml-auto mb-10">
          <TopNav />
          <div className="lg:px-[10px] h-[100vh] pb-[30px] pt-[10px]  mt-5 lg:mx-[30px] ">
            <div className="lg:px-[10px]">
              <div className="rounded-[11px] w-full py-[30px] px-[10px] ">
                <div className="w-[70%] lg:mb-20 mb-5">
                  <p className="lg:text-[32px] text-[20px] text-primary-color">
                    Swap Asset
                  </p>
                  <small className="text-[#ffffff]">
                    Leave at least 1.5XLM for gas fee
                  </small>
                  <p className="text-[#ffffff] font-[300] lg:text-[14px] text-[12px] mt-3">
                    Choose your crypto and start earning daily interest today.
                    Rates may increase or decrease in the future. The change
                    will be communicated in advance.
                  </p>
                </div>
                <div className="border border-[#B2B2B27A] py-6 sm:px-[40px] p-[15px] rounded-[8px] shadow lg:max-w-[500px] md:w-[100%] mx-auto w-full ">
                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[#ffffff] text-[14px] font-[300]">
                        Source amount
                      </p>
                      <div className="flex text-[14px]">
                        <p className="text-[#ffffff]">Balance:</p>
                        <span className="text-white mx-2">
                          {currentBalance?.toFixed(8)}
                        </span>
                      </div>
                    </div>
                    <small className="text-[#ffffff]">
                      Leave at least 1.5XLM for gas fee
                    </small>

                    <div className="relative">
                      <div className="flex justify-between  border border-[#B2B2B27A] rounded-[24px] relative z-[12] p-2 items-center">
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
                            onChange={(e) => setSourceAmount(e.target.value)}
                            className="outline-none w-1/2 bg-transparent text-[#ffffff]"
                            placeholder="Enter amount"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {currencyDropDown === "from" && (
                        <div className="absolute bg-white w-full mt-[38px] pt-3 pb-3 z-[11] top-[18px] shadow-md">
                          {filteredFromAssets?.map((asset, index) => (
                            <div
                              key={index}
                              className="py-2 px-4 cursor-pointer "
                              onClick={() => {
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

                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[#ffffff] text-[14px] font-[300]">
                        Receive amount
                      </p>
                    </div>
                    <div className="relative">
                      <div className="flex justify-between border border-[#B2B2B27A] rounded-[24px] relative z-[10] p-2 items-center">
                        <div className="flex item-center gap-2">
                          <div
                            className="flex items-center bg-[#76748014] rounded-full p-2 cursor-pointer"
                            onClick={() =>
                              setCurrencyDropDown(
                                currencyDropDown === "to" ? false : "to"
                              )
                            }
                          >
                            <img
                              src={selectedAssetReceive?.image}
                              alt=""
                              width="20px"
                            />
                            <p className="mr-3 ml-1 text-[12px] uppercase">
                              {selectedAssetReceive?.asset_code}
                            </p>
                            <IoChevronDown />
                          </div>
                          <input
                            type="number"
                            id="input-amount"
                            disabled
                            className="outline-none w-1/2 bg-transparent  text-[#ffffff]"
                          />
                        </div>
                      </div>
                      {currencyDropDown === "to" && (
                        <div className="absolute bg-[#F1F1F1] mt-[37px] w-full pt-3 pb-3 top-[18px] shadow-md">
                          {filteredReceiveAssets?.map((asset, index) => (
                            <div
                              key={index}
                              className="py-2 px-4 cursor-pointer "
                              onClick={() => {
                                if (loading) return;
                                setSelectedAssetReceive(asset);
                                setCurrencyDropDown(false);
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
                  <div>
                    <label
                      htmlFor="small-range"
                      className="text-[#ffffff] text-[14px] font-[300]"
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
                      disabled={loading}
                      onChange={handleChange}
                      className="w-full h-1 mb-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                    />
                    <p className="text-[#ffffff] text-[14px] font-[300] text-center">
                      {value}%
                    </p>
                  </div>

                  {/* <div className='grid grid-cols-2 sm:grid-cols-4 place-content-center place-items-center text-center gap-5 sm:gap-10 mb-4'>
                                        {
                                            pricesArray.map((price, index) => (
                                                <p className='bg-[#F1F1F1] rounded-full py-[6px] text-center w-full cursor-pointer' key={index}>${price}</p>
                                            ))
                                        }
                                    </div> */}

                  <button
                    onClick={swapAssets}
                    disabled={loading}
                    className="flex justify-center items-center bg-primary-color text-white p-3 rounded-lg w-full mt-[1rem]"
                  >
                    <span>Swap</span>
                    {loading && (
                      <img
                        src="./images/loader.gif"
                        className="w-[20px] mx-2"
                        alt=""
                      />
                    )}
                  </button>
                </div>
                {/* <div className="flex flex-row-reverse px-[40px] items-end justify-between lg:max-w-[1400px] md:w-[100%] mx-auto">
                  <div className="flex justify-center items-center w-full">
                    <div className="bg-[#F8F8F8] py-4 px-[40px] rounded-[8px] shadow lg:w-[500px] w-full mt-[1rem] border border-[#B2B2B27A]">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>

    // <div>

    // </div>
  );
};

export default SwapAsset;
