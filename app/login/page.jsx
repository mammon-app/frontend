"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import AuthNav from "../components/auth-nav/AuthNav";
import Alert from "../components/alert/Alert";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Cookies from "js-cookie";
import BtnLoader from "../components/btn-loader/BtnLoader";

import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxChecked } from "react-icons/bi";

import { FiExternalLink } from "react-icons/fi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import ReCAPTCHA from "react-google-recaptcha";
import OTPInput from "react-otp-input";
import Loader from "../components/loader/Loader";

const Login = () => {
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [verifyCodeLoader, setVerifyCodeLoader] = useState(false);
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState("");
  const [authPage, setAuthPage] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.replace("/dashboard");
  }, []);

  async function handleSignIn(e) {
    // Cookies.set('token', true)
    e.preventDefault();
    if (!email || !password) {
      setMsg("Please fill in all fields");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            password,
            code: mfaCode,
            captcha: captchaValue,
          }),
        }
      );
      if (res) setLoading(false);
      const data = await res.json();
      if (data.message.includes("Provide your MFA code")) {
        setAuthPage(true);
        return;
      }
      if (!res.ok) {
        setMsg(data?.message);
        setAlertType("error");
        return;
      }
      if (res.ok && data?.data?.isEmailVerified === false) {
        localStorage.setItem("reg-email", email);
        router.replace("/confirm-email");
        return;
      }
      if (res.ok && data?.data?.stellarPublicKey === undefined) {
        localStorage.setItem("token", data.data.token);
        router.replace("/about-self");

        return;
      }
      if (res.ok && data?.data?.stellarPublicKey) {
        Cookies.set("token", data.data.token);
        const { password, token, ...safeData } = data;
        localStorage.setItem("userData", JSON.stringify(safeData));
        ("Stellar Public key");
        router.replace("/dashboard");
        return;
      }
    }
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <>
      {authPage ? (
        <div className="relative">
          <AuthNav />
          <div className="sm:mt-[5rem] mt-[7rem] h-[100vh] ">
            <div className="flex flex-col justify-center items-center relative z-[11]">
              <div className="px-4 sm:px-8 pt-8 pb-5 rounded-[16px] w-full sm:w-[488px] border">
                <div className="hidden top-bg relative top-[-20px] sm:flex items-center justify-center w-[300px] mx-auto">
                  <img
                    src="./images/mammon-finance-favicon.svg"
                    alt="Mammon App Logo"
                    className="mx-auto mb-4 relative top-[-65px]"
                  />
                </div>
                <div className="text-center mb-12 mt-[-80px] relative z-[100]">
                  {/* <h2 className="text-[36px] font-semibold mb-2">Login</h2> */}
                  <p className="text-[#ffffff] text-[14px]">
                    Enter Verification code
                  </p>
                </div>
                <form
                  onSubmit={handleSignIn}
                  className="flex flex-col sm:w-[400px] mx-auto"
                >
                  <p className="text-center text-[14px] text-[#ffffff] mb-[35px] mt-[4.5rem]">
                    Enter the 6-digit code from your google authenticator app
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <OTPInput
                      value={mfaCode}
                      inputType="number"
                      onChange={setMfaCode}
                      numInputs={6}
                      renderSeparator={
                        <span style={{ visibility: "hidden" }}>---</span>
                      }
                      renderInput={(props) => (
                        <input
                          {...props}
                          placeholder="1"
                          style={{ width: "50px" }}
                          className="text-center outline-none font-[500] h-[58px] rounded-[4px] w-[71px] border placeholder:text-[#96969659] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      )}
                    />
                  </div>
                  {loading ? (
                    <BtnLoader />
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="bg-primary-color text-white py-2 px-4 rounded-[8px] text-[14px] mt-5"
                    >
                      Verify Code
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="mt-[50px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
            <p className="text-[white] text-[14px]">
              &copy; {new Date().getFullYear()} Mammon finance. All rights
              reserved.
            </p>
            <div className="text-[white] text-[14px] flex items-center gap-4">
              <Link href="#" className="flex items-center gap-[2px]">
                Privacy Policy <FiExternalLink />
              </Link>
              <Link href="#" className="mr-4 flex items-center gap-[2px]">
                Terms of Use <FiExternalLink />
              </Link>
            </div>
          </div>
          {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
          {modal === "verify-code" && (
            <div>
              <div
                className="h-full w-full fixed top-0 left-0 z-[1001]"
                style={{ background: "rgba(14, 14, 14, 0.58)" }}
              ></div>
              <div
                className="bg-white fixed top-[50%] left-[50%] z-[10002] rounded-[8px]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div className="bg-white p-10" style={{ borderRadius: "10px" }}>
                  <p className="text-center text-white text-[14]">
                    Enter 6-digit code from your google authenticator app
                  </p>
                  <input
                    type="text"
                    placeholder="******"
                    className="mt-5 w-full border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                    onChange={(e) => setMfaCode(e.target.value)}
                  />
                  {verifyCodeLoader ? (
                    <button className="bg-primary-color text-white py-[8px] px-8 rounded-[6px] mt-5 w-full text-[14px] lg:text-[16px]">
                      <img
                        src="./images/loader.gif"
                        className="w-[20px] mx-auto"
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      className="bg-primary-color text-white py-[8px] px-8 rounded-[6px] mt-5 w-full text-[14px] lg:text-[16px]"
                      onClick={handleSignIn}
                    >
                      Verify code
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <AuthNav />
          <div className="sm:mt-[5rem] mt-[-7rem]">
            <div className="flex flex-col h-[100vh] justify-center items-center relative z-[11]">
              <div className="border border-[#B2B2B27A] px-4 sm:px-8 pt-8 pb-5 rounded-[16px] w-full sm:w-[488px]">
                <div className="hidden top-bg relative top-[-20px] sm:flex items-center justify-center w-[300px] mx-auto">
                  <img
                    src="./images/mammon-finance-favicon.svg"
                    alt="Mammon App Logo"
                    className="mx-auto mb-4 relative top-[-65px]"
                  />
                </div>
                <div className="text-center mb-12 mt-[-80px] relative z-[100]">
                  <h2 className="text-[36px] font-semibold mb-2">Login</h2>
                  <p className="text-[#ffffff] text-[14px]">
                    Login to access your dashboard
                  </p>
                </div>
                <form
                  onSubmit={handleSignIn}
                  className="flex flex-col sm:w-[400px] mx-auto"
                >
                  <div>
                    <label className="text-[#ffffff] gont-[500] text-[14px] mb-1 block">
                      Email
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="off"
                      className="bg-transparent border border-[#B2B2B27A] text-[#ffffff] p-2 rounded-[6px] outline-none w-full autofill:bg-transparent autofill:shadow-[0_0_0px_1000px_rgba(0,0,0,0)]"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="text-[#ffffff] gont-[500] text-[14px] mb-1 block">
                      Password
                    </label>
                    <div className="flex items-center justify-between border border-[#B2B2B27A] p-2 rounded-[6px] w-full">
                      <input
                        type={passwordType}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        autoComplete="off"
                        className="outline-none w-full bg-transparent text-white autofill:bg-transparent autofill:shadow-[0_0_0px_1000px_rgba(0,0,0,0)]"
                      />
                      <div>
                        {passwordType === "password" ? (
                          <ImCheckboxUnchecked
                            className="cursor-pointer white"
                            onClick={() => setPasswordType("text")}
                          />
                        ) : (
                          <ImCheckboxChecked
                            className="cursor-pointer white"
                            onClick={() => setPasswordType("password")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-white cursor-pointer text-end mt-2 text-[14px]"
                    onClick={() => router.replace("/forgot-password")}
                  >
                    Forgot Password?
                  </p>
                  {loading ? (
                    <BtnLoader />
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="bg-primary-color text-white py-2 px-4 rounded-[8px] text-[14px] mt-5"
                    >
                      Login
                    </button>
                  )}
                  <div className="text-center text-white mt-5 sm:mt-[40px] text-[14px]">
                    Don&apos;t have an account?{" "}
                    <Link href="/create-account" className="text-blue-600">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="flex items-center justify-center mt-3">
              <div>
                <p>Complete ReCaptcha to continue.</p>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </div>
            </div> */}
          </div>
          <div className="mt-[50px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
            <p className="text-[white] text-[14px]">
              &copy; {new Date().getFullYear()} Mammon finance. All rights
              reserved.
            </p>
            <div className="text-[white] text-[14px] flex items-center gap-4">
              <Link href="#" className="flex items-center gap-[2px]">
                Privacy Policy <FiExternalLink />
              </Link>
              <Link href="#" className="mr-4 flex items-center gap-[2px]">
                Terms of Use <FiExternalLink />
              </Link>
            </div>
          </div>
          {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
          {modal === "verify-code" && (
            <div>
              <div
                className="h-full w-full fixed top-0 left-0 z-[1001]"
                style={{ background: "rgba(14, 14, 14, 0.58)" }}
              ></div>
              <div
                className="border border-[#B2B2B27A] fixed top-[50%] left-[50%] z-[10002] rounded-[8px]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="border border-[#B2B2B27A] p-10"
                  style={{ borderRadius: "10px" }}
                >
                  <p className="text-center text-white text-[14]">
                    Enter 6-digit code from your google authenticator app
                  </p>
                  <input
                    type="text"
                    placeholder="******"
                    className="mt-5 w-full border border-[#D0D5DD] bg-transparent px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                    onChange={(e) => setMfaCode(e.target.value)}
                  />
                  {verifyCodeLoader ? (
                    <button className="bg-primary-color text-white py-[8px] px-8 rounded-[6px] mt-5 w-full text-[14px] lg:text-[16px]">
                      <img
                        src="./images/loader.gif"
                        className="w-[20px] mx-auto"
                        alt=""
                      />
                    </button>
                  ) : (
                    <button
                      className="bg-primary-color text-white py-[8px] px-8 rounded-[6px] mt-5 w-full text-[14px] lg:text-[16px]"
                      onClick={handleSignIn}
                    >
                      Verify code
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;
