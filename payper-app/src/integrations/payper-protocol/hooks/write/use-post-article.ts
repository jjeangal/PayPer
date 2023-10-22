import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useMemo } from 'react';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';
import { Address, UseWriteTransactionResponse } from '../../../../types';

interface UsePostArticleParams {
  name: string;
  freeContent: string;
  articleUrl: string;
  price: bigint;
  newsType: bigint;
}

/**
* Create a new article
*/
const usePostArticle = ({
  name,
  freeContent,
  articleUrl,
  price,
  newsType
}: UsePostArticleParams): UseWriteTransactionResponse => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: payperAddress,
    abi: payperAbi,
    functionName: 'postArticle',
    args: [
      name,
      freeContent,
      articleUrl,
      price,
      newsType
    ],
  });

  const {
    data,
    write,
    error,
    isError,
  } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const errors: (string | unknown)[] = useMemo(() => {
    let allErrors: (string | unknown)[] = [];
    if (prepareError) {
      allErrors = [...allErrors, prepareError.message];
    }
    if (error) {
      allErrors = [...allErrors, error.message];
    }
    return allErrors;
  }, [prepareError, error]);

  return {
    sendTransaction: write ?? (() => { }),
    data: data ?? undefined,
    isLoading,
    isSuccess,
    prepareError: prepareError?.message ?? null,
    isPrepareError,
    error: error?.message ?? null,
    isError,
    errors,
    isSomeError: isPrepareError || isError,
  };
};

export default usePostArticle;
