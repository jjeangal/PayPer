import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import { Address } from '@/types';
import { newsTypeEnum } from '@/lib/';

interface ArticlePreviewProps {
  id: number;
  title: string;
  coverImage: string;
  date: bigint;
  excerpt: string;
  journalist: Address;
  newsType: number;
}

export default function ArticlePreview({
  id,
  title,
  coverImage,
  date,
  excerpt,
  journalist,
  newsType
}: ArticlePreviewProps) {

  const readableDate = new Date(Number(date)).toISOString();

  return (
    <div>
      <div className="mb-5">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={id} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/articles/${id}`}
          className="hover:underline"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
      </h3>
      <div className="text-lg mb-4 space-x-4">
        <DateComponent dateString={readableDate} />
        <div
          className="text-xs inline-flex font-bold uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
        >
          {newsTypeEnum[newsType]}
        </div>
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Avatar journalist={journalist} />
    </div>
  )
}