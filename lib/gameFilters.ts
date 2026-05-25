import type { GameMeta } from '@/types/game'

export type SortOption = 'az' | 'za' | 'difficulty-asc' | 'difficulty-desc' | 'duration-asc'

export interface Filters {
  difficulty: string
  category: string
  players: string
}

export const DEFAULT_FILTERS: Filters = { difficulty: '', category: '', players: '' }

export const SORT_LABELS: Record<SortOption, string> = {
  az: 'Name A–Z',
  za: 'Name Z–A',
  'difficulty-asc': 'Easiest first',
  'difficulty-desc': 'Hardest first',
  'duration-asc': 'Shortest first',
}

const DIFFICULTY_ORDER: Record<string, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
  Expert: 3,
}

function parsePlayerRange(range: string): [number, number] {
  const parts = range.replace(/[^\d-]/g, '').split('-').map(Number).filter(Boolean)
  return [parts[0] ?? 1, parts[1] ?? parts[0] ?? 1]
}

export function supportsPlayers(playersStr: string, n: number): boolean {
  const [min, max] = parsePlayerRange(playersStr)
  return n >= min && n <= max
}

export function applyFilters(games: GameMeta[], filters: Filters): GameMeta[] {
  return games.filter((game) => {
    if (filters.difficulty && game.difficulty !== filters.difficulty) return false
    if (filters.category && game.category !== filters.category) return false
    if (filters.players) {
      const n = parseInt(filters.players)
      if (!Number.isNaN(n) && !supportsPlayers(game.players, n)) return false
    }
    return true
  })
}

function parseMinDuration(duration: string): number {
  return parseInt(duration) || 999
}

export function sortGames(games: GameMeta[], sort: SortOption): GameMeta[] {
  const sorted = [...games]
  switch (sort) {
    case 'az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'za':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case 'difficulty-asc':
      return sorted.sort(
        (a, b) => (DIFFICULTY_ORDER[a.difficulty] ?? 0) - (DIFFICULTY_ORDER[b.difficulty] ?? 0)
      )
    case 'difficulty-desc':
      return sorted.sort(
        (a, b) => (DIFFICULTY_ORDER[b.difficulty] ?? 0) - (DIFFICULTY_ORDER[a.difficulty] ?? 0)
      )
    case 'duration-asc':
      return sorted.sort((a, b) => parseMinDuration(a.duration) - parseMinDuration(b.duration))
    default:
      return sorted
  }
}

export function uniqueValues<K extends keyof GameMeta>(games: GameMeta[], key: K): string[] {
  return [...new Set(games.map((g) => String(g[key])))].sort()
}

export function hasActiveFilters(filters: Filters): boolean {
  return Object.values(filters).some((v) => v !== '')
}
