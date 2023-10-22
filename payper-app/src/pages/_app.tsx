import './globals.css'
import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app';
import {
  configureChains,
  createConfig,
  WagmiConfig,
} from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  foundry,
  polygonMumbai,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
// import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES } from '@web3auth/base';
import Base from '@/components/base';

const inter = Inter({ subsets: ['latin'] })

const {
  chains, publicClient, webSocketPublicClient,
} = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli, foundry, polygonMumbai] : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? 'dummy-key-eth' }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? 'dummy-key-poly' }),
    publicProvider(),
  ],
);

// const web3AuthInstance = new Web3Auth({
//   clientId: "BIB_W2EEUNforW6NFZlk0zrkx-NGgl5CH8k8jTHwBWr2AjD324_1LzIvyZQ_NyUl1CYVsOL4XBBpLBwlB9ecEEo",
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: "0x" + chains[0].id.toString(16),
//     rpcTarget: polygonMumbai.rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorer: polygonMumbai.blockExplorers.default.url,
//   },
//   web3AuthNetwork: "sapphire_mainnet",
// });

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';

const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? 'dummy-key-eth',
    walletConnectProjectId: projectId,
    appName: 'PayPer',
    chains,
    publicClient,
    webSocketPublicClient,
  })
);

export default function MyApp({
  Component, pageProps,
}: AppProps): JSX.Element {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <Base>
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        </Base>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
