import Avatar from '@/components/avatar'
import DateComponent from '@/components/date'
import CoverImage from '@/components/cover-image'
import Link from 'next/link'
import { ArticleData } from '@/types';
import { newsTypeEnum } from '@/lib/';
import { useParams } from 'next/navigation';
import { useCheckPurchaseExists, useGetArticleById } from '@/integrations/subgraph/hooks';
import { useApolloClient } from '@/integrations/subgraph/client';
import { use, useCallback, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Document, Page } from 'react-pdf'
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button"
import { useBuyArticle } from '@/integrations/payper-protocol/hooks/write';

import { RateArticle } from '@/components/rate';
import { useRateArticle } from '@/integrations/payper-protocol/hooks/write';
import { UseRateArticleParams } from '@/integrations/payper-protocol/hooks/write/use-rate-article';

export default function Article() {
  const [article, setArticle] = useState<ArticleData>();
  const  [isArticlePurchased, setIsArticlePurchased] = useState<Boolean>(false);
  const [rating, setRating] = useState<bigint>();
  const params = useParams();
  const client = useApolloClient();
  const { address } = useAccount();

  const fetchArticle = async (articleId: number) => {
    const data = await useGetArticleById({
      client,
      articleId
    });
    const purchaseExists = await useCheckPurchaseExists({
      client,
      articleId,
      userAddress: address?.toString() || '',
    })
    setArticle(data);
    setIsArticlePurchased(purchaseExists);
  }

  const { sendTransaction } = useBuyArticle({
    articleId: article?.id || BigInt(0), 
    price: article?.price || BigInt(0),
  });

  useEffect(() => {
    if (!client) return;
    if (!params) return;
    if (!params.id) return;
    fetchArticle(Number(params.id));
  }, [params]);

  return (
    <section>
      {
        article ? (
          <>
            <div className="mb-8 md:mb-16">
              <CoverImage title={article.name} coverImage={article.imageUrl} slug={Number(article.id)} />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
              <div>
                <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                  <Link
                    href={`/posts/${Number(article.id)}`}
                    className="hover:underline"
                    dangerouslySetInnerHTML={{ __html: article.name }}
                  ></Link>
                </h3>
                <div className="mb-4 md:mb-0 text-lg space-x-4">
                  <DateComponent dateString={new Date(Number(article?.date)).toISOString()} />
                  <div
                    className="text-xs inline-flex font-bold uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
                  >
                    {newsTypeEnum[article.newsType]}
                  </div>
                  <RateArticle articleId={article.id} />
                </div> 
              </div>
              <div>
                <div
                  className="text-lg leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: article.freeContent }}
                />
                <Avatar journalist={article.journalist} />
              </div>
              {isArticlePurchased
                ? (
                  <Document file={article.encryptedUrl} >
                    <Page />
                  </Document>
                ) : (
                  <div>
                    <h1 style={{paddingTop: "30px", fontWeight: "bold"}}>
                      To unlock the full content you must purchase this article.
                    </h1>
                    <div className="mb-4 md:mb-0 text-lg space-x-4" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                      Price: {article.price.toString()} wei
                    </div>
                    <Button
                      onClick={sendTransaction}
                    >
                      Purchase
                    </Button>
                  </div>
                )}
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )
      }
    </section>
  )
}