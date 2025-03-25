"use client";

import React, { useEffect, useState } from "react";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import SaveCardModal from "../components/save-card-modal/SaveCardModal";
import { SlCloudUpload } from "react-icons/sl";
import { GoChevronDown } from "react-icons/go";
import Cookies from "js-cookie";
import { FaChevronDown } from "react-icons/fa6";
import Alert from "../components/alert/Alert";
import { FiLoader } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import BtnLoader from "../components/btn-loader/BtnLoader";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import QRCode from "react-qr-code";
import { IoCopyOutline } from "react-icons/io5";
import Loader from "../components/loader/Loader";

const Settings = () => {
  //   const API_KEY = import.meta.env.VITE_API_KEY
  //   const BASE_URL = import.meta.env.VITE_BASE_URL
  const [showCountries, setShowCountries] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const [saveCardModal, setSaveCardModal] = useState(false);
  const settingsTypeArray = [
    "Profile",
    "Password",
    "Privacy",
    "Two Factor Authentication",
  ];
  const [selectedTab, setSelectedTab] = useState(settingsTypeArray[0]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [allCountries, setAllCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchText, setSeacrhText] = useState("");

  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [loading, setLoading] = useState(false);
  const [fileUploadLoader, setfileUploadLoader] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("/images/Avatar.svg");
  const [profilePicMsg, setProfilePicMsg] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [revealPrivateKey, setRevealPrivateKey] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [multiFAInfo, setMultiFAInfo] = useState();
  const [qrLoading, setQrLoading] = useState(false);
  let [modal, setModal] = useState("");
  const [multiFAInfoSetUp, setMultiFAInfoSetUp] = useState();
  const [mfaCode, setMfaCode] = useState("");
  const [verifyCodeLoader, setVerifyCodeLoader] = useState(false);

  const user = Cookies.get("token");

  async function getAccountInfo() {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(storedUserData);

    if (parsedUserData) {
      setAddress(parsedUserData?.stellarPublicKey);
      setUsername(parsedUserData?.username);
      setEmail(parsedUserData?.primaryEmail);
      setCountry(parsedUserData?.country);
      setCurrentImage(parsedUserData?.userProfileUrl);
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
      if (res.ok) {
        setUsername(data?.data?.username);
        setEmail(data?.data?.primaryEmail);
        setCountry(data?.data?.country);
        setCurrentImage(data?.data?.userProfileUrl);
        localStorage.setItem("userData", JSON.stringify(data.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserData(false);
    }
  }

  async function exportPrivateKey() {
    if (!pinCode) {
      setMsg("Please enter your PIN code");
      setAlertType("error");
      return;
    } else {
      setLoader(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/exportPrivateKey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            pinCode,
          }),
        }
      );
      const data = await res.json();
      if (res) setLoader(false);
      if (!res.ok) {
        setAlertType("error");
        setMsg(data.message);
      }
      if (res.ok) {
        setPrivateKey(data.data.privateKey);
        setShowPrivateKey(true);
        setRevealPrivateKey(false);
      }
    }
  }

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
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(storedUserData);
    setAddress(parsedUserData?.stellarPublicKey);
    getAccountInfo();
    getAllCountruies();
    getTwoFaSettings();
  }, []);

  async function handleFileUpload() {
    // setCurrentFile(file);
    if (currentFile === null) {
      setMsg("Please select a file");
      setAlertType("error");
      return;
    }
    // if (currentFile) {
    //   const preview = URL.createObjectURL(currentFile);
    //   setPreviewUrl(preview);
    // }
    setfileUploadLoader(true);
    setProfilePicMsg("File Upload in progress, please do not refresh the page");
    const formData = new FormData();
    formData.append("file", currentFile);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/uploadProfileImage`,
      {
        method: "POST",
        body: formData,
        headers: {
          // 'Content-Type':'multipart/form-data',
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    if (res) {
      setCurrentFile(null);
      setfileUploadLoader(false);
    }
    if (res.ok) {
      setMsg("File uploaded successfully");
      setAlertType("success");
      setCurrentImage(data.data.image);
      profilePicUpdate(data.data.image);
    }
    if (!res.ok) {
      setMsg("File upload wasn't successfull");
      setAlertType("error");
    }
  }

  async function profilePicUpdate(imageUrl) {
    // setProfilePicMsg('Please hang on, while we update your profile image.')
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/profile-image`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          userProfileUrl: imageUrl,
        }),
      }
    );
    if (res) setfileUploadLoader(false);
    const data = await res.json();
    if (res.ok) {
      setMsg(data.message);
      setAlertType("success");
      getAccountInfo();
    }
    if (!res.ok) {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  async function profileUpdate() {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          username,
          country,
        }),
      }
    );
    if (res) setLoading(false);
    const data = await res.json();
    if (res.ok) {
      setMsg(data.message);
      setAlertType("success");
      getAccountInfo();
    }
    if (!res.ok) {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  async function passwordUpdate() {
    if (!password || !confirmPassword || !oldPassword) {
      setMsg("Please fill all fields");
      setAlertType("error");
      return;
    } else if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setAlertType("error");
      return;
    } else {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          body: JSON.stringify({
            oldPassword,
            password,
          }),
        }
      );
      if (res) setLoading(false);
      const data = await res.json();
      if (res.ok) {
        setOldPassword();
        setPassword();
        setConfirmPassword();
        setMsg("Password updated successfully");
        setAlertType("success");
      }
      if (!res.ok) {
        setMsg(data.message);
        setAlertType("error");
      }
    }
  }

  async function getTwoFaSettings() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/mfa/get-setting`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    setMultiFAInfo(data.data);
  }

  async function toggle2fa() {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/mfa/toggle-setup`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    if (res) setLoading(false);
    const data = await res.json();
    if (res.ok) {
      getTwoFaSettings();
      // setMultiFAInfo(data.data)
      setMsg("Two-factor authentication has been toggled successfully");
      setAlertType("success");
    }
    if (!res.ok) {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  async function setUpMFA() {
    setQrLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/mfa/generate-secret`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );
    if (res) setQrLoading(false);
    const data = await res.json();
    if (res.ok) {
      setMultiFAInfoSetUp(data.data);
      setAlertType("success");
    }
    if (!res.ok) {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  async function verifyMFACode() {
    setVerifyCodeLoader(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/account/mfa/setup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
          "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          code: mfaCode,
        }),
      }
    );
    if (res) setVerifyCodeLoader(false);
    const data = await res.json();

    if (res.ok) {
      setMsg("Two-factor authentication has been set up successfully");
      setAlertType("success");
      setModal(false);
      getTwoFaSettings();
    }
    if (!res.ok) {
      setMsg(data.message);
      setAlertType("error");
    }
  }

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%] ml-auto mb-10">
          <TopNav />
          {loadingUserData ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="px-[15px] h-[100vh] lg:pl-12 pb-[30px] pt-[30px] mt-5 md:mx-[30px]">
              <p className="text-[#ffffff] md:text-[25px] font-[500]">
                Settings
              </p>
              <div className="flex items-center border-b border-[#EAECF0] mt-7">
                {settingsTypeArray.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className={`px-[.8rem] pb-[18px] font-[500] text-[#667085] cursor-pointer text-[14px] md:text-[16px] ${
                        selectedTabIndex === index
                          ? "text-primary-color border-b border-primary-color"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTab(item);
                        setSelectedTabIndex(index);
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
              {selectedTab === "Profile" && (
                <div className="">
                  <div className="border-b border-[#EAECF0] mt-7 pb-5">
                    <p className="text-[#ffffff] font-[500] text-[18px] mb-1">
                      Personal info
                    </p>
                    <p className="text-[#667085] font-[300]">
                      Update your personal details here.
                    </p>
                  </div>

                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                        <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                          Username
                        </td>
                        <td className="w-[280px]">
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="username.xlm"
                            className="w-full bg-transparent border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                          />
                        </td>
                      </tr>
                      <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                        <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                          Country
                        </td>
                        <td className="relative w-[280px]">
                          <div className="flex items-center justify-between border border-gray-300 p-2 rounded-[6px]">
                            <input
                              type="text"
                              value={country}
                              placeholder="Nigeria"
                              className="outline-none bg-transparent w-full text-[#ffffff]"
                            />
                            <FaChevronDown
                              className="cursor-pointer text-gray-300"
                              onClick={() => setShowCountries(!showCountries)}
                            />
                          </div>
                          {showCountries && (
                            <div className="bg-white w-full absolute z-10 top-[75px] rounded-[4px] border border-gray-300 h-[300px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3">
                              <input
                                type="text"
                                onChange={(e) => setSeacrhText(e.target.value)}
                                placeholder="Search Country"
                                className="border bg-white border-gray-300 w-full placeholder:text-[13px] text-[13px] outline-none px-[4px] rounded mb-1 py-[5px]"
                              />
                              <div>
                                {loader ? (
                                  <div className="flex items-center justify-center flex-col gap-3 mt-[7rem]">
                                    <FiLoader className="text-[28px] animate-spin" />
                                    <p className="text-gray-500 text-[14px]">
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
                                          className="flex items-center gap-2 hover:bg-gray-300 cursor-pointer p-[5px] text-[14px] text-gray-500"
                                          onClick={() => {
                                            setShowCountries(!showCountries);
                                            setCountry(country.name);
                                          }}
                                        >
                                          <p>{country.emoji}</p>
                                          <p>{country.name}</p>
                                        </div>
                                      ))}
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                        <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                          Email address
                        </td>
                        <td className="w-[280px]">
                          <input
                            value={email}
                            type="text"
                            placeholder="Enter your email"
                            className="border bg-transparent border-[#D0D5DD] px-[14px] py-[10px] w-full rounded-[8px] shadow-sm outline-none text-[#ffffff] cursor-not-allowed"
                          />
                        </td>
                      </tr>
                      {/* <tr className='border-b border-[#EAECF0] w-full md:flex grid py-[1.5rem] gap-5'>
                                    <td>
                                    <p className='text-[#ffffff] font-[500] pr-[5rem]'>Your photo</p>
                                    <p className='text-[#667085] font-[300]'>This will be displayed on your profile.</p>
                                    </td>
                                    <td className='flex items-start flex-col md:flex-row gap-5 md:py-0 py-[2.5rem]'>
                                    <img src={currentImage} alt="" className='w-[80px] h-[80px] object-cover rounded-full' />
                                    <div>
                                        <div className='relative border flex flex-col justify-center items-center p-7 cursor-pointer rounded-[8px] max-w-[300px] h-[200px] overflow-hidden'>
                                        <input type="file" onChange={(e) => {
                                            setCurrentFile(e.target.files[0])
                                            setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                                            }} className='absolute w-full h-full opacity-0 cursor-pointer' />
                                        {
                                            previewUrl ? <img src={previewUrl} alt="" className='w-full object-contain' />
                                            :
                                            <>
                                            <SlCloudUpload className='text-[#475467] bg-[#F2F4F7] p-3 rounded-full text-[3rem]'/>
                                            <p className='text-primary-color font-[600] text-[14px] my-2 text-center'>Click to upload  <span className='text-[#667085] font-[300] hidden'>or drag and drop</span></p>
                                            <p className='text-[#667085] font-[300] text-center'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                            </>
                                        }

                                        </div>
                                        <button className='bg-primary-color py-2 px-5 rounded-[8px] text-white w-full mt-3' onClick={handleFileUpload}>Upload Image</button>
                                    </div>
                                    </td>
                                </tr> */}
                      {/* <tr className='border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2'>
                                    <td className='text-[#ffffff] font-[500] md:py-[2.5rem] md:w-[60%] w-[90%]'>
                                      <p className='text-[#ffffff] font-[500] pr-[5rem]'>Your preferred currency</p>
                                      <p className='text-[#667085] font-[300]'>This is the currency in which you deposit and automatically send, receive money.</p>
                                    </td>
                                    <td className='relative max-w-[500px]'>
                                      <div className='flex items-center justify-between border border-gray-300 p-2 rounded-[6px]'>
                                          <input
                                          type="text"
                                          placeholder="Stellar Lumens"
                                          className="outline-none w-full text-[#667085]"
                                          />
                                          <FaChevronDown className='cursor-pointer text-gray-300'/>
                                      </div>
                                    </td>
                                </tr> */}
                    </tbody>

                    {/* <tr className='border-b border-[#EAECF0] w-full'>
                            <td className='py-[2.5rem]'>
                              <p className='text-[#ffffff] font-[500] pr-[5rem]'>Your preferred currency</p>
                              <p className='text-[#667085] font-[300]'>This is the currency in which you deposit and automatically send, receive money.</p>
                            </td>
                            <td>
                              <div className='flex items-center justify-between border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm w-full'>
                                <input type="text" placeholder='Stellar Lumens' className='outline-none text-[#ffffff]' />
                                <GoChevronDown />
                              </div>
                            </td>
                          </tr> */}
                  </table>
                  <div className="flex justify-end mt-[2.5rem] gap-5">
                    <button className="border border-[#D0D5DD] py-2 px-5 rounded-[8px] text-[#ffffff]">
                      Cancel
                    </button>
                    {loading ? (
                      <button className="bg-primary-color py-2 px-[30px] rounded-[8px] text-white">
                        <img
                          src="./images/loader.gif"
                          className="w-[20px]"
                          alt=""
                        />
                      </button>
                    ) : (
                      <button
                        className="bg-primary-color py-2 px-5 rounded-[8px] text-white"
                        onClick={profileUpdate}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Password" && (
                <div>
                  <div className="border-b border-[#EAECF0] mt-7 pb-5">
                    <p className="text-[#ffffff] font-[500] text-[18px] mb-1">
                      Change password
                    </p>
                    <p className="text-[#667085] font-[300]">
                      Update your password here.
                    </p>
                  </div>
                  <table className="w-full">
                    <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                      <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                        Current Password
                      </td>
                      <td>
                        <input
                          onChange={(e) => setOldPassword(e.target.value)}
                          type="password"
                          placeholder="********"
                          className="w-full bg-transparent border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                      <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                        New Password
                      </td>
                      <td>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="********"
                          className="w-full bg-transparent border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                      <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[180px]">
                        Confirm Password
                      </td>
                      <td>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          placeholder="********"
                          className="w-full bg-transparent border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#ffffff]"
                        />
                      </td>
                    </tr>
                  </table>
                  <div className="flex justify-end mt-[2.5rem] gap-5">
                    <button className="border border-[#D0D5DD] py-2 px-5 rounded-[8px] text-[#ffffff]">
                      Cancel
                    </button>
                    {loading ? (
                      <button className="bg-primary-color py-2 px-[30px] rounded-[8px] text-white">
                        <img
                          src="./images/loader.gif"
                          className="w-[20px]"
                          alt=""
                        />
                      </button>
                    ) : (
                      <button
                        className="bg-primary-color py-2 px-5 rounded-[8px] text-white"
                        onClick={passwordUpdate}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === "Privacy" && (
                <div>
                  <div className="border-b border-[#EAECF0] mt-7 pb-5">
                    <p className="text-[#ffffff] font-[500] text-[18px] mb-1">
                      Privacy
                    </p>
                    <p className="text-[#667085] font-[300]">
                      Access your public & private key
                    </p>
                  </div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b border-[#EAECF0] w-full flex items-center gap-[5rem]">
                        <td className="text-[#ffffff] font-[500] py-[2.5rem]">
                          Export Public Key
                        </td>
                        <td className="flex items-center gap-5 border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm ">
                          <input
                            type="text"
                            value={address}
                            className="outline-none bg-[transparent] text-[#ffffff]"
                          />
                          <BiCopy
                            className="text-[#414553] cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(address);
                              setMsg("Address copied successfully!");
                              setAlertType("success");
                            }}
                          />
                        </td>
                      </tr>
                      <tr className="border-b border-[#EAECF0] w-full flex items-center gap-[5rem]">
                        <td className="text-[#ffffff] font-[500] py-[2.5rem]">
                          Export Private Key
                        </td>
                        {showPrivateKey ? (
                          <td className="flex items-center gap-5 border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm ">
                            <input
                              type="text"
                              value={privateKey}
                              className="outline-none bg-[transparent] text-[#ffffff]"
                            />
                            <BiCopy
                              className="text-[#414553] cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(privateKey);
                                setMsg("Private key copied successfully!");
                                setAlertType("success");
                              }}
                            />
                          </td>
                        ) : (
                          <td className="flex items-center gap-5 border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm ">
                            <input
                              type="text"
                              onChange={(e) => setPinCode(e.target.value)}
                              value="******************"
                              className="outline-none bg-[transparent] text-[#ffffff]"
                            />
                            <BiCopy
                              className="text-[#414553] cursor-pointer"
                              onClick={() => setRevealPrivateKey(true)}
                            />
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  {/* <div className='flex justify-end mt-[2.5rem] gap-5'>
                          <button  className='border border-[#D0D5DD] py-2 px-5 rounded-[8px] text-[#ffffff]'>Cancel</button>
                          <button className='bg-primary-color py-2 px-5 rounded-[8px] text-white'>Save</button>
                        </div> */}
                </div>
              )}

              {selectedTab === "Two Factor Authentication" && (
                <div>
                  <div className="border-b border-[#EAECF0] mt-7 pb-5">
                    <p className="text-[#ffffff] font-[500] text-[18px] mb-1">
                      Two Factor Authentication
                    </p>
                    <p className="text-[#667085] font-[300]">
                      Set up your two factor authentication here.
                    </p>
                  </div>
                  <table className="w-full">
                    <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                      <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[280px]">
                        Toggle Multifactor Authentication
                      </td>
                      <td>
                        {multiFAInfo?.isEnabled ? (
                          <label class="inline-flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              value=""
                              class="sr-only peer"
                              checked
                            />
                            <div
                              onClick={toggle2fa}
                              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                          </label>
                        ) : (
                          <label class="inline-flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              class="sr-only peer"
                              disabled
                            />
                            <div
                              onClick={toggle2fa}
                              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                            ></div>
                          </label>
                        )}
                      </td>
                    </tr>

                    <tr className="border-b border-[#EAECF0] w-full md:block grid py-[1.5rem] gap-2">
                      <td className="text-[#ffffff] font-[500] md:py-[1.5rem] w-[280px]">
                        Multifactor Authentication Setup?
                      </td>
                      <td>
                        {multiFAInfo?.isSetup ? (
                          <ImCheckboxChecked className="cursor-pointer text-primary-color" />
                        ) : (
                          <ImCheckboxUnchecked
                            className="cursor-pointer text-primary-color"
                            onClick={() => {
                              setModal("multiFAQrModal");
                              setUpMFA();
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  </table>
                  <div className="flex justify-end mt-[2.5rem] gap-5">
                    <button className="border border-[#D0D5DD] py-2 px-5 rounded-[8px] text-[#ffffff]">
                      Cancel
                    </button>
                    {loading ? (
                      <button className="bg-primary-color py-2 px-[30px] rounded-[8px] text-white">
                        <img
                          src="./images/loader.gif"
                          className="w-[20px]"
                          alt=""
                        />
                      </button>
                    ) : (
                      <button
                        className="bg-primary-color py-2 px-5 rounded-[8px] text-white"
                        onClick={passwordUpdate}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {modal === "verify-code" && (
        <div>
          <div
            className="h-full w-full fixed top-0 left-0 z-[99]"
            style={{ background: "rgba(14, 14, 14, 0.58)" }}
            onClick={() => setModal(false)}
          ></div>
          <div
            className="bg-white fixed top-[50%] left-[50%] z-[100] rounded-[8px]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="bg-white p-10" style={{ borderRadius: "10px" }}>
              <p className="text-center text-gray-500 text-[14]">
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
                  onClick={verifyMFACode}
                >
                  Verify code
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {modal === "multiFAQrModal" && (
        <div>
          <div
            className="h-full w-full fixed top-0 left-0 z-[99]"
            style={{ background: "rgba(14, 14, 14, 0.58)" }}
            onClick={() => setModal(false)}
          ></div>
          <div
            className="bg-white fixed top-[50%] left-[50%] z-[100] rounded-[8px]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="bg-white p-10" style={{ borderRadius: "10px" }}>
              {multiFAInfoSetUp && (
                <div>
                  <QRCode
                    size={120}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={multiFAInfoSetUp?.secret}
                    viewBox={`0 0 256 256`}
                  />
                  <div className="flex items-center justify-between mt-6 border px-2 rounded">
                    <p className="border-r mr-4 pr-4">
                      {multiFAInfoSetUp?.secret}
                    </p>
                    <IoCopyOutline
                      onClick={() => {
                        navigator.clipboard.writeText(multiFAInfoSetUp?.secret);
                        setMsg("Secret copied successfully!");
                        setAlertType("success");
                      }}
                      className="cursor-pointer text-gray-500"
                    />
                  </div>
                  <button
                    onClick={() => setModal("verify-code")}
                    className="bg-primary-color text-white py-[6px] px-8 rounded-[6px] mt-5 w-full text-[14px] lgtext-[16px]"
                  >
                    Verify Code
                  </button>
                </div>
              )}
              {qrLoading && (
                <div
                  className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col"
                  style={{ padding: "2rem", textAlign: "center" }}
                >
                  <img
                    src="./images/loader.gif"
                    style={{
                      height: "30px",
                      width: "30px",
                      margin: "12px auto 30px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {saveCardModal && <SaveCardModal setSaveCardModal={setSaveCardModal} />}
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
      {revealPrivateKey && (
        <div>
          <div
            className="h-full w-full fixed top-0 left-0 z-[99]"
            style={{ background: "rgba(14, 14, 14, 0.58)" }}
            onClick={() => setRevealPrivateKey(false)}
          ></div>
          <div
            className="bg-white lg:w-[500px] w-[90%] fixed top-[50%] left-[50%] z-[100] rounded-[8px]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {/* <div className="w-full bg-gradient-to-r from-primary-color to-blue-400 text-white p-4 rounded-t-[8px] flex flex-col items-start">
                      <p className="text-sm">Task 04</p>
                      <p className="text-2xl font-bold mt-2">Make your first deposit</p>
                  </div> */}
            <img
              src="./images/caution.svg"
              alt=""
              className="rounded-t-[11px] w-full"
            />
            {/* <div className='flex items-center justify-between mt-7 px-4 md:px-8'>
                      <div className='flex items-center gap-1 py-2 px-4 bg-[#899EFD1A]'>
                          <BsLightningChargeFill className='text-primary-color'/>
                          <p className='text-primary-color text-[10px]'>Task 01 </p>
                      </div>
                      <div className='bg-[#899EFD1A] inline-flex items-center rounded-md'>
                          <div className='flex items-center gap-1 border-r border-gray-300 py-2 px-4'>
                              <img src="./images/tag-user.svg" alt="" />
                              <p className='text-primary-color text-[10px]'>139181 Participants</p>
                          </div>
                          <div className='flex items-center gap-1 py-2 px-4'>
                              <img src="./images/cup-colored.svg" alt="" />
                              <p className='text-primary-color text-[10px]'>20 Tiers</p>
                          </div>
                      </div>
                  </div> */}
            <div className="md:px-8 px-4 mt-7 mb-[4rem] text-center">
              <p className="text-[18px] lg:text-[20px] text-[#F7931A] font-[500]">
                Caution:{" "}
              </p>
              <p className="text-[#414553] lg:text-[14px] text-[12px] font-[500]">
                Exporting your private key will reveal sensitive information
                about your wallet. Ensure you store it securely and never share
                it with anyone. Losing your private key may result in the
                permanent loss of your assets.
              </p>
            </div>
            <input
              type="text"
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Provide your pin code"
              className="md:w-[80%] w-[90%] mx-auto block border border-[#D0D5DD] px-[14px] py-[10px] rounded-[8px] shadow-sm outline-none text-[#000000]"
            />
            <div className="flex flex-col items-center mt-10 gap-4 md:w-[80%] w-[90%] mx-auto mb-[2rem]">
              {loader ? (
                <BtnLoader />
              ) : (
                <button
                  onClick={exportPrivateKey}
                  className="bg-primary-color text-white py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]"
                >
                  Yes, I understand
                </button>
              )}

              <button
                onClick={() => setRevealPrivateKey(false)}
                className="bg-[#EEEFF0] text-[#0C0C0C] py-2 px-8 rounded-[6px] w-full text-[14px] lgtext-[16px]"
              >
                No Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default Settings;
