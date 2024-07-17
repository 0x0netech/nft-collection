interface Ethereum {
  isMetaMask?: boolean;
  request: (args: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
  // Add other methods and properties as needed
}

interface Window {
  ethereum?: Ethereum;
}
