import {
    Address,
    CalculateDashboardInformationResponse,
} from "@/types";
import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    calculateDashboardInformation, 
    calculateRating,
} from "@/lib";
import ArticlesList from "@/components/dashboard/articles-list";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import {
    useGetArticlesFromJournalist, 
    useGetJournalist, 
} from "@/integrations/subgraph/hooks";
import { useApolloClient } from "@/integrations/subgraph/client";

export default function DashboardPage() {
    const router = useRouter();
    const client = useApolloClient();
    const [articlesInformation, setArticlesInformation] = useState<CalculateDashboardInformationResponse>();
    const [journalistRating, setJournalistRating] = useState<number>();
    const { address, isDisconnected } = useAccount();

    const {
        isLoading: areArticlesLoading,
        articles,
    } = useGetArticlesFromJournalist({
        client,
        journalistId: address?.toString() || ''
    });

    const {
        isLoading: isJournalistLoading,
        journalist,
    } = useGetJournalist({
        client,
        journalistId: address || '' as Address
    });


    useEffect(() => {
        if (!address || isDisconnected) {
            router.push('/')
        }
    }, []);

    useEffect(() => {
        if (!isJournalistLoading) {
            const rating = calculateRating({
                totalRating: journalist?.totalRating || BigInt(0),
                amountOfRatings: journalist?.amountOfRatings || BigInt(0),
            })
            setJournalistRating(rating);
        }
    }, [isJournalistLoading]);

    useEffect(() => {
        if (!areArticlesLoading) {
            const articlesInformation = calculateDashboardInformation({
                articles,
            })
            setArticlesInformation(articlesInformation);
        }
    }, [areArticlesLoading]);

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Revenue
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {areArticlesLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="text-2xl font-bold">${articlesInformation?.totalRevenue.toString() || '0'} ETH</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Journalist Rating
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {isJournalistLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="text-2xl font-bold">{journalistRating}</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2" />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {areArticlesLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="text-2xl font-bold">{articles.length}</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Average Article Rating</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {areArticlesLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <div className="text-2xl font-bold">{articlesInformation?.averageArticleRating.toString() || '0'}</div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Your Articles</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {articles.length
                                            ? (
                                                <ArticlesList
                                                    articles={articles}
                                                />
                                            ) : (
                                                <p>You haven't posted any articles yet.</p>
                                            )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}