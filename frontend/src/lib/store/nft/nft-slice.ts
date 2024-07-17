import { createSlice } from "@reduxjs/toolkit";

import type { NFTData } from "@/app/(main)/nfts/page";

const initialState = (): NFTData[] => [];

const nftSlice = createSlice({
  name: "nftAppData",
  initialState,
  reducers: {
    setNFTAppData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setNFTAppData } = nftSlice.actions;

const nftReducer = nftSlice.reducer;

export { nftReducer };
