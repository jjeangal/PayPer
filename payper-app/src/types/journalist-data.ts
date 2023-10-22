import { Address } from "./address";

interface JournalistData {
  id: Address;
  name: string;
  description: string;
  totalRating: bigint;
  amountOfRatings: bigint;
}

export default JournalistData;