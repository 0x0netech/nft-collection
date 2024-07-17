interface Web3Context {
  account: string;
  network: string;
  balance: number;
  connectWallet: () => void;
  marketplaceContract: null;
  nftContract: null;
  isReady: boolean;
  hasWeb3: boolean;
  initializeWeb3: () => void; // Add initializeWeb3 property
}
