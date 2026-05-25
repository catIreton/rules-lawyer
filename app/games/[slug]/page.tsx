import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getGameBySlug, getAllGameSlugs } from '@/lib/games'
import { getDifficultyColor } from '@/lib/difficulty'
import Breadcrumb from '@/components/Breadcrumb'
import TrackView from '@/components/TrackView'
import PrintButton from '@/components/PrintButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = await getGameBySlug(slug)
  if (!game) return { title: 'Game not found' }
  return {
    title: `${game.title} — Rules Lawyer`,
    description: game.summary,
  }
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params
  const game = await getGameBySlug(slug)

  if (!game) notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <TrackView slug={slug} />

      <div>
        <Breadcrumb crumbs={[{ label: 'All Games', href: '/' }, { label: game.title }]} />

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {game.title}
          </h1>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}
          >
            {game.difficulty}
          </span>
        </div>

        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{game.summary}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>👥 {game.players} players</span>
          <span>⏱ {game.duration}</span>
          <span>🎲 {game.category}</span>
        </div>

        {game.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {game.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 px-2 py-1 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <article
        className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-table:text-sm"
        dangerouslySetInnerHTML={{ __html: game.content }}
      />

      <div className="no-print pt-4">
        <PrintButton />
      </div>
    </div>
  )
}
