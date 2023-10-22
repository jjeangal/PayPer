import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useMemo } from 'react';
import payperAbi from '../../abis/payper-abi';
import { payperAddress } from '../../config';
import { UseWriteTransactionResponse } from '../../../../types';

interface UseBuyArticleParams {
  articleId: bigint;
  price: bigint;
}

/**
* Buy an article
*/
const useBuyArticle = ({
  articleId,
  price,
}: UseBuyArticleParams): UseWriteTransactionResponse => {
  console.log("PRICE", price)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: payperAddress,
    abi: payperAbi,
    functionName: 'buyArticle',
    args: [articleId],
    value: price,
  });

  const {
    data,
    write,
    error,
    isError,
  } = useContractWrite(config);

  console.log(error);

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

export default useBuyArticle;
