import MoreArticles from '../components/more-articles'
import HeroPost from '../components/hero-post'
import { useEffect, useState } from 'react'
import { ArticleData } from '@/types'
import { useGetArticles } from '@/integrations/subgraph/hooks'
import { useApolloClient } from '@/integrations/subgraph/client'
import { Search } from '@/components/search'
import { newsTypeEnum } from '@/lib/';

export default function Index() {
  const [articles, setArticles] = useState<ArticleData[]>();
  const [heroPost, setHeroPost] = useState<ArticleData>();
  const [moreArticles, setMoreArticles] = useState<ArticleData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const client = useApolloClient();

  const fetchArticles = async (filterTerm: string) => {
    const articles = await useGetArticles({ client });
    if (filterTerm === '') {
      setArticles(articles);
      setHeroPost(articles[0])
      setMoreArticles(articles.slice(1))
      return;
    }
    const filteredArticles = articles.filter(article => {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const name = article.name.toLowerCase();
      const journalist = article.journalist.toLowerCase();
      const freeContent = article.freeContent.toLowerCase();
      const category = newsTypeEnum[article.newsType].toLowerCase();
      if (
        name.includes(lowerCaseTerm)
        || journalist.includes(lowerCaseTerm)
        || freeContent.includes(lowerCaseTerm)
        || category.includes(lowerCaseTerm)
      ) {
        return article;
      }
    });
    setArticles(filteredArticles);
    setHeroPost(filteredArticles[0])
    setMoreArticles(filteredArticles.slice(1))
  }

  useEffect(() => {
    if (!client) return;
    fetchArticles(searchTerm);
  }, [client, searchTerm])

  return (
    <>
      <Search
        onSearchInputChange={(term: string) => setSearchTerm(term)}
      />
      {!articles?.length && (
        <p>
          No articles meet this search.
        </p>)}
      {heroPost && (
        <HeroPost
          title={heroPost.name}
          coverImage={heroPost.imageUrl}
          date={heroPost.date}
          journalist={heroPost.journalist}
          id={Number(heroPost.id)}
          excerpt={heroPost.freeContent}
          newsType={heroPost.newsType}
        />
      )}
      {moreArticles.length > 0 && <MoreArticles articles={moreArticles} />}
    </>
  )
}
