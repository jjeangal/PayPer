import { ArticleData, CalculateDashboardInformationResponse } from '@/types'
import { calculateRating, weiToEth } from '.';

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
  const totalRevenue = articleRevenues.reduce((sum, articleRevenue) => sum + articleRevenue, BigInt(0));

  return {
    totalRevenue: weiToEth(totalRevenue),
    averageArticleRating,
  };
}

export default calculateDashboardInformation  