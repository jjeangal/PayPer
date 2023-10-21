import { subgraphUrl } from "../../config";
import useGetAllArticles from "./use-get-all-articles";
import useGetArticle from "./use-get-article";
import useGetCurrentArticleId from "./use-get-current-article-id";
import useGetJournalist from "./use-get-journalist";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import useGetArticlesFromJournalist from './use-get-articles-from-journalist';
import useGetGraphJournalist from './use-get-graph-journalist';

const client = new ApolloClient({
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});


export {
  client,
  useGetArticle,
  useGetJournalist,
  useGetCurrentArticleId,
  useGetAllArticles,
  useGetArticlesFromJournalist,
  useGetGraphJournalist,
}