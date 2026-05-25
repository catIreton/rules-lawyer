import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockReaddirSync = vi.fn()
const mockReadFileSync = vi.fn()

vi.mock('fs', () => ({
  default: {
    readdirSync: mockReaddirSync,
    readFileSync: mockReadFileSync,
  },
  readdirSync: mockReaddirSync,
  readFileSync: mockReadFileSync,
}))

vi.mock('gray-matter', () => ({
  default: vi.fn(() => ({
    data: {
      title: 'Test Game',
      players: '2-4',
      duration: '30-60 min',
      difficulty: 'Easy',
      category: 'Test Category',
      tags: ['test', 'example'],
      summary: 'A game used in tests.',
    },
    content: '## Rules\n\nTest rules.',
  })),
}))

vi.mock('remark', () => ({
  remark: () => ({
    use: () => ({
      process: vi.fn().mockResolvedValue({ toString: () => '<h2>Rules</h2><p>Test rules.</p>' }),
    }),
  }),
}))

vi.mock('remark-html', () => ({ default: vi.fn() }))

vi.mock('path', async () => {
  const actual = await vi.importActual<typeof import('path')>('path')
  return {
    ...actual,
    join: (...args: string[]) => args.join('/'),
  }
})

beforeEach(() => {
  vi.clearAllMocks()
  vi.resetModules()
})

describe('getAllGameSlugs', () => {
  it('returns slugs from .md files only', async () => {
    mockReaddirSync.mockReturnValue(['catan.md', 'pandemic.md', 'README.txt', '.DS_Store'])
    const { getAllGameSlugs } = await import('@/lib/games')
    const slugs = getAllGameSlugs()
    expect(slugs).toEqual(['catan', 'pandemic'])
  })

  it('returns an empty array when the directory is empty', async () => {
    mockReaddirSync.mockReturnValue([])
    const { getAllGameSlugs } = await import('@/lib/games')
    expect(getAllGameSlugs()).toEqual([])
  })
})

describe('getAllGames', () => {
  it('returns one GameMeta per markdown file', async () => {
    mockReaddirSync.mockReturnValue(['catan.md', 'pandemic.md'])
    mockReadFileSync.mockReturnValue('---\ntitle: Test\n---')
    const { getAllGames } = await import('@/lib/games')
    const games = getAllGames()
    expect(games).toHaveLength(2)
  })

  it('attaches the slug derived from the filename', async () => {
    mockReaddirSync.mockReturnValue(['catan.md'])
    mockReadFileSync.mockReturnValue('---\ntitle: Catan\n---')
    const { getAllGames } = await import('@/lib/games')
    const games = getAllGames()
    expect(games[0].slug).toBe('catan')
  })
})

describe('getGameBySlug', () => {
  it('returns null when the file does not exist', async () => {
    mockReadFileSync.mockImplementation(() => {
      throw Object.assign(new Error('ENOENT: no such file'), { code: 'ENOENT' })
    })
    const { getGameBySlug } = await import('@/lib/games')
    const result = await getGameBySlug('nonexistent')
    expect(result).toBeNull()
  })

  it('returns a Game with rendered HTML content', async () => {
    mockReadFileSync.mockReturnValue('---\ntitle: Catan\n---\n## Rules')
    const { getGameBySlug } = await import('@/lib/games')
    const game = await getGameBySlug('catan')
    expect(game).not.toBeNull()
    expect(game!.slug).toBe('catan')
    expect(game!.content).toContain('<h2>')
  })
})
