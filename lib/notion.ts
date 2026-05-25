import type { Post, Category, NotionBlock } from "@/types/notion"
import { samplePosts, sampleCategories, sampleBlocks } from "@/lib/sample-data"

// Notion API 키가 설정되지 않은 경우 샘플 데이터 사용
const USE_SAMPLE_DATA =
  !process.env.NOTION_API_KEY ||
  process.env.NOTION_API_KEY === "secret_xxxx"

// 제목을 URL 슬러그로 변환 (영문 소문자, 숫자, 한글, 하이픈만 허용)
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "")
}

async function fetchPostsFromNotion(): Promise<Post[]> {
  const { Client, isFullPage } = await import("@notionhq/client")

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const DATABASE_ID = process.env.NOTION_DATABASE_ID!

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "발행됨" },
    },
    sorts: [{ property: "Published", direction: "descending" }],
  })

  return response.results.filter(isFullPage).map((page) => {
    // Notion API 속성 접근을 위한 타입 어서션 (런타임 구조에 맞게 처리)
    const getTitle = (): string => {
      const p = page.properties["Title"]
      return p?.type === "title" ? (p.title[0]?.plain_text ?? "제목 없음") : "제목 없음"
    }
    const getSelect = (key: string): string => {
      const p = page.properties[key]
      return p?.type === "select" ? (p.select?.name ?? "") : ""
    }
    const getMultiSelect = (key: string): string[] => {
      const p = page.properties[key]
      return p?.type === "multi_select" ? p.multi_select.map((t) => t.name) : []
    }
    const getDate = (key: string): string => {
      const p = page.properties[key]
      return p?.type === "date" ? (p.date?.start ?? page.created_time) : page.created_time
    }

    const title = getTitle()
    return {
      id: page.id,
      slug: toSlug(title),
      title,
      category: getSelect("Category"),
      tags: getMultiSelect("Tags"),
      publishedAt: getDate("Published"),
      status: getSelect("Status") === "발행됨" ? ("발행됨" as const) : ("초안" as const),
    }
  })
}

async function fetchBlocksFromNotion(pageId: string): Promise<NotionBlock[]> {
  const { Client, isFullBlock } = await import("@notionhq/client")

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const blocks: NotionBlock[] = []
  let cursor: string | undefined

  const supportedTypes = [
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "code",
    "image",
    "divider",
  ]

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    })

    for (const block of response.results) {
      if (isFullBlock(block) && supportedTypes.includes(block.type)) {
        blocks.push(block as unknown as NotionBlock)
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

// 발행된 글 목록 조회 (Published 내림차순)
export async function getPosts(): Promise<Post[]> {
  if (USE_SAMPLE_DATA) return samplePosts
  return fetchPostsFromNotion()
}

// slug로 단일 글 조회
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

// 글 본문 블록 조회
export async function getPostBlocks(pageId: string): Promise<NotionBlock[]> {
  if (USE_SAMPLE_DATA) return sampleBlocks
  return fetchBlocksFromNotion(pageId)
}

// 카테고리 목록 및 글 수 조회
export async function getCategories(): Promise<Category[]> {
  if (USE_SAMPLE_DATA) return sampleCategories

  const posts = await getPosts()
  const counts: Record<string, number> = {}

  for (const post of posts) {
    if (post.category) {
      counts[post.category] = (counts[post.category] ?? 0) + 1
    }
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
