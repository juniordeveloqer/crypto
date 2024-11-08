// components/CollectionList.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarToggle from "@/components/StarToggle";
import LoadMoreButton from "@/components/loading/LoadMoreButton";

interface CollectionItemProps {
  collection: any;
}

const CollectionList: React.FC<{ data: CollectionItemProps[] }> = ({ data }) => {
  return (
    <>
      <table className="min-w-full table-auto bg-black text-white rounded-lg shadow-lg">
        {/* Table Headers */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-gray-700 hover:bg-gray-800 transition-all">
              <td className="px-4 py-2 text-left flex items-center">
                <StarToggle index={index} />
                <span className="text-left">{index + 1}</span>
              </td>
              <td className="px-4 py-4 text-left flex items-center">
                <Link href={`/nftrankings/${item.collection.collection}`}>
                  <div className="flex items-center">
                    <Image src={item.collection.image_url} alt={item.collection.name} width={60} height={60} />
                    <div className="ml-2">
                      <span className="truncate text-[16px] font-semibold">{item.collection.name}</span>
                      <div className="text-sm text-gray-400">{item.collection.chain}</div>
                    </div>
                  </div>
                </Link>
              </td>
              {/* Additional Table Data */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Load More Button */}
      <LoadMoreButton currentData={data} />
    </>
  );
};

export default CollectionList;
