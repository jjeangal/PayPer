import { gql } from "@apollo/client";
import { getArticlesQuery } from "../queries";
import { ArticleData } from "@/types";
import { ApolloClient } from "@apollo/client";

interface UseGetArticlesParams {
  client: ApolloClient<object>;
}

async function useGetArticles({ client }: UseGetArticlesParams): Promise<ArticleData[]> {
  const result = await client.query({
    query: gql(getArticlesQuery),
  })

  const articles = result.data.articles;
  return articles;
}

export default useGetArticles;