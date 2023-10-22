import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import { ConnectKitButton } from 'connectkit';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Base({ children }: any) {
  const { address, isDisconnected } = useAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (address && !isDisconnected) {
      setIsConnected(true);
    }
  }, [address, isDisconnected])

  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{`PayPer`}</title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <Link href="/">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
              PayPer.
            </h1>            
          </Link>
          <div className="flex md:justify-between space-x-10">
            {(isConnected) && (
              <>
                <Button>+ Create Article</Button>
                <Button onClick={() => router.push('/dashboard')}>
                  My Dashboard
                </Button>
              </>
            )}
            <ConnectKitButton />
          </div>
        </section>
        {children}
      </Container>
    </Layout>
  )
}
