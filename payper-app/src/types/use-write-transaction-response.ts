import { SendTransactionResult } from '@wagmi/core';

interface UseWriteTransactionResponse {
  sendTransaction: () => void;
  data: SendTransactionResult | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  prepareError: string | null;
  isPrepareError: boolean;
  error: string | null;
  isError: boolean;
  errors: (string | unknown)[];
  isSomeError: boolean;
}

export type { UseWriteTransactionResponse };
