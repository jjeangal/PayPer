interface CalculateRatingParams {
  totalRating: bigint;
  amountOfRatings: bigint;
}

function calculateRating({
  totalRating,
  amountOfRatings,
}: CalculateRatingParams): number {
  const numberTotalRating = Number(totalRating);
  const numberAmountOfRatings = Number(amountOfRatings);
  if (!numberTotalRating || !numberAmountOfRatings) {
    return 0;
  }
  return Number((numberTotalRating / numberAmountOfRatings).toFixed(2));
}

export default calculateRating;