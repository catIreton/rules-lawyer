'use client'

import { useState, useMemo } from 'react'
import type { GameMeta } from '@/types/game'
import { createSearchIndex, searchGames } from '@/lib/search'
import {
  applyFilters,
  sortGames,
  uniqueValues,
  hasActiveFilters,
  DEFAULT_FILTERS,
  SORT_LABELS,
  type Filters,
  type SortOption,
} from '@/lib/gameFilters'
import SearchBar from './SearchBar'
import GameList from './GameList'

interface GameSearchProps {
  games: GameMeta[]
}

const selectClass =
  'text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'

export default function GameSearch({ games }: GameSearchProps) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>('az')

  const fuse = useMemo(() => createSearchIndex(games), [games])

  const difficulties = useMemo(() => uniqueValues(games, 'difficulty'), [games])
  const categories = useMemo(() => uniqueValues(games, 'category'), [games])

  const results = useMemo(() => {
    const searched = query.trim() ? searchGames(fuse, query) : games
    return sortGames(applyFilters(searched, filters), sort)
  }, [query, fuse, games, filters, sort])

  function setFilter(key: keyof Filters, value: string) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  const isFiltered = query.trim() || hasActiveFilters(filters)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <SearchBar onSearch={setQuery} />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filters.difficulty}
          onChange={(e) => setFilter('difficulty', e.target.value)}
          aria-label="Filter by difficulty"
          className={selectClass}
        >
          <option value="">All difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          aria-label="Filter by category"
          className={selectClass}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.players}
          onChange={(e) => setFilter('players', e.target.value)}
          aria-label="Filter by player count"
          className={selectClass}
        >
          <option value="">Any players</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={String(n)}>
              {n} player{n !== 1 ? 's' : ''}
            </option>
          ))}
        </select>

        <div className="ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort games"
            className={selectClass}
          >
            {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {isFiltered
          ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
          : `${games.length} game${games.length !== 1 ? 's' : ''} in the library`}
      </p>

      <GameList
        games={results}
        emptyMessage="No games match your search or filters. Try adjusting them."
      />
    </div>
  )
}
