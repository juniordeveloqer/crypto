import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section className="w-full">
      {/* Main div */}
      <div className="w-4/5 mx-auto h-screen flex py-20 justify-between  ">
        {/* Left side  */}
        <div>
          {/* Hero text */}
          <div className="flex-col">
            <span className="font-semibold text-[64px]">Earn with Crypto</span>
            {/* Cursor Text */}
            <div className="font-semibold text-[64px]">Fast.</div>
            <span className="block font-semibold text-[20px]">
              Start Today And Begin Earning Rewards Up To
            </span>
            <span className="font-bold text-[24px]">500 USDT</span>
          </div>
          {/* PlaceHolder */}
          <div className="flex gap-2">
            <input
              className=" placeholder:text-slate-400 bg-white  border w-[298px] text-black border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm
               focus:outline-none"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
            <button className="w-[100px] h-[50px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500  bg-button-signup ">
              Sign in
            </button>
          </div>
        </div>

        {/* 
       
       
       
       
       */}

        {/* Right side */}
        <div className="grid  justify-items-end  content-start gap-y-12">
          {/* Coin Box */}
          <div className="w-[540px] h-[210px] bg-Primary  rounded-3xl"></div>
          {/* Coin Box */}
          <div className="w-[540px] h-[160px] bg-Primary rounded-3xl"></div>
          {/* Coin Box */}
          <div className="w-[560px] h-[160px] bg-Primary rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
