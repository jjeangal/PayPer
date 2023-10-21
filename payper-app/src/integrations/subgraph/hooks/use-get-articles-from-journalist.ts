import { ArticleData } from '@/types';
import { ApolloClient, gql } from "@apollo/client";

interface UseGetArticlesFromJournalistParams {
  client: ApolloClient<object>;
  journalistId: number;
}

/**
* Fetches the information about the articles of a journalist
*/
const useGetArticleFromJournalist = async ({
  client,
  journalistId,
}: UseGetArticlesFromJournalistParams): Promise<ArticleData[]> => {
  const result = await client.query({
    query: gql`
          query {
            articles(where: {journalist: "${journalistId}"}) {
              id
              name
              freeContent
              journalist
            }
          }
        `,
  });
  const data = result.data.articles;
  const articles: ArticleData[] = data ? data.map((articleData: any) => ({
    id: articleData.id,
    journalist: articleData.journalist,
    name: articleData.name,
    freeContent: articleData.freeContent,
    encryptedUrl: articleData.encryptedUrl,
    totalRating: articleData.totalRating,
    amountOfRatings: articleData.amountOfRatings,
    price: articleData.price,
    totalPaymentReceived: articleData.totalPaymentReceived,
    date: articleData.date,
    newsType: articleData.newsType,
  })) : [];

  return articles;
};

export default useGetArticleFromJournalist;
