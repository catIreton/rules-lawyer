import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/SearchBar'

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar onSearch={() => {}} />)
    expect(
      screen.getByPlaceholderText('Search games, rules, or tags...')
    ).toBeInTheDocument()
  })

  it('renders with a custom placeholder', () => {
    render(<SearchBar onSearch={() => {}} placeholder="Find a game" />)
    expect(screen.getByPlaceholderText('Find a game')).toBeInTheDocument()
  })

  it('calls onSearch with the typed value', async () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'catan' } })
    expect(onSearch).toHaveBeenCalledWith('catan')
  })

  it('shows clear button when input has value', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={() => {}} />)
    await user.type(screen.getByRole('textbox'), 'catan')
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('hides clear button when input is empty', () => {
    render(<SearchBar onSearch={() => {}} />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('clears the input and calls onSearch with empty string when clear is clicked', async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup()
    render(<SearchBar onSearch={onSearch} />)
    await user.type(screen.getByRole('textbox'), 'catan')
    await user.click(screen.getByLabelText('Clear search'))
    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(onSearch).toHaveBeenLastCalledWith('')
  })
})
