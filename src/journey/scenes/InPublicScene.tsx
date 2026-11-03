import { useState } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import devto from '../../data/devto.json';
import youtube from '../../data/youtube.json';
import { book } from '../../data/book';
import { useScrubbedCount } from '../useScrubbedCount';
import type { SceneProps } from './types';

interface CardData {
  kind: string;
  title: string;
  image?: string;
}

const articles = devto.articles.slice(0, 3);
const CARDS: CardData[] = [
  { kind: 'DEV', title: articles[0]?.title ?? '' },
  { kind: 'Video', title: youtube.videos[0]?.title ?? '' },
  { kind: 'Book', title: `${book.title} — ${book.subtitle}`, image: book.cover },
  { kind: 'DEV', title: articles[1]?.title ?? '' },
  { kind: 'DEV', title: articles[2]?.title ?? '' },
];
const X = [-170, -85, 0, 85, 170];
const ROT = [-9, -4, 0, 4, 9];

const Card = ({ local, index, spread, data }: { local: MotionValue<number>; index: number; spread: number; data: CardData }) => {
  const a = 0.1 + index * 0.1;
  const b = a + 0.22;
  const x = useTransform(local, [a, b], [`${X[index] * 3 * spread}%`, `${X[index] * spread}%`]);
  const y = useTransform(local, [a, b], [`${index % 2 ? -160 : 160}%`, `${Math.abs(index - 2) * 4}%`]);
  const rotate = useTransform(local, [a, b], [ROT[index] * 3, ROT[index]]);
  const opacity = useTransform(local, [a, a + 0.08], [0, 1]);
  return (
    <motion.article
      style={{ x, y, rotate, opacity, zIndex: 10 - Math.abs(index - 2) }}
      className="absolute left-1/2 top-1/2 -ml-[5.5rem] -mt-28 flex h-56 w-44 flex-col overflow-hidden rounded-sm border border-[#f3ede1]/20 bg-[#f3ede1] p-3 text-[#0e0d0b] shadow-2xl"
    >
      <span className="font-monopress text-[9px] uppercase tracking-[0.18em] text-oxblood">{data.kind}</span>
      {data.image && <img src={data.image} alt="" className="mt-2 h-28 w-full object-cover" loading="lazy" />}
      <h3 className={`mt-2 font-editorial font-semibold leading-snug ${data.image ? 'line-clamp-3 text-[11px]' : 'line-clamp-6 text-sm'}`}>{data.title}</h3>
    </motion.article>
  );
};

/** Articles, a video and the book fly in and fan out into a stack, while the counters climb. */
const InPublicScene = ({ local }: SceneProps) => {
  const [spread] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 640 ? 0.45 : 1));
  const nArticles = useScrubbedCount(local, 0.15, 0.75, devto.total);
  const nVideos = useScrubbedCount(local, 0.15, 0.75, youtube.videos.length);
  const nBooks = useScrubbedCount(local, 0.4, 0.5, 1);

  return (
    <div className="relative h-full w-full">
      <div className="relative h-[75%] w-full">
        {CARDS.map((c, i) => (
          <Card key={i} local={local} index={i} spread={spread} data={c} />
        ))}
      </div>
      <dl className="mx-auto mt-2 flex max-w-md justify-center gap-8 font-monopress uppercase tracking-[0.14em]">
        {[
          [nArticles, 'Articles'],
          [nVideos, 'Videos'],
          [nBooks, 'Book'],
        ].map(([n, label]) => (
          <div key={label} className="text-center">
            <dt className="text-[9px] text-[#f3ede1]/50">{label}</dt>
            <dd className="font-display text-2xl font-extrabold tracking-normal text-[#f3ede1]">{n}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default InPublicScene;
