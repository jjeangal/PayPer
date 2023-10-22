import { gql } from "@apollo/client";
import { getArticlesQuery } from "../queries";
import { ArticleData } from "@/types";
import { ApolloClient } from "@apollo/client";

interface UseGetArticleByIdParams {
  client: ApolloClient<object>;
  articleId: number;
}

async function useGetArticleById({ client, articleId }: UseGetArticleByIdParams): Promise<ArticleData> {
  const result = await client.query({
    query: gql`
      query {
        article(id: "${articleId}") {
          id
          name
          freeContent
          journalist
          encryptedUrl
          price
          date
          newsType
          imageUrl
        }
      }
    `,
  })

  const article = result.data.article;
  return article;
}

export default useGetArticleById;