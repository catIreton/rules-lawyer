import Link from 'next/link'
import type { GameMeta } from '@/types/game'
import { getDifficultyColor } from '@/lib/difficulty'
import { getCategoryColor } from '@/lib/categoryColors'

interface GameCardProps {
  game: GameMeta
}

export default function GameCard({ game }: GameCardProps) {
  const categoryGradient = getCategoryColor(game.category)

  return (
    <article
      data-testid="game-card"
      className="group flex flex-col h-full"
    >
      {/* Box art header */}
      <Link href={`/games/${game.slug}`} className="block">
        <div className={`relative h-28 flex flex-col justify-end p-4 bg-gradient-to-br ${categoryGradient} transition-all duration-200 group-hover:brightness-110`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
          <span className="relative text-[10px] font-semibold text-white/70 uppercase tracking-widest mb-1">
            {game.category}
          </span>
          <h2 className="relative text-lg font-bold text-white leading-snug drop-shadow-sm">
            {game.title}
          </h2>
        </div>
      </Link>

      {/* Card body */}
      <Link href={`/games/${game.slug}`} className="flex-1 block bg-amber-50 dark:bg-stone-900 px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getDifficultyColor(game.difficulty)}`}>
            {game.difficulty}
          </span>
          <div className="flex gap-3 text-xs text-stone-500 dark:text-stone-400">
            <span title="Players">👥 {game.players}</span>
            <span title="Duration">⏱ {game.duration}</span>
          </div>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">{game.summary}</p>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 px-4 pb-4 pt-2 bg-amber-50 dark:bg-stone-900 tags">
        {game.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="text-xs bg-amber-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-amber-200 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 px-2 py-0.5 rounded-full transition-colors border border-amber-200/80 dark:border-stone-700"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
