"use client";
import React from "react";
import { Provider } from "react-redux";

import store from "@/lib/store";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
