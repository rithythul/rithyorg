import { readdir, readFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const cryptoDirectory = path.join(process.cwd(), 'content/crypto')

export interface CryptoPost {
  slug: string
  title: string
  date: string
  category: string
  summary: string
  sources: { name: string; url: string }[]
  content: string
}

export interface CryptoCategory {
  name: string
  count: number
}

async function ensureCryptoDirectory() {
  try {
    await mkdir(cryptoDirectory, { recursive: true })
  } catch (error) {
    if ((error as any).code !== 'EEXIST') {
      console.error('Error creating crypto directory:', error)
    }
  }
}

export async function getCryptoPosts(): Promise<CryptoPost[]> {
  try {
    await ensureCryptoDirectory()
    const fileNames = await readdir(cryptoDirectory)

    const allPosts = await Promise.all(
      fileNames
        .filter((f) => f.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(cryptoDirectory, fileName)
          const fileContents = await readFile(fullPath, 'utf8')
          const { content, data } = matter(fileContents)

          return {
            slug,
            content,
            title: data.title || slug,
            date: data.date || '',
            category: data.category || 'bitcoin',
            summary: data.summary || '',
            sources: data.sources || [],
          }
        })
    )

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error in getCryptoPosts:', error)
    return []
  }
}

export async function getCryptoCategories(): Promise<CryptoCategory[]> {
  const posts = await getCryptoPosts()
  const counts = new Map<string, number>()
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) || 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getCryptoPost(slug: string): Promise<CryptoPost | null> {
  try {
    const fullPath = path.join(cryptoDirectory, `${slug}.md`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { content, data } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || 'bitcoin',
      summary: data.summary || '',
      sources: data.sources || [],
    }
  } catch {
    return null
  }
}
