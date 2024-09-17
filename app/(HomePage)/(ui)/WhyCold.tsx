import React from "react";
import Image from "next/image";
import simplicty from "@/public/images/simplicty.png";
import secure from "@/public/images/secure.png";
import earn from "@/public/images/earn.png";

const WhyCold = () => {
  return (
    <section className="h-full bg-black text-[#ffffff] ">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-center  text-[40px] pt-12 font-semibold">
          Why Cold?
        </h1>
        <div className="flex mt-24  justify-center gap-[110px]">
          <Image
            src={simplicty}
            alt="Picture of the author"
            width={350}
            height={350}
          />
          <Image
            src={earn}
            alt="Picture of the author"
            width={350}
            height={350}
          />
          <Image
            src={secure}
            alt="Picture of the author"
            width={350}
            height={350}
          />
        </div>
        <div className="flex mt-24 justify-center gap-[230px] ">
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
