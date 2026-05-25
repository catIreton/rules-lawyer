import { getAllGames } from '@/lib/games'
import GameSearch from '@/components/GameSearch'
import RecentlyViewed from '@/components/RecentlyViewed'

export default function Home() {
  const games = getAllGames()

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Board Game Rules,{' '}
          <span className="text-amber-600 dark:text-amber-400">Actually Readable</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Quick reference sheets for your favourite games. Search by name, tag, or category — find
          the rule you need in seconds.
        </p>
      </div>

      <RecentlyViewed games={games} />

      <GameSearch games={games} />
    </div>
  )
}
