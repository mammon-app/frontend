"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Deposit = () => {
  const user = Cookies.get("token");
  const [currencies, setCurrencies] = useState([]);

  const router = useRouter();

  async function getAllTrustLines() {
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
      if (!res.ok) throw new Error(data, "Failed to fetch user trustlines");
      const keysToExtract = ["NGNC", "BTC", "ETH", "NATIVE", "USDC"];
      const newData = [];

      for (const key of keysToExtract) {
        if (data?.data?.trustLines[key]) {
          newData.push(data?.data?.trustLines[key]);
        }
      }

      setCurrencies(newData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllTrustLines();
  }, []);

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%]  ml-auto">
          <TopNav />
          <div className="py-[20px] px-[30px] h-[100vh]  mt-5 lg:mx-[20px] ">
            <div className="mt-5 ml-1 hidden lg:block">
              <p className="text-[32px] text-primary-color">Deposit Crypto</p>
              <p className="font-[300] text-[white]">
                Add crypto to your balance
              </p>
            </div>
            <div className="mt-9">
              <div className="flex items-center gap-5 flex-col md:flex-row">
                <div
                  className="bg-primary-color h-[420px] text-white p-[1.5rem] cursor-pointer w-[300px] hover:scale-[1.01] transition-all"
                  onClick={() => router.replace(`/deposit-crypto`)}
                >
                  <div className="bg-white p-2 inline-block rounded-full">
                    <Image
                      src="./images/empty-wallet.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <div className="mt-[12rem] mb-[52px]">
                    <p className="font-[500] text-[20px]">Deposit crypto</p>
                    <p className="mt-3 font-[300] text-[14px]">
                      Transfer crypto to your Mammon Wallet
                    </p>
                  </div>
                </div>
                <div
                  className="w-[300px] h-[420px] bg-[#EBEFFF] text-[#222222] p-[1.5rem] cursor-pointer hover:scale-[1.01] transition-all"
                  onClick={() => router.replace(`/deposit-fiat`)}
                >
                  <div className="bg-white p-2 inline-block rounded-full">
                    <Image
                      src="./images/bank.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <div className="mt-[12rem] mb-7">
                    <p className="font-[500] text-[20px]">Deposit with Fiat</p>
                    <p className="mt-3 text-[#757575] text-[14px] font-[300]">
                      Get crypto by sending fiat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
