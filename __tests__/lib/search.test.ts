import { describe, it, expect } from 'vitest'
import { createSearchIndex, searchGames } from '@/lib/search'
import type { GameMeta } from '@/types/game'

const mockGames: GameMeta[] = [
  {
    slug: 'catan',
    title: 'Catan',
    players: '3-4',
    duration: '60-120 min',
    difficulty: 'Medium',
    category: 'Strategy',
    tags: ['trading', 'building', 'resource management'],
    summary: 'Build settlements and trade resources on the island of Catan.',
  },
  {
    slug: 'pandemic',
    title: 'Pandemic',
    players: '2-4',
    duration: '45-60 min',
    difficulty: 'Medium',
    category: 'Cooperative',
    tags: ['cooperative', 'disease control', 'team strategy'],
    summary: 'Work together to cure diseases before outbreaks spiral.',
  },
  {
    slug: 'ticket-to-ride',
    title: 'Ticket to Ride',
    players: '2-5',
    duration: '45-90 min',
    difficulty: 'Easy',
    category: 'Family Strategy',
    tags: ['trains', 'routes', 'set collection'],
    summary: 'Claim railway routes across North America.',
  },
]

describe('createSearchIndex', () => {
  it('returns a Fuse instance', () => {
    const fuse = createSearchIndex(mockGames)
    expect(fuse).toBeDefined()
    expect(typeof fuse.search).toBe('function')
  })
})

describe('searchGames', () => {
  it('returns an empty array for an empty query', () => {
    const fuse = createSearchIndex(mockGames)
    expect(searchGames(fuse, '')).toEqual([])
  })

  it('returns an empty array for a whitespace-only query', () => {
    const fuse = createSearchIndex(mockGames)
    expect(searchGames(fuse, '   ')).toEqual([])
  })

  it('finds a game by exact title', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'Catan')
    expect(results[0].slug).toBe('catan')
  })

  it('finds a game by partial title', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'ticket')
    expect(results[0].slug).toBe('ticket-to-ride')
  })

  it('finds a game by tag', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'trains')
    expect(results[0].slug).toBe('ticket-to-ride')
  })

  it('finds a game by category', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'cooperative')
    expect(results[0].slug).toBe('pandemic')
  })

  it('returns results as GameMeta objects', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'catan')
    expect(results[0]).toHaveProperty('slug')
    expect(results[0]).toHaveProperty('title')
    expect(results[0]).toHaveProperty('tags')
  })

  it('returns no results for a nonsense query', () => {
    const fuse = createSearchIndex(mockGames)
    const results = searchGames(fuse, 'zzzzzzzzzzz')
    expect(results).toHaveLength(0)
  })
})
