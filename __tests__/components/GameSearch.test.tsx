import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameSearch from '@/components/GameSearch'
import type { GameMeta } from '@/types/game'

const mockGames: GameMeta[] = [
  {
    slug: 'catan',
    title: 'Catan',
    players: '3-4',
    duration: '60-120 min',
    difficulty: 'Medium',
    category: 'Strategy',
    tags: ['trading', 'building'],
    summary: 'Build settlements and trade resources.',
  },
  {
    slug: 'pandemic',
    title: 'Pandemic',
    players: '2-4',
    duration: '45-60 min',
    difficulty: 'Medium',
    category: 'Cooperative',
    tags: ['cooperative', 'disease control'],
    summary: 'Stop the spread of disease together.',
  },
]

describe('GameSearch', () => {
  it('renders the search bar', () => {
    render(<GameSearch games={mockGames} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows all games when the query is empty', () => {
    render(<GameSearch games={mockGames} />)
    expect(screen.getByText('Catan')).toBeInTheDocument()
    expect(screen.getByText('Pandemic')).toBeInTheDocument()
  })

  it('shows the game count in the summary text', () => {
    render(<GameSearch games={mockGames} />)
    expect(screen.getByText(/2 games in the library/i)).toBeInTheDocument()
  })

  it('filters games based on the search query', async () => {
    const user = userEvent.setup()
    render(<GameSearch games={mockGames} />)
    await user.type(screen.getByRole('textbox'), 'catan')
    expect(screen.getByText('Catan')).toBeInTheDocument()
    expect(screen.queryByText('Pandemic')).not.toBeInTheDocument()
  })

  it('shows result count when searching', async () => {
    const user = userEvent.setup()
    render(<GameSearch games={mockGames} />)
    await user.type(screen.getByRole('textbox'), 'catan')
    expect(screen.getByText(/1 result found/i)).toBeInTheDocument()
  })

  it('shows the empty state message when nothing matches', async () => {
    const user = userEvent.setup()
    render(<GameSearch games={mockGames} />)
    await user.type(screen.getByRole('textbox'), 'zzzzzzzzz')
    expect(screen.getByText(/no games match your search/i)).toBeInTheDocument()
  })

  it('restores all games when the query is cleared', async () => {
    const user = userEvent.setup()
    render(<GameSearch games={mockGames} />)
    await user.type(screen.getByRole('textbox'), 'catan')
    await user.click(screen.getByLabelText('Clear search'))
    expect(screen.getByText('Catan')).toBeInTheDocument()
    expect(screen.getByText('Pandemic')).toBeInTheDocument()
  })

  it('renders difficulty filter dropdown', () => {
    render(<GameSearch games={mockGames} />)
    expect(screen.getByRole('combobox', { name: /difficulty/i })).toBeInTheDocument()
  })

  it('renders category filter dropdown', () => {
    render(<GameSearch games={mockGames} />)
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument()
  })

  it('filters by category', async () => {
    const user = userEvent.setup()
    render(<GameSearch games={mockGames} />)
    await user.selectOptions(screen.getByRole('combobox', { name: /category/i }), 'Cooperative')
    expect(screen.getByText('Pandemic')).toBeInTheDocument()
    expect(screen.queryByText('Catan')).not.toBeInTheDocument()
  })
})
