import Avatar from './avatar'
import DateComponent from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import { Address } from '@/types';
import { newsTypeEnum } from '@/lib/';

interface HeroPostProps {
  id: number;
  title: string;
  coverImage: string;
  date: bigint;
  excerpt: string;
  journalist: Address;
  newsType: number;
}

export default function HeroPost({
  id,
  title,
  coverImage,
  date,
  excerpt,
  journalist,
  newsType
}: HeroPostProps) {

  const readableDate = new Date(Number(date)).toISOString();

  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={id} />
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link
              href={`/articles/${id}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg space-x-4">
            <DateComponent dateString={readableDate} />
            <div
              className="text-xs inline-flex font-bold uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
            >
              {newsTypeEnum[newsType]}
            </div>
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar journalist={journalist} />
        </div>
      </div>
    </section>
  )
}