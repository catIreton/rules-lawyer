import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllGames } from '@/lib/games'
import GameList from '@/components/GameList'
import Breadcrumb from '@/components/Breadcrumb'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const games = getAllGames()
  const tags = [...new Set(games.flatMap((g) => g.tags))]
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded} Games — Rules Lawyer`,
    description: `Browse all board games tagged with "${decoded}".`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const all = getAllGames()
  const games = all.filter((g) => g.tags.includes(decoded))

  if (games.length === 0) notFound()

  return (
    <div className="space-y-8">
      <div>
        <Breadcrumb crumbs={[{ label: 'All Games', href: '/' }, { label: `#${decoded}` }]} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Games tagged{' '}
          <span className="text-blue-600 dark:text-blue-400">#{decoded}</span>
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {games.length} game{games.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <GameList games={games} />
    </div>
  )
}
