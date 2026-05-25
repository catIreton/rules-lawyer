import type { GameMeta } from '@/types/game'
import GameCard from './GameCard'
import EmptyCubby from './EmptyCubby'

interface GameListProps {
  games: GameMeta[]
  emptyMessage?: string
}

export default function GameList({
  games,
  emptyMessage = 'No games found.',
}: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="bg-gradient-to-b from-sky-600 to-sky-700 dark:from-sky-700 dark:to-sky-800 rounded-lg p-5 shadow-[0_8px_0_#082f49,0_16px_32px_rgba(0,0,0,0.45)]">
        <p className="text-center text-teal-200/70 py-12 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  const emptyCount = games.length % 3 === 0 ? 0 : 3 - (games.length % 3)

  return (
    <div className="bg-gradient-to-b from-sky-600 to-sky-700 dark:from-sky-700 dark:to-sky-800 rounded-lg p-5 shadow-[0_8px_0_#082f49,0_16px_32px_rgba(0,0,0,0.45)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <div key={game.slug} className="relative overflow-hidden rounded-sm">
            <GameCard game={game} />
            {/* Absolute overlay — only way to show inset shadow on top of card content */}
            <div className="absolute inset-0 pointer-events-none rounded-sm shadow-[inset_0_10px_28px_rgba(0,0,0,0.3),inset_5px_0_12px_rgba(0,0,0,0.14),inset_-5px_0_12px_rgba(0,0,0,0.14),inset_0_-3px_8px_rgba(0,0,0,0.08)]" />
          </div>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <EmptyCubby key={`empty-${i}`} index={games.length + i} />
        ))}
      </div>
    </div>
  )
}
