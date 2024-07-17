import React from "react";

import NFTMintCard from "@/lib/components/card/NFTMintCard";

const MintPage: React.FC = () => {
  return (
    <div className="mt-40 text-white">
      <h2>Mint NFT</h2>
      <div className="mt-10">
        <NFTMintCard />
      </div>
    </div>
  );
};

export default MintPage;
