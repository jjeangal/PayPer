import Head from 'next/head'
import Container from '../components/container'
import MoreArticles from '../components/more-articles'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import { ArticleData } from '@/types'
import { ConnectKitButton } from 'connectkit';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useGetArticles } from '@/integrations/subgraph/hooks'
import { useApolloClient } from '@/integrations/subgraph/client'

export default function Index({ preview }: any) {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleData[]>();
  const [heroPost, setHeroPost] = useState<ArticleData>();
  const [moreArticles, setMoreArticles] = useState<ArticleData[]>([]);
  const { address, isDisconnected } = useAccount();
  const client = useApolloClient();

  const fetchArticles = async () => {
    const articles = await useGetArticles({ client });
    setArticles(articles);
    setHeroPost(articles[0])
    setMoreArticles(articles.slice(1))
  }

  useEffect(() => {
    if (articles) {
      setHeroPost(articles[0])
      setMoreArticles(articles.slice(1))
    }
  }, [articles])


  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Next.js Blog Example with Wagmi`}</title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            PayPer.
          </h1>
          <div className="flex md:justify-between space-x-10">
            <Button>+ Create Article</Button>
            {(address && !isDisconnected) && (
              <Button onClick={() => router.push('/dashboard')}>
                My Dashboard
              </Button>
            )}
            <ConnectKitButton />
          </div>
        </section>
        {heroPost && (
          <HeroPost
            title={heroPost.name}
            coverImage="https://images.mirror-media.xyz/publication-images/O-CmyFt2pFJVBvJMk4izE.png?height=2160&width=4320"
            date={heroPost.date}
            journalist={heroPost.journalist}
            id={Number(heroPost.id)}
            excerpt={heroPost.freeContent}
          />
        )}
        {moreArticles.length > 0 && <MoreArticles articles={moreArticles} />}
      </Container>
    </Layout>
  )
}

const sendNotification = async () => {
  try {
    console.log("hjere")
    await fetch('/api/send-notification'); // Replace with your API route path
  } catch (error) {
    console.error('Error:', error);
  }
};