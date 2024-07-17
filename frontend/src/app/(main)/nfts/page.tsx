"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import NFTCard from "@/lib/components/card/NFTCard";

import { setNFTAppData } from "@/lib/store/nft/nft-slice";

export type NFTData = {
  tokenId: number;
  name: string;
  description: string;
  image: string;
};

const NFTPage: React.FC = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [nftData, setNftData] = React.useState<NFTData[] | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (address: string) => {
      const response = await fetch("/api/nfts", {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.nftData);
      dispatch(setNFTAppData(data.nftData));
      setNftData(data.nftData);
    };

    if (address && isConnected) {
      console.log(address);
      fetchData(address);
    }
  }, []);

  return (
    <div className="mt-40 text-white">
      <h2>Your NFTs</h2>
      <div className="mt-10 flex flex-wrap gap-3">
        {nftData?.map((nft, index) => (
          <NFTCard nft={nft} key={index} />
        ))}
      </div>
    </div>
  );
};

export default NFTPage;
