"use client";

import React, { useEffect, useState } from "react";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import { GoChevronDown } from "react-icons/go";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ArrayItemLoader from "../components/loader/ArrayItemLoader";
import ArrayTableLoader from "../components/loader/ArrayTableLoader";

const Wallet = () => {
  const [walletAssets, setWalletAssets] = useState([]);
  //   const API_KEY = import.meta.env.VITE_API_KEY;
  //   const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = Cookies.get("token");
  const [userData, setUserData] = useState();
  const [nairaBal, setNairaBal] = useState(0);
  const [currencyChange, setCurrencyChange] = useState(false);
  const [spendableBalance, setSpendableBalance] = useState(0);
  const [
    yieldWalletTotalBalanceInSelectedCurrency,
    setYieldWalletTotalBalanceInSelectedCurrency,
  ] = useState(0);
  const [
    nonYieldWalletTotalBalanceInSelectedCurrency,
    setNonYieldWalletTotalBalanceInSelectedCurrency,
  ] = useState(0);
  const router = useRouter();
  const assets = ["NGN", "USDC"];
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);
  const [loadingWalletAssetsBalances, setLoadingWalletAssetsBalances] =
    useState(false);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [yieldAssets, setYieldAssets] = useState([]);
  const [nonYieldAssets, setNonYieldAssets] = useState([]);

  const [walletInfo, setWalletInfo] = useState();

  const [currentPrice, setCurrentPrice] = useState(0);
  const [convertPrice, setConvertPrice] = useState(0);
  const [convertCurrency, setConvertCurrency] = useState("USDC");

  useEffect(() => {
    getMyAssets();
    getUserInfo();
  }, []);

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

      if (!res.ok) throw new Error("Failed to fetch user info");
      setUserData(data.data);
      localStorage.setItem("userData", JSON.stringify(data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserData(false);
    }
  }

  async function getMyAssets() {
    const storedWalletAssets = localStorage.getItem("wallet");
    const storedAllWalletTotalBalanceInSelectedCurrency = localStorage.getItem(
      "allWalletTotalBalanceInSelectedCurrency"
    );
    const storedAllWalletTotalBalanceInUsd = localStorage.getItem(
      "allWalletTotalBalanceInUsd"
    );
    const storedNonYieldWalletTotalBalanceInSelectedCurrency =
      localStorage.getItem("nonYieldWalletTotalBalanceInSelectedCurrency");
    const storedYieldWalletTotalBalanceInSelectedCurrency =
      localStorage.getItem("yieldWalletTotalBalanceInSelectedCurrency");
    const storedYieldWalletAssets = localStorage.getItem("yieldWalletAssets");
    const storedNonYieldWalletAssets = localStorage.getItem(
      "nonYieldWalletAssets"
    );
    const parsedWalletAssets = JSON.parse(storedWalletAssets);
    const parsedAllWalletTotalBalanceInSelectedCurrency = JSON.parse(
      storedAllWalletTotalBalanceInSelectedCurrency
    );
    const parsedAllWalletTotalBalanceInUsd = JSON.parse(
      storedAllWalletTotalBalanceInUsd
    );
    const parsedYieldWalletTotalBalanceInSelectedCurrency = JSON.parse(
      storedYieldWalletTotalBalanceInSelectedCurrency
    );
    const parsedNonYieldWalletTotalBalanceInSelectedCurrency = JSON.parse(
      storedNonYieldWalletTotalBalanceInSelectedCurrency
    );
    const parsedYieldWalletAssets = JSON.parse(storedYieldWalletAssets);
    const parsedNonYieldWalletAssets = JSON.parse(storedNonYieldWalletAssets);

    if (
      parsedWalletAssets &&
      parsedAllWalletTotalBalanceInSelectedCurrency &&
      parsedAllWalletTotalBalanceInUsd
    ) {
      setWalletAssets(parsedWalletAssets);
      setCurrentPrice(parsedAllWalletTotalBalanceInSelectedCurrency);
      setConvertPrice(parsedAllWalletTotalBalanceInUsd);
      setYieldWalletTotalBalanceInSelectedCurrency(
        parsedYieldWalletTotalBalanceInSelectedCurrency
      );
      setNonYieldWalletTotalBalanceInSelectedCurrency(
        parsedNonYieldWalletTotalBalanceInSelectedCurrency
      );
      setYieldAssets(parsedYieldWalletAssets);
      setNonYieldAssets(parsedNonYieldWalletAssets);
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

      if (!res.ok) throw new Error("Failed to fetch user assets");
      setWalletInfo(data.data);
      setCurrentPrice(data.data.allWalletTotalBalanceInSelectedCurrency);
      setConvertPrice(data.data.allWalletTotalBalanceInUsd);
      setConvertPrice(data.data.allWalletTotalBalanceInUsd);
      setYieldWalletTotalBalanceInSelectedCurrency(
        data.data.yieldWalletTotalBalanceInSelectedCurrency
      );
      setNonYieldWalletTotalBalanceInSelectedCurrency(
        data.data.nonYieldWalletTotalBalanceInSelectedCurrency
      );
      setYieldAssets(data.data.yieldWalletAssets);
      setNonYieldAssets(data.data.nonYieldWalletAssets);
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
      setLoadingWalletAssetsBalances(false);
    }
  }

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%]  ml-auto">
          <TopNav />
          <div
            className={`lg:px-[20px] px-[10px] py-[30px]  mt-5 lg:mx-[25px] mx-[10px] `}
          >
            <div className="mb-6 flex items-end justify-between">
              <p className="text-[#ffffff] font-[500] md:text-[24px] text-[18px]">
                My Wallet
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div
                className={`rounded-lg bg-gradient-to-r from-primary-color to-blue-400 w-full mx-auto  md:pt-[5rem] pt-[2rem] pb-[0.5rem] md:pb-[1rem] `}
              >
                <div className="flex justify-between items-start mb-4 px-6">
                  <div>
                    <h2 className="text-white text-[14px] tracking-[2.4px]">
                      TOTAL BALANCE
                    </h2>
                    <div className="flex items-end">
                      <p className="md:text-4xl mt-2 mb-2 text-white text-3xl">
                        {currentPrice?.toFixed(2) || "loading..."}
                      </p>
                      <div className="relative mb-[10px] ml-[10px]">
                        <span
                          className="text-sm inline-flex items-center text-white cursor-pointer"
                          // onClick={() => setCurrencyChange(!currencyChange)}
                        >
                          {selectedAsset}
                          {/* <GoChevronDown /> */}
                        </span>
                        {currencyChange && (
                          <div className="absolute  border rounded shadow">
                            {assets.map((currency) => (
                              <p
                                key={currency}
                                className="px-2 text-white py-1 cursor-pointer"
                                onClick={() => {
                                  setCurrencyChange(false);
                                  setSelectedAsset(currency);
                                  if (currency === "NGN") {
                                    setCurrentPrice(
                                      walletInfo.allWalletTotalBalanceInNgn
                                    );
                                    setConvertPrice(
                                      walletInfo.allWalletTotalBalanceInUsd
                                    );
                                    setConvertCurrency("USDC");
                                  } else {
                                    setConvertCurrency("NGN");
                                    setConvertPrice(
                                      walletInfo.allWalletTotalBalanceInNgn
                                    );
                                    setCurrentPrice(
                                      walletInfo.allWalletTotalBalanceInUsd
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
                    <p className="text-[16px] font-[300] text-white">
                      ≈ {convertPrice?.toFixed(2) || "loading..."}{" "}
                      {convertCurrency}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div
                  className={`pt-[2rem] px-6 pb-[0.5rem]  border border-[#B2B2B27A] mb-[0.6rem] rounded-lg `}
                >
                  <p className="text-white text-[14px] tracking-[2.4px]">
                    SPENDABLE BALANCE
                  </p>
                  <p className="text-2xl mt-3 text-[white]">
                    {nonYieldWalletTotalBalanceInSelectedCurrency?.toFixed(2) ||
                      "loading..."}{" "}
                    NGN
                  </p>
                  <p className="text-[16px] font-[300] text-[white]">
                    ≈{" "}
                    {walletAssets?.nonYieldWalletTotalBalanceInUsd?.toFixed(
                      2
                    ) || "loading..."}{" "}
                    USDC
                  </p>
                </div>
                <div
                  className={` pt-[2rem] px-6 pb-[0.5rem] border border-[#B2B2B27A] rounded-lg`}
                >
                  <p className="text-white text-[14px] tracking-[2.4px]">
                    SAVINGS BALANCE
                  </p>
                  <p className="text-2xl mt-3 text-white">
                    {yieldWalletTotalBalanceInSelectedCurrency?.toFixed(2) ||
                      "loading..."}
                  </p>
                  <p className="text-[16px] font-[300] text-white">
                    ≈{" "}
                    {walletAssets?.yieldWalletTotalBalanceInUsd?.toFixed(2) ||
                      "loading..."}{" "}
                    USDC
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`rounded-lg w-full mx-auto border border-[#B2B2B27A] p-[1rem] mt-[1rem]`}
            >
              <p className="text-white">Spendable assets</p>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-left mt-[1rem]">
                  <thead className="text-[12px] text-white">
                    <tr>
                      <th scope="col" className="py-3 th1 font-[400]">
                        Name
                      </th>
                      <th scope="col" className="py-3 font-[400] px-6">
                        Amount
                      </th>
                      <th scope="col" className="py-3 font-[400]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {loadingWalletAssets ? (
                    <ArrayTableLoader number={2} />
                  ) : (
                    <tbody>
                      {nonYieldAssets?.map((asset) => (
                        <tr
                          className=" text-white gap-2 text-[12px] border-b"
                          key={asset.asset_code}
                        >
                          <td className="flex py-4 whitespace-nowrap items-center gap-2">
                            <img
                              src={asset.image}
                              width="32px"
                              alt={asset.asset_name}
                            />
                            <div>
                              <p className="whitespace-nowrap gap-2 text-white">
                                {asset.asset_name}
                              </p>
                              <p className="whitespace-nowrap gap-2 text-white">
                                {asset.asset_code}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6">{asset.balance}</td>
                          <td className="flex py-4 items-center gap-2">
                            <p
                              className=" text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() => {
                                if (asset.asset_name.includes("NGN")) {
                                  router.replace("/deposit-fiat");
                                } else {
                                  router.replace("/deposit-crypto");
                                }
                              }}
                            >
                              Deposit
                            </p>
                            <p
                              className=" text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() =>
                                router.replace("/withdraw-currency/crypto")
                              }
                            >
                              Withdraw
                            </p>
                            <p
                              className="whitespace-nowrap text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() => router.replace("/swap-assets")}
                            >
                              Convert
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
            <div className="rounded-lg border border-[#B2B2B27A] w-full mx-auto   p-[1rem] mt-[1rem]">
              <p className="text-white">Saved assets</p>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-left mt-[1rem]">
                  <thead className="text-[12px] text-white">
                    <tr>
                      <th scope="col" className="py-3 th1 font-[400]">
                        Name
                      </th>
                      <th scope="col" className="py-3 font-[400] px-6">
                        Locked
                      </th>
                      <th scope="col" className="py-3 font-[400]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {loadingWalletAssets ? (
                    <ArrayTableLoader number={2} />
                  ) : (
                    <tbody>
                      {yieldAssets?.map((asset) => (
                        <tr
                          className="text-[12px] tetx-white border-b"
                          key={asset.asset_code}
                        >
                          <td className="flex py-4 items-center gap-2">
                            <img
                              src={asset.image}
                              width="32px"
                              alt={asset.asset_name}
                            />
                            <div>
                              <p className="whitespace-nowrap gap-2 text-white">
                                {asset.asset_name}
                              </p>
                              <p className="whitespace-nowrap gap-2 text-white">
                                {asset.asset_code}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap gap-2 py-4 px-6">{asset.balance}</td>
                          <td className="py-4 flex items-center gap-2">
                            <p
                              className="whitespace-nowrap text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() =>
                                router.replace("/deposit-currency/crypto")
                              }
                            >
                              Deposit
                            </p>
                            <p
                              className="whitespace-nowrap text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() =>
                                router.replace("/withdraw-currency/crypto")
                              }
                            >
                              Withdraw
                            </p>
                            <p
                              className="flex text-[#3458D9] bg-[#DFE6F8] py-[3px] px-2 rounded-[4px] cursor-pointer"
                              onClick={() => router.replace("/swap-assets")}
                            >
                              Convert
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
