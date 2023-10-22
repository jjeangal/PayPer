import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import useRateArticle, { UseRateArticleParams } from "@/integrations/payper-protocol/hooks/write/use-rate-article";
import { UseWriteTransactionResponse } from "@/types";

interface RateProps {
    articleId: bigint;
}

export function RateArticle({
    articleId,
}: RateProps) {
    const [rateTerm, setRateTerm] = useState<bigint>(0n);
    const { sendTransaction } = useRateArticle({
        articleId: articleId || BigInt(0), 
        rating: rateTerm || BigInt(0),
    });
    return (
        <div 
            className="flex w-full max-w-ssm items-center space-x-2"
            style={{ paddingBottom: '30px', paddingTop: '20px', marginLeft: "0"  }}
        >   
            <Input
                type="search"
                placeholder="Rating [1-5]"
                className="md:w-[200px] lg:w-[120px]"
                onChange={e => {
                    setRateTerm(BigInt(e.target.value))
                }}
            />
            <Button
                type="submit"
                onClick={() => {
                    sendTransaction()
                }}
            >
                Rate Article
            </Button>
        </div>
    )
} 