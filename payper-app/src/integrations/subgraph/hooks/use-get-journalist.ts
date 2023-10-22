
import {  ApolloClient, gql } from "@apollo/client";
import { useEffect, useState } from 'react';
import {JournalistData} from '@/types';

interface UseGetJournalistParams {
  client: ApolloClient<object>;
  journalistId: string;
}

interface UseGetJournalistResponse {
  isLoading: Boolean;
  journalist?: JournalistData;
}

/**
* Fetches the information about a journalist
*/
const useGetJournalist = ({
  journalistId,
  client,
}: UseGetJournalistParams): UseGetJournalistResponse => {
  const [journalist, setJournalist] = useState<JournalistData>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

useEffect(() => {
  async function fetchData() {
    try {
      const result = await client.query({
        query: gql`
          query {
            journalists(where: {id: "${journalistId}"}) {
              id
              name,
              description,
              totalRating,
              amountOfRatings,
            }
          }
        `,
      });
      const data = result.data.journalists[0];

      const responseJournalist: JournalistData | undefined = data 
        ? {
          id: data.id,
          name: data.name,
          description: data.description,
          totalRating: data.totalRating,
          amountOfRatings: data.amountOfRatings,
        }
        : undefined;
      setJournalist(responseJournalist);
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
    journalist,
  };
};

export default useGetJournalist;
