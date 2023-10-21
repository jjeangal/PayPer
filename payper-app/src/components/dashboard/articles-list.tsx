import { ArticleData } from "@/types";
import { calculateRating } from "@/lib";


interface ArticlesListProps {
    articles: ArticleData[];
}

function ArticlesList({
    articles,
}: ArticlesListProps): JSX.Element {
    return (
        <div className="space-y-8">
            {articles.map(article => {
                const {
                    name,
                    totalRating,
                    amountOfRatings,
                    price,
                    totalPaymentReceived,
                    date,
                } = article;
                const rating = calculateRating({
                    totalRating,
                    amountOfRatings,
                }).toString();
                const dateString = (new Date(Number(date) * 1000)).toLocaleDateString();
                return (
                    <div className="flex items-center">
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{name}</p>
                            <p className="text-sm text-muted-foreground">
                                {`Rating ${rating} • Price ${price} wei • ${dateString}`}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+{totalPaymentReceived.toString()} wei</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ArticlesList