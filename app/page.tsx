"use client";
import EarnMoneyInTheBanck from "@/components/earn-money";
import { ClerkProvider } from "@clerk/nextjs";
export default function Home() {
  return (
    <ClerkProvider>
      <div className="flex justify-center  h-screen  items-center">
        <EarnMoneyInTheBanck />
      </div>
    </ClerkProvider>
  );
}
