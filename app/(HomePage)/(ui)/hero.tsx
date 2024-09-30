import { CryptoPrices } from "../../../components/CryptoPrices";


import { fetchNews, NewsArticle } from "@/components/CryptoNews";
import { fetchNftInfo, NftInfo } from "@/components/Nfts";
import TypedAnimation from "@/components/TypedAnimation";

const Hero = async () => {
  // Fetching data directly in the server component
  //CLIENTSIDE OLANLARIN HEPSINI TYPED ANIMATONDA NASIL YAPILMISSA OYLE YAP

  const newsArticles: NewsArticle[] = await fetchNews();
  const nftInfos: NftInfo[] = await fetchNftInfo();

  // Render the component directly with fetched data
  return (
    <section className=" flex justify-between   max-w-section  h-lvh   mx-auto text-white  ">
      <div className="w-full flex justify-between">
        <div className=" pt-[90px] ">
          <p className="text-[64px] "> Earn with Crypto</p>
          <p>
            <TypedAnimation />
          </p>

          <p className="text-lg font-semibold">
            Start Today And Begin Earning Rewards Up To
          </p>
          <p className="text-xl font-bold">500 USDT</p>
          <div className="flex gap-4 mt-12">
            <input
              type="text"
              placeholder="Email/Phone number"
              className="w-[300px] h-[40px] rounded-[10px] border-2 border-[#549366] placeholder-gray-500 bg-[#000000] px-4"
            />
            <button
              className="text-button-Text bg-[#dbddda]   hover:bg-button-Hover hover:border-b-button-HoverSecondary
           border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className=" w-[542px] h-[211px] rounded-[20px] bg-[#1A1E24] mt-[75px]  ">
          <div className=" flex justify-between mx-6 my-5">
            <p className="text-[16px]">Trending</p>
            <p className="text-[15px]">view more</p>
          </div>
         
         <CryptoPrices/>

          <div className="text-sm w-[542px] h-[181px] rounded-[20px] bg-[#1A1E24] mt-24">
            <div className="pt-4 pl-6">
              <p className=" mb-4 text-[16px] font-bold">News</p>
              {newsArticles.map((article, index) => (
                <div key={index}>
                  <p>{article.title}</p>
                  {index < newsArticles.length - 1 && <br />}{" "}
                </div>
              ))}
            </div>
          </div>

          {/* NFT Section */}
          <div className="text-sm w-[542px] h-[130px] rounded-[20px] bg-[#1A1E24] mt-8 pt-3 overflow-x-auto">
            <div className="flex space-x-4 items-center pl-9">
              {nftInfos.map((nft, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <img
                    src={nft.image_url}
                    alt={nft.name}
                    className="w-[65px] h-[65px] mb-2 rounded-lg"
                  />
                  <p className="text-white text-xs w-[60px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {nft.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
