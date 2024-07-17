"use client";
import Image from "next/image";
import { useState } from "react";

import { BackgroundGradient } from "../background/BackgroundGradient";

import type { NFTData } from "@/app/(main)/nfts/page";

const NFTCard = ({ nft }: { nft: NFTData }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BackgroundGradient containerClassName="!max-w-[350px] !max-h-[500px] w-full ">
      <div className="p-2 overflow-clip relative rounded-md hover:cursor-pointer">
        <div className="w-full h-[60%] overflow-clip">
          <Image
            src={nft.image}
            className="w-full rounded-md object-fill hover:scale-125 transition-all duration-500"
            alt={`NFT ${nft.tokenId}`}
            width={300}
            height={200}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="p-2 text-white">
          <p>Token ID: {nft.tokenId}</p>
          <p className="mt-1">Name:{nft.name}</p>
          <p className="mt-1">Description: {nft.description}</p>
        </div>
        {!isLoaded && <div></div>}
      </div>
    </BackgroundGradient>
  );
};

export default NFTCard;
