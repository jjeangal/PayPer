import {
  useContractRead, useContractReads
} from 'wagmi';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';
import { ArticleData } from '@/types';
import { useGetCurrentArticleId } from '.';

/**
* Fetches the information about a all articles
*/
const useGetAllArticles = (): ArticleData[] => {

  const currentArticleId = useGetCurrentArticleId();

  const numberArray = Array.from({ length: Number(currentArticleId) }, (_, index) => index);

  const { data } = useContractReads({
    contracts: numberArray.map((id) => ({
      address: payperAddress,
      abi: payperAbi,
      functionName: 'articles',
      args: [id],
    })),
    allowFailure: false,
  });

  const articles: ArticleData[] = data ? data.map((articleData: any) => ({
    id: articleData[0],
    journalist: articleData[1],
    name: articleData[2],
    freeContent: articleData[3],
    encryptedUrl: articleData[4],
    totalRating: articleData[5],
    amountOfRatings: articleData[6],
    price: articleData[7],
    totalPaymentReceived: articleData[8],
    date: articleData[9],
    newsType: articleData[10],
  })) : [];

  return articles;
};

export default useGetAllArticles;
