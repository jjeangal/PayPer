import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import { ConnectKitButton } from 'connectkit';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

export default function Base({ preview, children }: any) {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{`Next.js Blog Example with Wagmi`}</title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            PayPer.
          </h1>
          <div className="flex md:justify-between space-x-10">
            {(address && !isDisconnected) && (
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
