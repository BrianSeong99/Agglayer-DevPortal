"use client";
import { ReactNode } from "react";
import { WagmiConfig, createConfig, http } from "wagmi";
import { sepolia, cardona } from "./chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const { connectors } = getDefaultWallets({
  appName: "Aggswap",
  projectId: "aggswap-demo",
});

const wagmiConfig = createConfig({
  chains: [sepolia, cardona],
  transports: {
    [sepolia.id]: http(),
    [cardona.id]: http(),
  },
  connectors,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}