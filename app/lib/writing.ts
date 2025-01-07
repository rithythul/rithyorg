// app/lib/writing.ts
import { readdir, readFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
}

// Ensure the posts directory exists
async function ensurePostsDirectory() {
  try {
    await mkdir(postsDirectory, { recursive: true })
  } catch (error) {
    // Directory might already exist, which is fine
    if ((error as any).code !== 'EEXIST') {
      console.error('Error creating posts directory:', error)
    }
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Ensure the directory exists before trying to read it
    await ensurePostsDirectory()

    // Get file names under /content/posts
    const fileNames = await readdir(postsDirectory)
    
    if (fileNames.length === 0) {
      return [] // Return empty array if no files
    }

    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          // Remove ".md" from file name to get slug
          const slug = fileName.replace(/\.md$/, '')

          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await readFile(fullPath, 'utf8')

          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents)

          // Combine the data
          return {
            slug,
            content: matterResult.content,
            ...(matterResult.data as { title: string; date: string })
          }
        })
    )

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error in getBlogPosts:', error)
    return [] // Return empty array if there's any error
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = await readFile(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as { title: string; date: string })
    }
  } catch {
    return null
  }
}

export async function getAdjacentPosts(currentSlug: string): Promise<{ 
  previous: BlogPost | null; 
  next: BlogPost | null 
}> {
  const posts = await getBlogPosts()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  }
}