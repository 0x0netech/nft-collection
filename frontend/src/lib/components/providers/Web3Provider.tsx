"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import React from "react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "42f35e482331756a155c8e073d4113ca";

// 2. Set chains
const mainnet = {
  chainId: 80002,
  name: "Polygon Amoy",
  currency: "MATIC",
  explorerUrl: "https://amoy.polygonscan.com",
  rpcUrl: "https://rpc-amoy.polygon.technology",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children;
}
