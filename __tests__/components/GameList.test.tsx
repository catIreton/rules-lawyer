import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GameList from '@/components/GameList'
import type { GameMeta } from '@/types/game'

const makeGame = (slug: string, title: string): GameMeta => ({
  slug,
  title,
  players: '2-4',
  duration: '30 min',
  difficulty: 'Easy',
  category: 'Abstract',
  tags: ['test'],
  summary: 'A test game.',
})

const mockGames: GameMeta[] = [
  {
    slug: 'catan',
    title: 'Catan',
    players: '3-4',
    duration: '60-120 min',
    difficulty: 'Medium',
    category: 'Strategy',
    tags: ['trading'],
    summary: 'Build settlements.',
  },
  {
    slug: 'pandemic',
    title: 'Pandemic',
    players: '2-4',
    duration: '45-60 min',
    difficulty: 'Medium',
    category: 'Cooperative',
    tags: ['cooperative'],
    summary: 'Stop the outbreak.',
  },
]

describe('GameList', () => {
  it('renders a card for each game', () => {
    render(<GameList games={mockGames} />)
    expect(screen.getAllByTestId('game-card')).toHaveLength(2)
  })

  it('renders game titles', () => {
    render(<GameList games={mockGames} />)
    expect(screen.getByText('Catan')).toBeInTheDocument()
    expect(screen.getByText('Pandemic')).toBeInTheDocument()
  })

  it('shows the default empty message when games array is empty', () => {
    render(<GameList games={[]} />)
    expect(screen.getByText('No games found.')).toBeInTheDocument()
  })

  it('shows a custom empty message', () => {
    render(<GameList games={[]} emptyMessage="Nothing matched your search." />)
    expect(screen.getByText('Nothing matched your search.')).toBeInTheDocument()
  })

  it('does not render cards when games array is empty', () => {
    render(<GameList games={[]} />)
    expect(screen.queryAllByTestId('game-card')).toHaveLength(0)
  })
})

describe('GameList — empty cubby padding', () => {
  it('pads to a full row of 3 with empty cubbies when 1 game is shown', () => {
    render(<GameList games={[makeGame('a', 'Alpha')]} />)
    expect(screen.getAllByTestId('game-card')).toHaveLength(1)
    expect(screen.getAllByTestId('empty-cubby')).toHaveLength(2)
  })

  it('adds 1 empty cubby when 2 games are shown', () => {
    render(<GameList games={[makeGame('a', 'Alpha'), makeGame('b', 'Beta')]} />)
    expect(screen.getAllByTestId('game-card')).toHaveLength(2)
    expect(screen.getAllByTestId('empty-cubby')).toHaveLength(1)
  })

  it('renders no empty cubbies when game count is already a multiple of 3', () => {
    const games = [makeGame('a', 'Alpha'), makeGame('b', 'Beta'), makeGame('c', 'Gamma')]
    render(<GameList games={games} />)
    expect(screen.getAllByTestId('game-card')).toHaveLength(3)
    expect(screen.queryAllByTestId('empty-cubby')).toHaveLength(0)
  })
})
