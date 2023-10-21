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
            coverImage="https://next-blog-wordpress.vercel.app/_next/image?url=https%3A%2F%2Fvercelsolutions.com%2Fwp-content%2Fuploads%2F2022%2F06%2Fhamman-mohamed-C69xTC5q_pE-unsplash-scaled.jpg&w=3840&q=75"
            date={article.date}
            journalist={article.journalist}
            excerpt={article.freeContent}
          />
        ))}
      </div>
    </section>
  )
}