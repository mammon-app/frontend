"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BsLightningCharge } from "react-icons/bs";
import AuthNav from "../../components/auth-nav/AuthNav";
import Alert from "../../components/alert/Alert";
import BtnLoader from "../../components/btn-loader/BtnLoader";
import Cookies from "js-cookie";
import { FiExternalLink } from "react-icons/fi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

const CreateAccount = () => {
  const { id } = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.push("/dashboard");
  }, []);

  async function handleAccountCreation(e) {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setMsg("Please fill in all fields");
      setAlertType("error");
      return;
    } else if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            password,
            // captcha:captchaValue
          }),
        }
      );
      if (res) setLoading(false);
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message);
        setAlertType("error");
        return;
      }
      if (res.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("reg-email", email);
        router.push("/confirm-email");
      }
      data;
    }
  }

  async function handleGoogleLogin(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/redirect`,
      {
        method: "GET",
        headers: {
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const data = await res.json();
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="relative">
      <AuthNav />
      <div className="sm:mt-[10rem]  h-[100vh] mt-[7rem]">
        <div className="flex flex-col justify-center items-center relative z-[11]">
          <div className="bg-white px-4 sm:px-8 pt-8 pb-5 rounded-[16px] border w-full sm:w-[588px]">
            <div className="top-bg relative top-[-20px] sm:flex items-center justify-center w-[300px] mx-auto hidden">
              <img
                src="../../images/mammon-app-favicon.svg"
                alt="Mammon App Logo"
                className="mx-auto mb-4 relative top-[-65px]"
              />
            </div>
            <div className="text-center mb-12 mt-[-80px] relative z-[100]">
              <h2 className="text-[36px] font-semibold mb-2">Create Account</h2>
              <p className="text-[#667085] sm:text-[14px] text-[14px]">
                Dive back into a world of premium features and explore the
                endless possibilities that await. Reconnect and continue your
                journey today.
              </p>
            </div>

            <form className="flex flex-col sm:w-[400px] mx-auto">
              <div className="w-full flex flex-col gap-3 mb-[20px]">
                <button
                  onClick={handleGoogleLogin}
                  className="border border-[#D0D5DD] text-[#ffffff] py-2 px-4 rounded-[8px] sm:text-[16px] text-[14px] flex items-center justify-center w-full shadow"
                >
                  <img
                    src="../../images/google.svg"
                    alt="Google Logo"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </button>
              </div>

              <div className="text-center text-[#ffffff] flex items-center justify-center gap-2 my-[10px]">
                <div className="h-[1px] bg-[#dbdbdb] w-full"></div>
                <p className="text-[#667085]">OR</p>
                <div className="h-[1px] bg-[#dbdbdb] w-full"></div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-[#ffffff] gont-[500] text-[14px] mb-1 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border border-gray-300 text-[#707070] p-2 rounded-[8px] outline-none w-full"
                />
              </div>

              <div className="my-5">
                <label className="text-[#ffffff] gont-[500] text-[14px] mb-1 block">
                  Password
                </label>
                <div className="flex items-center justify-between border border-gray-300 p-2 rounded-[6px] w-full">
                  <input
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="outline-none w-full"
                  />
                  <div>
                    {passwordType === "password" ? (
                      <ImCheckboxUnchecked
                        className="cursor-pointer text-gray-400"
                        onClick={() => setPasswordType("text")}
                      />
                    ) : (
                      <ImCheckboxChecked
                        className="cursor-pointer text-gray-400"
                        onClick={() => setPasswordType("password")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[#ffffff] gont-[500] text-[14px] mb-1 block">
                  Confirm Password
                </label>
                <div className="flex items-center justify-between border border-gray-300 p-2 rounded-[6px] w-full">
                  <input
                    type={passwordType}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    className="outline-none w-full"
                  />
                  <div>
                    {passwordType === "password" ? (
                      <ImCheckboxUnchecked
                        className="cursor-pointer text-gray-400"
                        onClick={() => setPasswordType("text")}
                      />
                    ) : (
                      <ImCheckboxChecked
                        className="cursor-pointer text-gray-400"
                        onClick={() => setPasswordType("password")}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="referral-code"
                  className="text-[#ffffff] gont-[500] text-[14px] mb-1 block"
                >
                  Referral Code
                </label>
                <p className="border border-gray-300 text-[#707070] p-2 rounded-[8px] outline-none w-full cursor-not-allowed">
                  {id}
                </p>
                {/* <input
                  type="text"
                //   onChange={e => setEmail(e.target.value)}
                  value=
                  placeholder="Enter your email"
                  className="border border-gray-300 text-[#707070] p-2 rounded-[8px] outline-none w-full cursor-not-allowed"
                /> */}
              </div>

              <button
                onClick={handleAccountCreation}
                disabled={loading}
                className="flex justify-center items-center bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5 text-[14px]"
              >
                <span>Create Account</span>
                {loading && (
                  <img
                    src="./images/loader.gif"
                    className="w-[20px] mx-2"
                    alt=""
                  />
                )}
              </button>
            </form>
            <div className="text-[white] text-[14px] flex items-center gap-1 mt-2 justify-center">
              By joining, you agree to our
              <Link
                href="#"
                className="inline-flex items-center gap-[2px] text-primary-color"
              >
                Privacy Policy <FiExternalLink />
              </Link>
              and
              <Link
                href="#"
                className="inline-flex items-center gap-[2px] text-primary-color"
              >
                Terms of Use <FiExternalLink />
              </Link>
            </div>

            <div className="text-center text-[black] mt-3 text-[14px]">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-color">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex items-center justify-center mt-3'>
          <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              onChange={handleCaptchaChange}
          />
      </div> */}
      <div className="mt-[100px] mb-5 sm:mx-10 flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between">
        <p className="text-[white] text-[14px]">
          &copy; {new Date().getFullYear()} Mammon App. All rights reserved.
        </p>
        <div className="text-[white] text-[14px] flex items-center gap-4">
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

export default CreateAccount;
