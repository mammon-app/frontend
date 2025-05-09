"use client";

import React, { useState, useEffect } from "react";
import { RiBankLine } from "react-icons/ri";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import BtnLoader from "../components/btn-loader/BtnLoader";
import Cookies from "js-cookie";
import { TbCurrencyNaira } from "react-icons/tb";
import { GoChevronDown } from "react-icons/go";
import Alert from "../components/alert/Alert";
import { BsLightningCharge } from "react-icons/bs";
const DepositProvider = () => {
  const user = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState();
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const assets = [
    { symbol: "NGNC", name: "Nigeria Naira" },
    // { symbol: "GHSC", name: "Ghana Cedis" },
    // { symbol: "KESC", name: "Kenya Shillings" },
  ];
  const [currencyChange, setCurrencyChange] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(assets[0]);

  useEffect(() => {
    if (!url) return;

    const iframeDoneListener = () => {
      const iframe = document.getElementById("deposit-iframe");
      if (!iframe) return;

      try {
        const currentUrl = iframe.contentWindow?.location.href;
        if (
          currentUrl?.includes("success") ||
          currentUrl?.includes("callback")
        ) {
          setModal(false);
          setUrl(null);
          queryTransaction();
        }
      } catch (err) {
        // CORS restrictions might block access, ignore silently
      }
    };

    const interval = setInterval(iframeDoneListener, 1500); // check every 1.5s

    return () => clearInterval(interval);
  }, [url]);

  async function initiateWithdrawal() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sep24/initiateTransfer24`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            assetCode: selectedCurrency.symbol,
            txType: "deposit",
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setUrl(data.data.json.url);
        setModal("deposit");
        setMsg(data.message);
      } else {
        setMsg(data.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function queryTransaction() {
    setLoading(true);
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
            assetCode: selectedCurrency.symbol,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setTransactionInfo(data?.data?.json?.transactions[0]);
        if (
          !data?.data?.json?.transactions[0] ||
          !data?.data?.json?.transactions[0].amount_in
        ) {
          setMsg("Please complete deposit process on the provider's website.");
          setAlertType("error");
        } else {
          setMsg(data.message);
          setModal("success");
        }
      } else {
        setMsg(data.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%]  ml-auto">
          <TopNav />
          <div className="py-[20px] px-[10px] h-[100vh] mt-5 lg:mx-[25px] ">
            <div className="mt-5 ml-1 hidden lg:block">
              <p className="text-primary-color text-[32px]">Bank Transfer</p>
              <p className="font-[300] text-[#ffffff]">
                Send money to get crypto
              </p>
            </div>
            <div className="mt-9">
              <h2 className="text-center lg:text-[#ffffff] text-primary-color mb-2 font-[500] lg:font-[400]">
                Choose a provider
              </h2>
              <div className="flex items-center gap-5">
                <div className="w-[500px] mx-auto lg:p-2 border border-[#B2B2B27A] rounded-lg responsive-widths">
                  <div className="border bg-[#D2D9F542]A] p-3 rounded-[8px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#ffffff]">Link</p>
                        <div className="flex items-end">
                          <div className="relative mb-[10px]">
                            <span
                              className="text-sm inline-flex items-center cursor-pointer"
                              onClick={() => setCurrencyChange(!currencyChange)}
                            >
                              {selectedCurrency.name} <GoChevronDown />
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
                                    }}
                                  >
                                    {currency.symbol}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#ffffff] p-1 rounded-full">
                        <RiBankLine className="text-primary-color text-[22px]" />
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-white">Provider fee</p>
                      <p className="font-300 text-[#ffffff]">
                        Dynamic partner fees
                      </p>
                    </div>
                  </div>
                  <div className="lg:flex items-center justify-center hidden">
                    <button
                      className="flex justify-center items-center py-2 w-[90%] mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]"
                      onClick={initiateWithdrawal}
                      disabled={loading}
                    >
                      <span>Proceed</span>
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
              </div>
              <div className="lg:hidden items-center justify-center flex mt-[8rem] mb-[3rem] w-[500px] mx-auto responsive-widths">
                <button
                  className="flex justify-center items-center py-2 w-full mx-auto text-white bg-primary-color rounded-[6px] mb-3 mt-[4rem]"
                  onClick={initiateWithdrawal}
                  disabled={loading}
                >
                  <span>Proceed</span>
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
          </div>
        </div>
      </div>
      {modal === "deposit" && url && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="relative w-[95%] max-w-[600px] h-[90vh] md:h-[85vh] bg-black border border-white/50 rounded-lg overflow-hidden">
            <iframe
              id="deposit-iframe"
              src={url}
              title="Deposit Process"
              className="w-full h-full bg-black"
            ></iframe>
            <button
              className="absolute cursor-pointer top-2 right-2 border border-white/50 bg-[#B3261E] text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => {
                setModal(false);
                setUrl(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* {modal === "withdraw" && (
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
          <div className="bg-[white]" style={{ borderRadius: "0px" }}>
            <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i>
            <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col">
              <p className="text-black text-[16px] mb-5 text-center">
                Note that you are being redirected to a third-party website to
                make your deposit. <br /> Once transaction is completed please
                come back to the website to confirm your transaction
              </p>
              <div className="flex items-center gap-3 justify-between">
                <button
                  className="px-3 py-[6px] text-white bg-primary-color rounded-[5px]"
                  onClick={() => {
                    setModal("confirmPayment");
                    window.open(url, "_blank");
                  }}
                >
                  Continue
                </button>
                <button
                  className="px-3 py-[6px] text-white bg-red-500 rounded-[5px]"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {modal === "confirmPayment" && (
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
          <div className="bg-[white]" style={{ borderRadius: "0px" }}>
            {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
            <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col">
              <p className="text-black text-[16px] mb-5 text-center">
                Click on the button to confirm your transaction
              </p>
              <p className="text-red-500 text-[16px] mb-5 text-center">
                {msg
                  ? "Please complete deposit process on the provider's website."
                  : ""}
              </p>

              <div className="flex gap-3 items-center justify-between">
                <button
                  className="flex justify-center items-center px-3  py-[6px] text-white bg-primary-color rounded-[5px]"
                  disabled={loading}
                  onClick={queryTransaction}
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
                <button
                  className="px-3  py-[6px] text-white bg-red-500 rounded-[5px]"
                  onClick={() => {
                    setModal(false);
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modal === "success" && (
        <>
          <div>
            <div
              className="h-full w-full fixed top-0 left-0 z-[99]"
              style={{ background: "rgba(14, 14, 14, 0.58)" }}
              onClick={() => setModal(false)}
            ></div>
            <div
              className="bg-[white] lg:w-[500px] md:w-[50%] sm:w-[70%] w-[90%] fixed top-[50%] left-[50%] z-[100] rounded-[8px]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <img
                src="./images/check-mark.png"
                alt=""
                className="rounded-t-[11px] w-[100px] mx-auto mt-5"
              />
              <p className="font-[500] text-[22px] text-center mb-2 text-black">
                Thank you!
              </p>
              <p className="text-black text-[16px] text-center">
                Your Transaction is being processed. <br /> You can monitor this
                transaction in your transaction history
              </p>
              <div className="md:px-8 px-4 mt-7 mb-[1rem] text-center">
                <p className="text-[18px] lg:text-[20px] text-[black] font-[500]">
                  Transaction Info:
                </p>
              </div>
              <div className="md:w-[80%] w-[90%] mx-auto text-black">
                <div className="flex justify-between">
                  <p>Amount Fee</p>
                  <div className="flex items-center justify-between">
                    <TbCurrencyNaira />
                    <p>{transactionInfo?.amount_fee}</p>
                  </div>
                  {/* <p>{transactionInfo?.amount_fee}</p> */}
                </div>
                <div className="flex justify-between mt-3">
                  <p>Amount In</p>
                  <div className="flex items-center justify-between">
                    <TbCurrencyNaira />
                    <p>{transactionInfo?.amount_in}</p>
                  </div>
                  {/* <p>{transactionInfo?.amount_fee}</p> */}
                </div>
                <div className="flex justify-between mt-3 border-t pt-3 font-[500]">
                  <p>Total</p>
                  <div className="flex items-center justify-between">
                    <TbCurrencyNaira />
                    <p>
                      {Number(transactionInfo?.amount_in) +
                        Number(transactionInfo?.amount_fee)}
                    </p>
                  </div>
                  {/* <p>{transactionInfo?.amount_fee}</p> */}
                </div>
              </div>
              <div className="flex flex-col items-center mt-10 gap-4 md:w-[80%] w-[90%] mx-auto mb-[1.5rem]">
                <button
                  onClick={() => setModal(false)}
                  className="bg-primary-color text-white py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]"
                >
                  Yes, I understand
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="bg-[#EEEFF0] text-[#0C0C0C] py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]"
                >
                  No Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default DepositProvider;
