"use client";

import React from "react";
import { PiArrowElbowUpLeftLight } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import ArrayTableLoader from "../loader/ArrayTableLoader";

const TransactionTable = ({
  transactionHistory,
  loadingTx,
  setSearchText,
  searchText,
}) => {
  return (
    <div className="border border-[#B2B2B27A] mt-5 rounded-[4px] p-6">
      <div className="md:flex block items-center md:justify-between mb-10">
        <p className="text-[#ffffff] sm:text-[20px]">Recent Transactions</p>
        <div className="flex items-center gap-2 border rounded-full py-[6px] px-3">
          <BiSearch />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="bg-transparent outline-none text-[12px] text-[white]"
            placeholder="Filter Transactions by ID"
          />
        </div>
      </div>

      <div className="relative overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[12px] text-[#ffffff]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Transaction ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Transaction Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Asset Code
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                View on Stellar
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-[400] whitespace-nowrap"
              >
                Date
              </th>
            </tr>
          </thead>

          {loadingTx ? (
            <ArrayTableLoader number={7} />
          ) : (
            <tbody>
              {transactionHistory
                .filter((transaction) =>
                  transaction?.transaction_hash?.includes(
                    searchText?.toLowerCase()
                  )
                )
                .map((transaction, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-[12px] cursor-pointer border-b border-[#dcdcdc]"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.transaction_hash.slice(0, 6)}......
                        {transaction?.transaction_hash.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.amount ? transaction?.amount : "N/A"}
                      </td>
                      <td className="px-6 py-4 capitalize whitespace-nowrap">
                        {transaction?.type}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {transaction?.asset_code
                          ? transaction?.asset_code
                          : "N/A"}
                      </td>

                      {transaction?.transaction_successful ? (
                        <td className="px-6 py-2 mt-3 rounded-full flex items-center text-[#41920D] bg-[#EDFFE2] gap-1 whitespace-nowrap">
                          <p className="p-1 rounded-full bg-[#41920D]"></p>
                          <p>Completed</p>
                        </td>
                      ) : (
                        <td className="px-6 py-2 mt-3 rounded-full flex items-center text-[#ffffff] bg-[#F2F4F7] whitespace-nowrap">
                          <PiArrowElbowUpLeftLight />
                          <p>Processing</p>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`https://stellar.expert/explorer/public/tx/${transaction?.transaction_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline"
                        >
                          View on explorer
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(transaction?.created_at).toDateString()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
