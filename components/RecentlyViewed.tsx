'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { GameMeta } from '@/types/game'

const STORAGE_KEY = 'rules-lawyer:recently-viewed'

interface RecentlyViewedProps {
  games: GameMeta[]
}

export default function RecentlyViewed({ games }: RecentlyViewedProps) {
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setSlugs(raw ? JSON.parse(raw) : [])
    } catch {
      // localStorage unavailable
    }
  }, [])

  const recent = slugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter(Boolean) as GameMeta[]

  if (recent.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
        Recently Viewed
      </h2>
      <div className="flex flex-wrap gap-2">
        {recent.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {game.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
