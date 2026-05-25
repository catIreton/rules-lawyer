import { cache } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Game, GameMeta } from '@/types/game'

const gamesDirectory = path.join(process.cwd(), 'content/games')
const processor = remark().use(html)

export function getAllGameSlugs(): string[] {
  return fs
    .readdirSync(gamesDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getAllGames(): GameMeta[] {
  const slugs = getAllGameSlugs()
  return slugs
    .map((slug) => {
      const fullPath = path.join(gamesDirectory, `${slug}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return { slug, ...data } as GameMeta
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const getGameBySlug = cache(async (slug: string): Promise<Game | null> => {
  const fullPath = path.join(gamesDirectory, `${slug}.md`)
  let fileContents: string
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8')
  } catch {
    return null
  }
  const { data, content } = matter(fileContents)
  const processedContent = await processor.process(content)
  return {
    slug,
    ...data,
    content: processedContent.toString(),
  } as Game
})
