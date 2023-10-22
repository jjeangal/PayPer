import {  ApolloClient, gql } from "@apollo/client";
import { useEffect, useState } from 'react';
import {ArticleData} from '@/types';

interface UseGetArticlesFromJournalistParams {
  client: ApolloClient<object>;
  journalistId: string;
}

interface UseGetArticlesFromJournalistResponse {
  isLoading: Boolean;
  articles: ArticleData[];
}

/**
* Fetches the information about the articles of a journalist
*/
const useGetArticlesFromJournalist = ({
  client,
  journalistId,
}: UseGetArticlesFromJournalistParams): UseGetArticlesFromJournalistResponse => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

useEffect(() => {
  async function fetchData() {
    try {
      const result = await client.query({
        query: gql`
          query {
            articles(where: {journalist: "${journalistId}"}) {
              id
              name
              freeContent
              encryptedUrl
              totalRating
              amountOfRatings
              price
              totalPaymentReceived
              date
              newsType
            }
          }
        `,
      });
      const data = result.data.articles;

      const responseArticles: ArticleData[] = data 
        ? data.map((articleData: any) => ({
          id: articleData.id,
          name: articleData.name,
          freeContent: articleData.freeContent,
          encryptedUrl: articleData.encryptedUrl,
          totalRating: articleData.totalRating,
          amountOfRatings: articleData.amountOfRatings,
          price: articleData.price,
          totalPaymentReceived: articleData.totalPaymentReceived,
          date: articleData.date,
          newsType: articleData.newsType,
        })) 
        : [];
      setArticles(responseArticles);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  fetchData();
}, []);
    
  return {
    isLoading,
    articles,
  };
};

export default useGetArticlesFromJournalist;
