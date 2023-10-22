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
