export interface GameFrontmatter {
  title: string
  players: string
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: string
  tags: string[]
  summary: string
  image?: string
}

export interface Game extends GameFrontmatter {
  slug: string
  content: string
}

export interface GameMeta extends GameFrontmatter {
  slug: string
}
