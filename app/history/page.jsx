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
  const [fiatTransactionHistory, setFiatTransactionHistory] = useState([]);
  const user = Cookies.get("token");
  const [searchText, setSearchText] = useState("");
  const [fiatSearchText, setFiatSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fiatLoading, setFiatLoading] = useState(false);

  useEffect(() => {
    getTransactionHistory();
    getFiatTransactionHistory();
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

  async function getFiatTransactionHistory() {
    const storedTx = localStorage.getItem("fiatTransactions");
    const parsedTx = JSON.parse(storedTx);

    if (parsedTx) {
      setFiatTransactionHistory(parsedTx);
    }
    if (!parsedTx) {
      setFiatLoading(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sep24/queryTransfers24`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            assetCode: 'NGNC',
          }),
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data, "Failed to fetch fiat transaction history");

      setFiatTransactionHistory(data?.data?.json?.transactions);
      localStorage.setItem(
        "fiatTransactions",
        JSON.stringify(data?.data?.json?.transactions)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setFiatLoading(false);
    }
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
              name="Crypto Transaction History"
              tableType="crypto"
              transactionHistory={transactionHistory}
              loadingTx={loading}
              setSearchText={setSearchText}
              searchText={searchText}
            />
            <TransactionTable
              name="Fiat Transaction History"
              tableType="fiat"
              transactionHistory={fiatTransactionHistory}
              loadingTx={fiatLoading}
              setSearchText={setFiatSearchText}
              searchText={fiatSearchText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
