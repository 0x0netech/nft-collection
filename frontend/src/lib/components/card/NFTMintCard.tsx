"use client";
import { useState } from "react";
import axios from "axios";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";

import { NFT_CONTRACT_ADDRESS } from "@/lib/web3/config";
import NFT_CONTRACT_ABI from "@/lib/web3/abi/TestNFT.json";
import { BackgroundGradient } from "../background/BackgroundGradient";

const NFTMintCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  function createNFTFormDataFile(
    name: string,
    description: string,
    file: File
  ) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);

    return formData;
  }

  async function uploadFileToIPFS(formData: FormData) {
    const data = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  }

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      if (!event.target.files[0]) return;
      setFile(event.target.files[0]);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  async function createNft(metadataUrl: string) {
    if (walletProvider === undefined) {
      console.error("walletProvider is undefined");
      return;
    }

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    console.log(signer);

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );
    const transaction = await nftContract.mintNFT(metadataUrl);
    console.log(transaction);
    const tx = await transaction.wait();

    return tx;
  }

  const handleMintClick = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    try {
      if (!file || isLoading) return;
      setIsLoading(true);
      const formData = createNFTFormDataFile(name, description, file);
      const response = await uploadFileToIPFS(formData);

      console.log(response.data.data);
      const tx = await createNft(response.data.data);

      if (tx) {
        alert("NFT minted!");
      }
      setFileUrl("");
      //reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundGradient containerClassName="max-w-[650px] mx-auto ">
      <div className="flex flex-col rounded-md p-5">
        <label
          htmlFor="dropzone-file"
          className="py-2 w-full flex flex-col items-center justify-center border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200"
        >
          {fileUrl ? (
            <img className="max-w-[400px]" src={fileUrl} alt="Preview" />
          ) : (
            <div className="flex flex-col items-center justify-center py-5">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 px-4 text-xl text-gray-500">
                <span className="font-semibold">Upload Images</span>
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={onFileChange}
          />
        </label>
        <div className="flex flex-col gap-y-2 mt-4 text-gray-700">
          <input
            type="text"
            className="p-2 rounded-md"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            className="p-2 rounded-md"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="p-[3px] relative"
            onClick={() => handleMintClick({ name, description })}
            disabled={isLoading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="min-h-[40px] px-8 py-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              {isLoading ? (
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      ></animateTransform>
                    </path>
                  </svg>
                </span>
              ) : (
                <span>Mint NFT</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default NFTMintCard;
