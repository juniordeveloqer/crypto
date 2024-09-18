import React from "react";
import Image from "next/image";
import simplicty from "@/public/images/simplicty.svg";
import secure from "@/public/images/secure.svg";
import earn from "@/public/images/earn.svg";

const WhyCold = () => {
  return (
    <section className="min-h-lvh bg-black text-[#ffffff] ">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-center  text-[40px] pt-12 font-semibold">
          Why Cold?
        </h1>
        <div className="flex mt-24  justify-center gap-[110px]">
          <Image
            src={simplicty}
            alt="Picture of the author"
          
          />
          <Image
            src={earn}
            alt="Picture of the author"
           
          />
          <Image
            src={secure}
            alt="Picture of the author"
        
          />
        </div>
        <div className="flex mt-24 justify-center gap-[170px] ">
          <div>
            <h1 className="text-center text-[32px] font-semibold">
              Simplicity
            </h1>
            <p className="text-center text-[20px]">
              Kraken makes it easy to buy <br />
              crypto
            </p>
          </div>
          <div>
            <h1 className="text-center text-[32px] font-semibold">Earn</h1>
            <p className="text-center text-[20px]">
              The ultimate destination 
              for <br />earning money, 
              this platform <br />sets the 
              standard for <br />excellence.
            </p>
          </div>
          <div>
            <h1 className="text-center text-[32px] font-semibold">Secure</h1>
            <p className="text-center text-[20px]">
              This platform ensures 
              top-<br />notch security 
              for all users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyCold;
