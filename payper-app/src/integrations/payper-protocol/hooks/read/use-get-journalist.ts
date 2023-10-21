import {
  useContractRead
} from 'wagmi';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';
import {
  Address,
  JournalistData
} from '@/types';

interface UseGetJournalistParams {
  journalistId: Address;
}

/**
* Fetches the information about a specific journalist
*/
const useGetJournalist = ({
  journalistId,
}: UseGetJournalistParams): JournalistData => {
  const {
    data: journalistData,
  } = useContractRead({
    address: payperAddress,
    abi: payperAbi,
    functionName: 'journalists',
    args: [journalistId],
  });

  if (!journalistData) {
    throw new Error('Could not fetch article data');
  }

  const journalist: JournalistData = {
    id: journalistData[0],
    name: journalistData[1],
    description: journalistData[2],
    totalRating: journalistData[3],
    amountOfRatings: journalistData[4],
  }

  return journalist;
};

export default useGetJournalist;
