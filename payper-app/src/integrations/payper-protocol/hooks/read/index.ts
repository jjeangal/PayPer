import useGetAllArticles from "./use-get-all-articles";
import useGetArticle from "./use-get-article";
import useGetCurrentArticleId from "./use-get-current-article-id";
import useGetJournalist from "./use-get-journalist";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { subgraphUrl } from '../../config';

const client = new ApolloClient({
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});

export {
  useGetArticle,
  useGetJournalist,
  useGetCurrentArticleId,
  useGetAllArticles,
}