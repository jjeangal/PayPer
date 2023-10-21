import {
  useContractRead
} from 'wagmi';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';

/**
* Fetches the current article id
*/
const useGetCurrentArticleId = (): bigint => {
  const {
    data: id,
  } = useContractRead({
    address: payperAddress,
    abi: payperAbi,
    functionName: 'currentArticleId',
  });

  return id ?? BigInt(0);
};

export default useGetCurrentArticleId;
