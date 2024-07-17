import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC as string,
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: "auto",
    },
  },
  etherscan: {
    apiKey: "CIG9XDBG973248MQURFYWE916C2EQFV6UB",
  },
};

export default config;
