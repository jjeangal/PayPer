import { subgraphUrl } from "../../config";
import useGetAllArticles from "./use-get-all-articles";
import useGetArticle from "./use-get-article";
import useGetCurrentArticleId from "./use-get-current-article-id";
import useGetJournalist from "./use-get-journalist";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});


export {
  client,
  useGetArticle,
  useGetJournalist,
  useGetCurrentArticleId,
  useGetAllArticles
}