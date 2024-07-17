import { Contract, ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import { NFT_CONTRACT_ADDRESS } from "@/lib/web3/config";
import NFT_CONTRACT_ABI from "@/lib/web3/abi/TestNFT.json";
import axios from "axios";

export async function POST(req: any, res: NextResponse) {
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-amoy.g.alchemy.com/v2/g0tks8t6SiV7f0REjcDwoSPnottlAfNC"
  );
  const nftContract = new Contract(
    NFT_CONTRACT_ADDRESS,
    NFT_CONTRACT_ABI,
    provider
  );
  const { address } = await req.json();
  console.log(address);
  const txResposne = await nftContract.getUserNfts(address);

  const nftData = [];
  try {
    for (let i = 0; i < txResposne.length; i++) {
      const tokenAsset = await axios.get(txResposne[i][1]);
      console.log("ddd", tokenAsset.data);
      nftData.push({
        tokenId: parseInt(txResposne[i][0]),
        name: tokenAsset.data.name,
        description: tokenAsset.data.description,
        image: tokenAsset.data.image,
      });
    }
  } catch (error) {
    console.log(error);
  }
  console.log(">>>", nftData);
  return NextResponse.json({
    success: "Ok",
    nftData: nftData,
  });
}
