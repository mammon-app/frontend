"use client";

import React, { useEffect, useState } from "react";
import { FaGoogle, FaDiscord, FaChevronDown } from "react-icons/fa";
import { BsLightningCharge } from "react-icons/bs";
import OTPInput from "react-otp-input";
import AuthNav from "../components/auth-nav/AuthNav";
import Alert from "../components/alert/Alert";
import BtnLoader from "../components/btn-loader/BtnLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ConfirmEmail = () => {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.replace("/dashboard");

    // Retrieve email from localStorage after component mounts
    const storedEmail = localStorage.getItem("reg-email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [router]);

  async function handleConfirmEmail() {
    if (!otp) {
      setMsg("Please input the OTP sent to you.");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({ otp: otp }),
        }
      );
      const data = await res.json();
      if (res) setLoading(false);
      data;
      if (res.ok) {
        router.replace("/about-self");
      } else {
        setMsg(data.message);
        setAlertType("error");
      }
    }
  }

  async function resendOtp(e) {
    e.preventDefault();
    JSON.stringify({ email });
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-verify-email-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({ email }),
      }
    );
    if (res) setLoading(false);
    const data = await res.json();
    data;
    if (res.ok) {
      setMsg(data.message);
      setAlertType("success");
    } else {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  return (
    <div className="relative">
      <AuthNav />
      <div className="sm:mt-[5rem]  h-[100vh] mt-[7rem]">
        <div className=" flex flex-col justify-center items-center relative z-[11]">
          <div className="border border-[#B2B2B27A] px-4 sm:px-8 pt-8 pb-5 rounded-[16px] w-full sm:w-[488px]">
            <div className="top-bg relative top-[-20px] hidden sm:flex items-center justify-center w-[300px] mx-auto">
              <img
                src="./images/mammon-app-favicon.svg"
                alt="Mammon App Logo"
                className="mx-auto mb-4 relative top-[-65px]"
              />
            </div>
            <div className="text-center mb-12 mt-[-80px] relative z-[100]">
              <h2 className="sm:text-2xl text-[18px] font-semibold text-white">
                Confirm email address
              </h2>
              <p className="text-[#ffffff] text-[14px] mt-3">
                Please input the OTP sent to {email}
              </p>
            </div>
            <div className="flex flex-col sm:w-[400px] mx-auto">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OTPInput
                  value={otp}
                  inputType="number"
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={
                    <span style={{ visibility: "hidden" }}>---</span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="0"
                      className="text-center text-white otp-input text-[26px] bg-transparent font-[600] outline-none h-[68px] rounded-[8px] border border-[#96969659] placeholder:text-[#b0b0b0] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  )}
                />
              </div>
              <p className="text-[#ffffff] text-[12px] mt-2 mb-[1rem] text-center">
                Please check your email inbox for an OTP code
              </p>
              <button
                onClick={handleConfirmEmail}
                disabled={loading}
                className="flex justify-center items-center bg-primary-color text-white w-[90%] mx-auto py-2 px-4 rounded-[8px] mt-5"
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
              <p
                className="text-[#ffffff] text-[12px] mt-4 mb-[0.5rem] text-center cursor-pointer"
                onClick={resendOtp}
              >
                Click to resend code?
              </p>
              <div className="text-center text-white mt-5 sm:mt-[50px] text-[14px]">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
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

export default ConfirmEmail;
