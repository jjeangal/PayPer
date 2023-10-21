import { ApolloClient, InMemoryCache } from "@apollo/client";
import { subgraphUrl } from "../config";

function useApolloClient() {
  const client = new ApolloClient({
    uri: subgraphUrl,
    cache: new InMemoryCache(),
  })

  return client;
}


export default useApolloClient;