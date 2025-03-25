"use client";

import React, { useEffect, useState } from "react";
import SideNav from "../components/side-nav/SideNav";
import TopNav from "../components/top-nav/TopNav";
import SavingsCard from "../components/savings-card/SavingsCard";
import SaveCardModal from "../components/save-card-modal/SaveCardModal";
import Cookies from "js-cookie";
import SavingsCardLoader from "../components/loader/SavingsCardLoader";

const Savings = () => {
  const [walletInfo, setWalletInfo] = useState();
  const [saveCardModal, setSaveCardModal] = useState(false);
  const [loadingWalletAssets, setLoadingWalletAssets] = useState(false);

  const user = Cookies.get("token");

  async function getMyAssets() {
    const storedWalletAssets = localStorage.getItem("walletAssets");
    const parsedWalletAssets = JSON.parse(storedWalletAssets);

    if (parsedWalletAssets) {
      setWalletInfo(parsedWalletAssets);
    }
    if (!parsedWalletAssets) {
      setLoadingWalletAssets(true);
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/horizonQueries/getAllWalletAssets/ngn`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch user assets");
      setWalletInfo(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingWalletAssets(false);
    }
  }

  useEffect(() => {
    getMyAssets();
  }, []);

  return (
    <div>
      <div className="flex items-start">
        <SideNav />
        <div className="w-full lg:w-[84%] ml-auto mb-10">
          <TopNav />
          <div className="lg:px-[10px] pb-[30px] pt-[10px] mt-5 lg:mx-[30px] ">
            <div className="lg:px-[10px]">
              <div className="lg:bg-[#C7C7C71F]  rounded-[11px] w-full py-[30px] px-[10px] border-transparent lg:shadow-[inset_5px_0px_10px_black,inset_-5px_0px_10px_#E1E1E1]">
                <div className="w-[70%] lg:mb-20 mb-5">
                  <p className="lg:text-[32px] text-[20px] text-primary-color">
                    Our tokens and reward rates
                  </p>
                  <p className="text-[#5D5D5D] font-[300] lg:text-[14px] text-[12px] mt-3">
                    You are free ton choose which currency you want to save in.
                    All currencies have a yield feature.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-[2rem]  lg:pt-[12rem] pb-[6rem] lg:px-6 ">
                  {loadingWalletAssets ? (
                    <div>
                      <SavingsCardLoader />
                      <SavingsCardLoader />
                    </div>
                  ) : (
                    walletInfo?.yieldWalletAssets?.map((item, index) => {
                      return (
                        <div key={index}>
                          <SavingsCard
                            item={item}
                            setSaveCardModal={setSaveCardModal}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {saveCardModal && <SaveCardModal setSaveCardModal={setSaveCardModal} />}
    </div>
  );
};

export default Savings;
