import { ArticleData, CalculateDashboardInformationResponse } from '@/types'
import { calculateRating } from '.';
const web3 = require('web3');

interface CalculateDashboardInformationParams {
  articles: ArticleData[];
}

function calculateDashboardInformation({
  articles,
}: CalculateDashboardInformationParams): CalculateDashboardInformationResponse {
  const articleRatings = articles.map(article => {
    return calculateRating({
      totalRating: article.totalRating,
      amountOfRatings: article.amountOfRatings,
    })
  })
  const articleRatingSum = articleRatings.reduce((sum, articleRating) => sum + BigInt(Math.ceil(articleRating)), BigInt(0));
  const averageArticleRating = articleRatingSum && articles.length
    ? articleRatingSum / BigInt(articles.length)
    : BigInt(0);
  const articleRevenues = articles.map(article => article.totalPaymentReceived);
  const totalRevenueInWei = articleRevenues.reduce((sum, articleRevenue) => sum + BigInt(articleRevenue), BigInt(0));
  const totalEthRevenue = web3.utils.fromWei(totalRevenueInWei, 'ether');


  return {
    totalRevenue: parseFloat(totalEthRevenue).toFixed(2),
    averageArticleRating,
  };
}

export default calculateDashboardInformation  