import { gql } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { useEffect, useState } from 'react';

interface UseCheckPurchaseExistsParams {
  client: ApolloClient<object>;
  articleId: number;
  userAddress: string;
}

async function useCheckPurchaseExists({
  client,
  articleId,
  userAddress 
}: UseCheckPurchaseExistsParams): Promise<Boolean> {
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
    return false;
}

export default useCheckPurchaseExists;