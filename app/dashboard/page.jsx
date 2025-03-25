"use client";

import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { PiArrowElbowUpLeftLight } from "react-icons/pi";
import { VscArrowSmallRight } from "react-icons/vsc";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import Cookies from "js-cookie";
import BtnLoader from "../components/btn-loader/BtnLoader";
import Alert from "../components/alert/Alert";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";
import ArrayItemLoader from "../components/loader/ArrayItemLoader";
import ArrayTableLoader from "../components/loader/ArrayTableLoader";
import TransactionTable from "../components/table/TransactionTable";

const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [currencyChange, setCurrencyChange] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  // const API_KEY = import.meta.env.VITE_API_KEY
  // const BASE_URL = import.meta.env.VITE_BASE_URL
  const user = Cookies.get("token");
  const [walletAssets, setWalletAssets] = useState();
  const [selectedTrustLine, setSelectedTrustLine] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);
  const [PUBLIC_ASSETS, setPublic_Assets] = useState([]);
  const [loadingPUBLIC_ASSETS, setLoadingPUBLIC_ASSETS] = useState(false);
  const [convertCurrency, setConvertCurrency] = useState("USDC");
  const assets = ["NGN", "USDC"];
  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(assets[0]);
  const [dropDown, setDropDown] = useState();
  const [removeDropDown, setRemoveDropDown] = useState();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [convertPrice, setConvertPrice] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [loadingTx, setLoadingTx] = useState(false);

  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const router = useRouter();

  useEffect(() => {
    getUserInfo();
    getMyAssets();
    getAllTrustLines();
    getTransactionHistory();
    // getMyWalletInfo()
  }, []);

  useEffect(() => {
    const storedAllWalletTotalBalanceInSelectedCurrency = localStorage.getItem(
      "allWalletTotalBalanceInSelectedCurrency"
    );
    const storedAllWalletTotalBalanceInUsd = localStorage.getItem(
      "allWalletTotalBalanceInUsd"
    );
    const parsedAllWalletTotalBalanceInSelectedCurrency = JSON.parse(
      storedAllWalletTotalBalanceInSelectedCurrency
    );
    const parsedAllWalletTotalBalanceInUsd = JSON.parse(
      storedAllWalletTotalBalanceInUsd
    );
    setCurrentPrice(parsedAllWalletTotalBalanceInSelectedCurrency);
    setConvertPrice(parsedAllWalletTotalBalanceInUsd);
  }, [walletAssets]);

  async function getMyAssets() {
    const storedWalletAssets = localStorage.getItem("walletAssets");
    const storedAllWalletTotalBalanceInSelectedCurrency = localStorage.getItem(
      "allWalletTotalBalanceInSelectedCurrency"
    );
    const storedAllWalletTotalBalanceInUsd = localStorage.getItem(
      "allWalletTotalBalanceInUsd"
    );
    const parsedWalletAssets = JSON.parse(storedWalletAssets);
    const parsedAllWalletTotalBalanceInSelectedCurrency = JSON.parse(
      storedAllWalletTotalBalanceInSelectedCurrency
    );
    const parsedAllWalletTotalBalanceInUsd = JSON.parse(
      storedAllWalletTotalBalanceInUsd
    );
    if (
      parsedWalletAssets &&
      parsedAllWalletTotalBalanceInSelectedCurrency &&
      parsedAllWalletTotalBalanceInUsd
    ) {
      setWalletAssets(parsedWalletAssets);
      setCurrentPrice(parsedAllWalletTotalBalanceInSelectedCurrency);
      setConvertPrice(parsedAllWalletTotalBalanceInUsd);
    }
    if (
      !parsedWalletAssets ||
      !parsedAllWalletTotalBalanceInSelectedCurrency ||
      !parsedAllWalletTotalBalanceInUsd
    ) {
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
      if (!res.ok) {
        throw new Error(data, "Failed to fetch user assets");
      }
      setWalletAssets(data?.data);
      localStorage.setItem("walletAssets", JSON.stringify(data.data));
      localStorage.setItem(
        "allWalletAssets",
        JSON.stringify(data.data.allWalletAssets)
      );
      localStorage.setItem(
        "selectedAsset",
        JSON.stringify(data?.data?.allWalletAssets[0])
      );
      localStorage.setItem(
        "allWalletTotalBalanceInUsd",
        JSON.stringify(data?.data?.allWalletTotalBalanceInUsd)
      );
      localStorage.setItem("wallet", JSON.stringify(data.data));
      localStorage.setItem(
        "allWalletTotalBalanceInSelectedCurrency",
        JSON.stringify(data.data.allWalletTotalBalanceInSelectedCurrency)
      );
      localStorage.setItem(
        "nonYieldWalletTotalBalanceInSelectedCurrency",
        JSON.stringify(data.data.nonYieldWalletTotalBalanceInSelectedCurrency)
      );
      localStorage.setItem(
        "yieldWalletTotalBalanceInSelectedCurrency",
        JSON.stringify(data.data.yieldWalletTotalBalanceInSelectedCurrency)
      );
      localStorage.setItem(
        "allWalletTotalBalanceInUsd",
        JSON.stringify(data.data.allWalletTotalBalanceInUsd)
      );
      localStorage.setItem(
        "yieldWalletAssets",
        JSON.stringify(data.data.yieldWalletAssets)
      );
      localStorage.setItem(
        "nonYieldWalletAssets",
        JSON.stringify(data.data.nonYieldWalletAssets)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingWalletAssets(false);
    }
  }

  async function getAllTrustLines() {
    const storedPUBLIC_ASSETS = localStorage.getItem("PUBLIC_ASSETS");
    const parsedPUBLIC_ASSETS = JSON.parse(storedPUBLIC_ASSETS);

    if (parsedPUBLIC_ASSETS) {
      setPublic_Assets(parsedPUBLIC_ASSETS);
    }
    if (!parsedPUBLIC_ASSETS) {
      setLoadingPUBLIC_ASSETS(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/horizonQueries/getAllTrustLines`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data, "Failed to fetch user trustlines");
      }
      setPublic_Assets(data.data.trustLines);
      localStorage.setItem(
        "PUBLIC_ASSETS",
        JSON.stringify(data.data.trustLines)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPUBLIC_ASSETS(false);
    }
  }

  async function getUserInfo() {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(storedUserData);

    if (parsedUserData) {
      setUserData(parsedUserData);
    }
    if (!parsedUserData) {
      setLoadingUserData(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/profile`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data, "Failed to fetch user info");
      setUserData(data.data);
      localStorage.setItem("userData", JSON.stringify(data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserData(false);
    }
  }

  async function removeTrustLine() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/transaction/removeTrustline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            assetCode: selectedTrustLine.asset_code,
          }),
        }
      );
      const data = await res.json();
      if (res) setLoading(false);
      if (!res.ok) throw new Error(data, "Failed to remove trustline");
      if (res.ok) {
        setMsg(data.message);
        setAlertType("success");
        setSelectedTrustLine(false);
        getMyAssets();
      }
      // localStorage.setItem('userData', JSON.stringify(data.data))
    } catch (error) {
      console.error(error);
    }
  }

  async function addTrustLine() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/transaction/changeTrustline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            assetCode: selectedAsset.code,
          }),
        }
      );
      const data = await res.json();
      if (res) {
        setLoading(false);
        getTransactionHistory();
      }
      if (!res.ok) {
        setMsg(data.message);
        setAlertType("error");
      }
      if (res.ok) {
        setMsg(data.message);
        setAlertType("success");
        setSelectedAsset(false);
        getMyAssets();
        setDropDown(false);
        setRemoveDropDown(false);
      }
      // localStorage.setItem('userData', JSON.stringify(data.data))
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactionHistory() {
    const storedTx = localStorage.getItem("uniqueTransactions");
    const parsedTx = JSON.parse(storedTx);

    if (parsedTx) {
      setTransactionHistory(parsedTx);
    }
    if (!parsedTx) {
      setLoadingTx(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/account/transaction/getTransactions`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (res) setLoadingTx(false);
      const uniqueTransactions = Array.from(
        new Map(
          data.data.transactions.map((item) => [item.transaction_hash, item])
        ).values()
      );
      setTransactionHistory(uniqueTransactions);
      if (!res.ok) throw new Error(data, "Failed to fetch transaction history");
      localStorage.setItem(
        "uniqueTransactions",
        JSON.stringify(uniqueTransactions)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTx(false);
    }
  }

  // async function getMyWalletInfo() {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/horizonQueries/getAllWalletAsset/ngn`, {
  //         headers: {
  //           'Authorization': `Bearer ${user}`,
  //           'Api-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  //         }
  //       });
  //       const data = await res.json();

  //       if (!res.ok) throw new Error('Failed to fetch user assets');
  //       setWalletInfo(data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  function transactionInfo(transaction) {
    localStorage.setItem("transactionInfo", JSON.stringify(transaction));
    router.replace("/transaction-info");
  }

  const walletAssetCodes =
    walletAssets?.allWalletAssets?.map((asset) => asset?.asset_code) || [];

  const publicAssetCodes = Object.keys(PUBLIC_ASSETS);

  return (
    <div>
      <div className="flex items-start">
        <SideNav />

        <div className="w-full lg:w-[84%]  ml-auto">
          <TopNav />
          <div className={`py-[10px] px-[10px]  mt-5 lg:mx-[25px] mx-[10px] `}>
            <div className={`my-6 lg:block hidden`}>
              <p className="text-[white] md:text-[28px] text-[18px]">
                Hi, {userData?.username || "loading..."}
              </p>
              <p className="text-[#767676] text-[14px] font-[300]">
                Welcome to Mammon App
              </p>
            </div>
            <div className={`flex flex-col md:flex-row items-center gap-5`}>
              <div
                className={`bg-gradient-to-r from-primary-color to-blue-400 text-white pt-3 rounded-lg w-full mx-auto ${
                  loadingWalletAssets
                    ? "animate-pulse from-primary-color to-blue-400"
                    : ""
                }`}
              >
                <div className={`flex items-center justify-between p-[6px] `}>
                  <p></p>
                </div>
                <div className={`flex justify-between items-start mb-4 px-6 `}>
                  <div>
                    <h2 className="text-[#F6F6F6] text-[14px]">
                      AVAILABLE BALANCE
                    </h2>
                    <div className="flex items-end">
                      <p className="md:text-4xl mt-2 mb-2 text-[white] text-3xl">
                        {currentPrice?.toFixed(2) || "loading..."}
                      </p>
                      <div className="relative mb-[10px] ml-[10px]">
                        <span
                          className="text-sm inline-flex items-center cursor-pointer"
                          onClick={() => setCurrencyChange(!currencyChange)}
                        >
                          {selectedCurrency} <GoChevronDown />
                        </span>
                        {currencyChange && (
                          <div className="absolute bg-white border rounded shadow">
                            {assets.map((currency) => (
                              <p
                                key={currency}
                                className="px-2 py-1 text-[black] cursor-pointer"
                                onClick={() => {
                                  setCurrencyChange(false);
                                  setSelectedCurrency(currency);
                                  if (currency === "NGN") {
                                    setCurrentPrice(
                                      walletAssets.allWalletTotalBalanceInNgn
                                    );
                                    setConvertPrice(
                                      walletAssets.allWalletTotalBalanceInUsd
                                    );
                                    setConvertCurrency("USDC");
                                  } else {
                                    setConvertCurrency("NGN");
                                    setConvertPrice(
                                      walletAssets.allWalletTotalBalanceInNgn
                                    );
                                    setCurrentPrice(
                                      walletAssets.allWalletTotalBalanceInUsd
                                    );
                                  }
                                }}
                              >
                                {currency}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[16px] font-[300] text-[white]">
                      ≈ {convertPrice?.toFixed(2) || "loading..."}{" "}
                      {convertCurrency}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex px-6 gap-4 py-4 bg-[#99AAF961] rounded-b-lg`}
                >
                  <button
                    onClick={() => router.replace("/deposit")}
                    className="bg-white text-blue-500 py-[6px] px-6 text-[12px] md:text-[16px] rounded-[8px]"
                  >
                    {" "}
                    + Deposit
                  </button>
                  <button
                    onClick={() => router.replace("/withdraw")}
                    className="border border-white text-white py-[6px] px-6 text-[12px] md:text-[16px] rounded-[8px]"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <div
                className={`border border-[#E1E1E1] pt-3 rounded-lg w-full mx-auto `}
              >
                <div className={`flex justify-between items-start mb-16 px-3 `}>
                  <div>
                    <p className="md:text-4xl text-[22px] mt-5 mb-2 font-bold text-[white]">
                      {userData?.points}
                      <span className="text-[14px] font-[300] ml-1">
                        {" "}
                        Points{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={`flex bg-[#99AAF961] px-6 py-4 rounded-b-lg `}>
                  <button className="text-white bg-primary-color py-[6px] px-4 rounded-md opacity-0">
                    Explore Ecosystem
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col md:flex-row items-center gap-3 mt-5 `}
            >
              <div
                className={`w-full  rounded-[8px] border border-[#E1E1E1] p-5 relative `}
              >
                <div className={`flex items-center justify-between`}>
                  <p className="font-[500] text-[20px]">Assets</p>
                  <div className="flex gap-3 items-center">
                    <button
                      className="bg-primary-color py-[6px] px-6 text-[12px] text-white md:text-[16px] rounded-[8px]"
                      onClick={() => {
                        setDropDown(
                          dropDown === "trustLine" ? false : "trustLine"
                        );
                        setRemoveDropDown(false);
                      }}
                    >
                      Add Asset
                    </button>
                    <button
                      className="bg-red-500 py-[6px] px-6 text-[12px] text-white md:text-[16px] rounded-[8px]"
                      onClick={() => {
                        setRemoveDropDown(
                          removeDropDown === "trustLine" ? false : "trustLine"
                        );
                        setDropDown(false);
                      }}
                    >
                      Remove Asset
                    </button>
                  </div>
                </div>

                {dropDown === "trustLine" && (
                  <>
                    <div
                      className={`absolute w-full border h-[250px] rounded-[6px] bg-white z-[1] py-3 left-0 overflow-y-scroll mt-5 `}
                    >
                      {loadingPUBLIC_ASSETS ? (
                        <ArrayItemLoader />
                      ) : (
                        Object.keys(PUBLIC_ASSETS).map((key, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                walletAssetCodes?.includes(
                                  PUBLIC_ASSETS[key]?.code?.toUpperCase()
                                ) ||
                                PUBLIC_ASSETS[key].code === "native" ||
                                walletAssetCodes?.includes(
                                  PUBLIC_ASSETS[key]?.code
                                )
                                  ? "hidden"
                                  : "flex items-center gap-2 py-3 hover:bg-gray-200 cursor-pointer px-3"
                              }
                              onClick={() =>
                                setSelectedAsset(PUBLIC_ASSETS[key])
                              }
                            >
                              <img
                                src={PUBLIC_ASSETS[key].image}
                                alt=""
                                className="w-[30px]"
                              />
                              <div>
                                <p className="text-[#1C1C1C]">
                                  {PUBLIC_ASSETS[key].name}
                                </p>
                                <p className="text-[9px] text-[#0E0E0E]">
                                  {PUBLIC_ASSETS[key].code === "native"
                                    ? "XLM"
                                    : PUBLIC_ASSETS[key].code}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
                {removeDropDown === "trustLine" && (
                  <>
                    <div
                      className={`absolute w-full border lg:h-[330px] h-[250px] rounded-[6px] bg-white z-[1] py-3 left-0 overflow-y-scroll mt-5 `}
                    >
                      {loadingWalletAssets ? (
                        <ArrayItemLoader />
                      ) : (
                        walletAssets?.allWalletAssets?.map((asset, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                asset?.asset_code === "NATIVE"
                                  ? "hidden"
                                  : "flex items-center gap-2 py-3 hover:bg-gray-200 cursor-pointer px-3"
                              }
                              onClick={() => setSelectedTrustLine(asset)}
                            >
                              <img
                                src={asset?.image}
                                alt=""
                                className="w-[30px]"
                              />
                              <div>
                                <p className="text-[#1C1C1C]">
                                  {asset?.asset_name}
                                </p>
                                <p className="text-[9px] text-[#0E0E0E]">
                                  {asset.code === "NATIVE"
                                    ? "XLM"
                                    : asset?.asset_code}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}

                <div className="mt-10 h-[430px] overflow-y-scroll">
                  {loadingWalletAssets ? (
                    <ArrayItemLoader />
                  ) : (
                    walletAssets?.allWalletAssets?.map((asset, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between border-b border-[#E4E7EC99] pb-2 mb-5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={asset?.image}
                              alt=""
                              className="w-[30px]"
                            />
                            <div>
                              <p className="text-[white]">
                                {asset?.asset_name}
                              </p>
                              <p className="text-[9px] text-[white]">
                                {asset?.asset_code === "NATIVE"
                                  ? "XLM"
                                  : asset?.asset_code}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end pr-3">
                            <p>{Number(asset?.balance).toFixed(8)}</p>
                            <div className="text-[10px] text-[white] flex items-center gap-[2px]">
                              <p>
                                ${asset?.equivalentBalanceInUsd?.toFixed(9)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <TransactionTable
              loadingTx={loadingTx}
              transactionHistory={transactionHistory}
              setSearchText={setSearchText}
              searchText={searchText}
            />
          </div>
        </div>
      </div>
      {selectedTrustLine && (
        <div>
          <div
            style={{
              position: "fixed",
              width: "100%",
              left: "0",
              top: "0",
              zIndex: "99",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              background: "rgba(18, 18, 18, 0.8)",
            }}
          >
            <div className="bg-white" style={{ borderRadius: "10px" }}>
              <div className="text-center  flex items-center justify-center flex-col mt-7">
                <img
                  src={selectedTrustLine.image}
                  className="w-[60px] mb-2"
                  alt=""
                />
                <div>
                  <p className="text-[#1C1C1C]">
                    {selectedTrustLine?.asset_name}
                  </p>
                  <p className="text-[#0E0E0E] text-[12px]">
                    {selectedTrustLine?.asset_code === "NATIVE"
                      ? "XLM"
                      : selectedTrustLine?.asset_code}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center justify-between mt-[1rem] px-[2rem] flex-col"
                style={{ padding: "0 2rem", textAlign: "center" }}
              >
                <p className="text-gray-500 text-[15px] mb-2 text-center">
                  Are you sure you want to{" "}
                  <span className="font-[500]">REMOVE</span> this asset from
                  your list of trustlines?
                </p>
              </div>
              {loading ? (
                <div className="flex items-center gap-4 px-[2rem] mb-8 w-full">
                  <BtnLoader />
                </div>
              ) : (
                <div className="flex items-center gap-4 px-[2rem] mb-8">
                  <button
                    className="bg-red-500 text-white p-3 rounded-lg w-full mt-[2rem]"
                    onClick={() => setSelectedTrustLine(false)}
                  >
                    No
                  </button>
                  <button
                    className="bg-primary-color text-white p-3 rounded-lg w-full mt-[2rem]"
                    onClick={removeTrustLine}
                  >
                    Yes, continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedAsset && (
        <div>
          <div
            style={{
              position: "fixed",
              width: "100%",
              left: "0",
              top: "0",
              zIndex: "99",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              background: "rgba(18, 18, 18, 0.8)",
            }}
          >
            <div className="bg-white" style={{ borderRadius: "10px" }}>
              <div className="text-center  flex items-center justify-center flex-col mt-7">
                <img
                  src={selectedAsset.image}
                  className="w-[60px] mb-2"
                  alt=""
                />
                <div>
                  <p className="text-[#1C1C1C]">{selectedAsset?.name}</p>
                  <p className="text-[#0E0E0E] text-[12px]">
                    {selectedAsset?.code === "NATIVE"
                      ? "XLM"
                      : selectedAsset?.code}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center justify-between mt-[1rem] px-[2rem] flex-col"
                style={{ padding: "0 2rem", textAlign: "center" }}
              >
                <p className="text-gray-500 text-[15px] mb-2 text-center">
                  Are you sure you want to{" "}
                  <span className="font-[500]">ADD</span> this asset from your
                  list of trustlines?
                </p>
              </div>
              {loading ? (
                <div className="flex items-center gap-4 px-[2rem] mb-8 w-full justify-center">
                  <BtnLoader />
                </div>
              ) : (
                <div className="flex items-center gap-4 px-[2rem] mb-8">
                  <button
                    className="bg-red-500 text-white p-3 rounded-lg w-full mt-[2rem]"
                    onClick={() => setSelectedAsset(false)}
                  >
                    No
                  </button>
                  <button
                    className="bg-primary-color text-white p-3 rounded-lg w-full mt-[2rem]"
                    onClick={addTrustLine}
                  >
                    Yes, continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default Dashboard;
