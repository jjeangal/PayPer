import { ArticleData } from '@/types'
import ArticlePreview from './article-preview'

export default function MoreStories({ articles }: { articles: ArticleData[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {articles.map((article: ArticleData) => (
          <ArticlePreview
            key={article.id}
            id={Number(article.id)}
            title={article.name}
            date={article.date}
            coverImage={article.imageUrl}
            journalist={article.journalist}
            excerpt={article.freeContent}
            newsType={article.newsType}
          />
        ))}
      </div>
    </section>
  )
}