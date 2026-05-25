import Fuse from 'fuse.js'
import type { GameMeta } from '@/types/game'

export function createSearchIndex(games: GameMeta[]): Fuse<GameMeta> {
  return new Fuse(games, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'tags', weight: 1.5 },
      { name: 'category', weight: 1 },
      { name: 'summary', weight: 0.8 },
    ],
    threshold: 0.35,
    includeScore: true,
  })
}

export function searchGames(fuse: Fuse<GameMeta>, query: string): GameMeta[] {
  if (!query.trim()) return []
  return fuse.search(query).map((result) => result.item)
}
