import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GameCard from '@/components/GameCard'
import type { GameMeta } from '@/types/game'

const mockGame: GameMeta = {
  slug: 'catan',
  title: 'Catan',
  players: '3-4',
  duration: '60-120 min',
  difficulty: 'Medium',
  category: 'Strategy',
  tags: ['trading', 'building'],
  summary: 'Build settlements and trade resources on Catan.',
}

describe('GameCard', () => {
  it('renders the game title', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText('Catan')).toBeInTheDocument()
  })

  it('renders the game summary', () => {
    render(<GameCard game={mockGame} />)
    expect(
      screen.getByText('Build settlements and trade resources on Catan.')
    ).toBeInTheDocument()
  })

  it('renders player count', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText(/3-4/)).toBeInTheDocument()
  })

  it('renders duration', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText(/60-120 min/)).toBeInTheDocument()
  })

  it('renders category', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText(/Strategy/)).toBeInTheDocument()
  })

  it('renders difficulty badge', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(<GameCard game={mockGame} />)
    expect(screen.getByText('trading')).toBeInTheDocument()
    expect(screen.getByText('building')).toBeInTheDocument()
  })

  it('links to the correct game page', () => {
    render(<GameCard game={mockGame} />)
    const card = screen.getByTestId('game-card')
    const link = card.querySelector('a[href="/games/catan"]')
    expect(link).toBeInTheDocument()
  })

  it('each tag links to its tag page', () => {
    render(<GameCard game={mockGame} />)
    const tradingLink = screen.getByRole('link', { name: 'trading' })
    expect(tradingLink).toHaveAttribute('href', '/tags/trading')
    const buildingLink = screen.getByRole('link', { name: 'building' })
    expect(buildingLink).toHaveAttribute('href', '/tags/building')
  })
})
