import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className=" bg-BackgroundPrimary h-16  ">
        <div className="flex justify-between items-center w-3/4  h-full mx-auto ">
          {/* //logo */}
          <div className="flex  items-center ">
            <Image
              src="/images/group.svg"
              width={500}
              height={300}
              alt="Picture of the logo"
              priority
              style={{ width: "30px", height: "auto" }}
            />
            <span className=" text-textPrimary  text-center  ">COLD</span>
          </div>
          {/* //buttons */}
          <div>
            <button className="text-textPrimary ">v</button>
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 h-screen"></div>
    </div>
  );
};
export default Navbar;
