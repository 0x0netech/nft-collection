import Header from "@/lib/layout/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] mx-auto min-h-[100vh] px-10">
        {children}
      </div>
    </div>
  );
}
