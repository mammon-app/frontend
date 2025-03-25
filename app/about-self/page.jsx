"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import AuthNav from "../components/auth-nav/AuthNav";
import Alert from "../components/alert/Alert";
import BtnLoader from "../components/btn-loader/BtnLoader";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";

const AboutSelf = () => {
  const router = useRouter();
  const [showCountries, setShowCountries] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchText, setSeacrhText] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [confirmTransactionPin, setConfirmTransactionPin] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.replace("/dashboard");
  }, []);

  async function getAllCountruies() {
    setLoader(true);
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY":
            "VUJ1UU5aSmlLU2xiNEJxdUg0RnQ0akNZbXAyV2ZiVHlnN1F6dHA1dg==",
        },
      }
    );
    const data = await response.json();
    if (response) setLoader(false);
    setAllCountries(data);
    return data;
  }

  useEffect(() => {
    getAllCountruies();
  }, []);

  async function handleAboutSelfCreation() {
    if (!transactionPin || !confirmTransactionPin || !userName || !country) {
      setMsg("Please fill in all fields");
      setAlertType("error");
      return;
    } else if (transactionPin !== confirmTransactionPin) {
      setMsg("Transaction PINs do not match");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/create/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            pinCode: transactionPin,
            userName,
            country,
          }),
        }
      );
      const data = await res.json();
      if (res) setLoading(false);
      if (res.ok) {
        Cookies.set("token", data?.data?.token);
        const { password, token, ...safeData } = data;
        localStorage.setItem("userData", JSON.stringify(safeData));
        localStorage.removeItem("token");
        router.replace("/dashboard");
      } else {
        setMsg(data.message);
        setAlertType("error");
      }
    }
  }

  return (
    <div className="relative">
      <AuthNav />
      <div className="sm:mt-[10rem] h-[100vh] mt-[7rem]">
        <div className="flex flex-col justify-center items-center relative z-[11]">
          <div className="border border-[#B2B2B27A] px-4 sm:px-8 pt-8 pb-5 rounded-[16px] w-full max-w-[488px]">
            <div className="top-bg relative top-[-20px] hidden sm:flex items-center justify-center w-[300px] mx-auto">
              <img
                src="./images/mammon-finance-favicon.svg"
                alt="Mammon App Logo"
                className="mx-auto mb-4 relative top-[-65px]"
              />
            </div>
            <div className="text-center mb-12 mt-[-80px] relative z-[100]">
              <h2 className="text-2xl font-semibold mb-2">
                Create Your Wallet
              </h2>
              <p className="text-white sm:text-[14px] text-[12px]">
                These details will help us set up your Mammon Wallet
              </p>
            </div>
            <form className="flex flex-col mt-[-10px] sm:w-[400px] mx-auto">
              <div className="my-7">
                <label className="text-[#ffffff] font-[500] text-[14px] mb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your nickname"
                  autoCapitalize="off"
                  className="border border-[#B2B2B27A] autofill:bg-transparent autofill:shadow-[0_0_0px_1000px_rgba(0,0,0,0)] bg-transparent p-2 rounded-[6px] w-full outline-none text-white"
                />
              </div>

              <div>
                <label className="text-[#ffffff] font-[500] text-[14px] mb-1 block">
                  Create transaction Pin
                </label>
                <OTPInput
                  value={transactionPin}
                  inputType="number"
                  onChange={setTransactionPin}
                  numInputs={4}
                  renderSeparator={
                    <span style={{ visibility: "hidden" }}>---</span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="0"
                      className="text-center text-white bg-transparent  border-[#B2B2B27A]  otp-input text-[26px] font-[600] outline-none h-[68px] rounded-[8px] border placeholder:text-[#96969659] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  )}
                />
              </div>

              <div className="my-7">
                <label className="text-[#ffffff] font-[500] text-[14px] mb-1 block">
                  Confirm transaction Pin
                </label>
                <OTPInput
                  value={confirmTransactionPin}
                  inputType="number"
                  onChange={setConfirmTransactionPin}
                  numInputs={4}
                  renderSeparator={
                    <span style={{ visibility: "hidden" }}>---</span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="0"
                      className="text-center otp-input border-[#B2B2B27A] bg-transparent text-white text-[26px] font-[600] outline-none h-[68px] rounded-[8px] border placeholder:text-[#96969659] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  )}
                />
              </div>

              <div className="relative">
                <label className="text-[#ffffff] font-[500] text-[14px] mb-1 block">
                  Country
                </label>
                <div
                  onClick={() => setShowCountries(!showCountries)}
                  className="flex items-center justify-between border border-[#B2B2B27A] p-2 rounded-[6px] w-full"
                >
                  <input
                    type="text"
                    defaultValue={country}
                    placeholder="Nigeria"
                    autoComplete="off"
                    className="outline-none bg-transparent w-full text-white autofill:bg-transparent autofill:shadow-[0_0_0px_1000px_rgba(0,0,0,0)]"
                  />
                  <FaChevronDown className="cursor-pointer text-gray-300" />
                </div>
                {showCountries && (
                  <div className="bg-white w-full absolute top-[75px] rounded-[4px] border border-[#B2B2B27A] h-[300px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3">
                    <input
                      type="text"
                      onChange={(e) => setSeacrhText(e.target.value)}
                      placeholder="Search Country"
                      className="border border-gray-300 w-full placeholder:text-[13px] text-[13px] outline-none px-[4px] rounded mb-1 py-[5px]"
                    />
                    <div>
                      {loader ? (
                        <div className="flex items-center justify-center flex-col gap-3 mt-[7rem]">
                          <FiLoader className="text-[28px] animate-spin" />
                          <p className="text-black text-[14px]">
                            Fetching Countries Please Wait...
                          </p>
                        </div>
                      ) : (
                        <>
                          {allCountries
                            .filter((country) =>
                              country.name
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                            )
                            .map((country, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 hover:bg-gray-300 cursor-pointer p-[5px] text-[14px] text-black"
                                onClick={() => {
                                  setShowCountries(!showCountries);
                                  setCountry(country.name);
                                }}
                              >
                                <p className="text-black">{country.emoji}</p>
                                <p className="text-black">{country.name}</p>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {loading ? (
                <BtnLoader />
              ) : (
                <button
                  onClick={handleAboutSelfCreation}
                  className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-7"
                >
                  Confirm
                </button>
              )}
              <div className="text-center text-[white] mt-5 sm:mt-[70px] text-[14px]">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-[100px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
        <p className="text-[white] text-[12px]">
          &copy; {new Date().getFullYear()} Mammon finance. All rights reserved.
        </p>
        <div className="text-[white] text-[12px] flex items-center gap-4">
          <Link href="#">Privacy Policy</Link>
          <Link href="#" className="mr-4">
            Terms of Use
          </Link>
        </div>
      </div>
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default AboutSelf;
