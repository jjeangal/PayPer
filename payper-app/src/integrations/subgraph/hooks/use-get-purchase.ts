import { gql } from "@apollo/client";
import { getArticlesQuery } from "../queries";
import { ApolloClient } from "@apollo/client";

interface UseGetPurchaseParams {
  client: ApolloClient<object>;
  articleId: number;
  userAddress: string;
}

async function useGetPurchase({ client, articleId, userAddress }: UseGetPurchaseParams): Promise<boolean> {
  const result = await client.query({
    query: gql`
      query {
        purchases(where: {articleId: "${articleId}", purchaser: "${userAddress}"}) {
          price
          id
          articleId
          purchaser
        }
      }
    `,
  })

  const purchases = result.data.purchases;
  if (purchases.length > 0) return true;
  else return false;
;
}

export default useGetPurchase;