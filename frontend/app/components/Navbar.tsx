import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className=" bg-BackgroundPrimary h-16  ">
        <div className="flex justify-between items-center   w-navbar max-w-[1036px]  h-full mx-auto ">
          {/* //logo */}
          <div className="flex  items-center ">
            <Image
              src="/images/group.svg"
              width={500}
              height={500}
              alt="Picture of the logo"
              priority
              style={{ width: "30px", height: "auto" }}
            />
            <span className=" text-textPrimary  text-center text-xl font-semibold pl-2 mt-1">
              COLD
            </span>
          </div>
          {/* //buttons */}
          <div className="flex gap-4">
            <button
              className="text-button-Text bg-button-Primary    hover:bg-button-Hover hover:border-b-button-HoverSecondary
             border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold"
            >
              Signin
            </button>
            <button
              className="text-button-Text  bg-button-Primary   hover:bg-button-Hover hover:border-b-button-HoverSecondary
             border-b-4 rounded-md border-b-button-Secondary  px-6 py-1.5 text-xs font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
