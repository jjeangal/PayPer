import {
  useContractRead
} from 'wagmi';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';
import { ArticleData } from '@/types';

interface UseGetArticleParams {
  articleId: bigint;
}

/**
* Fetches the information about a specific article
*/
const useGetArticle = ({
  articleId,
}: UseGetArticleParams): ArticleData => {
  const {
    data: articleData,
  } = useContractRead({
    address: payperAddress,
    abi: payperAbi,
    functionName: 'articles',
    args: [articleId],
  });

  if (!articleData) {
    return {} as ArticleData;
  }

  const article: ArticleData = {
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
  }

  return article
};

export default useGetArticle;
