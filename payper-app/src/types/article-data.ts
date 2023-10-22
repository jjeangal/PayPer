import { Address } from "./address";

interface ArticleData {
  id: bigint;
  journalist: Address;
  name: string;
  freeContent: string;
  encryptedUrl: string;
  totalRating: bigint;
  amountOfRatings: bigint;
  price: bigint;
  totalPaymentReceived: bigint;
  date: bigint;
  newsType: number;
  imageUrl: string;
}

export default ArticleData;