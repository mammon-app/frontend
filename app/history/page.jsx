"use client";

import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { PiArrowElbowUpLeftLight } from "react-icons/pi";
import { VscArrowSmallRight } from "react-icons/vsc";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import { IoIosArrowRoundBack } from "react-icons/io";
import Cookies from "js-cookie";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ArrayTableLoader from "../components/loader/ArrayTableLoader";
import TransactionTable from "../components/table/TransactionTable";

const History = () => {
  const router = useRouter();
  const [transactionHistory, setTransactionHistory] = useState([]);
  //   const API_KEY = import.meta.env.VITE_API_KEY
  //   const BASE_URL = import.meta.env.VITE_BASE_URL
  const user = Cookies.get("token");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactionHistory();
  }, []);

  async function getTransactionHistory() {
    const storedTx = localStorage.getItem("uniqueTransactions");
    const parsedTx = JSON.parse(storedTx);

    if (parsedTx) {
      setTransactionHistory(parsedTx);
    }
    if (!parsedTx) {
      setLoading(true);
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
      if (res) setLoading(false);

      // Remove duplicate transactionIds
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
      setLoading(false);
    }
  }

  function transactionInfo(transaction) {
    localStorage.setItem("transactionInfo", JSON.stringify(transaction));
    router.replace("/transaction-info");
  }

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="lg:w-[84%] w-full ml-auto">
          <TopNav />
          <div className="p-[20px] h-[100vh] py-[20px] mt-5  mx-[10px] lg:mx-[25px]">
            <div
              className="lg:inline-flex items-center gap-1 cursor-pointer my-3 text-[white] hidden"
              onClick={() => router.replace("/dashboard")}
            >
              <IoIosArrowRoundBack className="text-[20px]" />
              <p className="text-white">Back</p>
            </div>
            <TransactionTable
              transactionHistory={transactionHistory}
              loadingTx={loading}
              setSearchText={setSearchText}
              searchText={searchText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
