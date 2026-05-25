export type Post = {
  id: string
  slug: string
  title: string
  category: string
  tags: string[]
  publishedAt: string
  status: "초안" | "발행됨"
}

export type Category = {
  name: string
  count: number
}

export type RichTextAnnotations = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export type RichText = {
  type: "text"
  text: { content: string; link: { url: string } | null }
  annotations: RichTextAnnotations
  plain_text: string
}

export type NotionBlock =
  | { id: string; type: "paragraph"; paragraph: { rich_text: RichText[] } }
  | { id: string; type: "heading_1"; heading_1: { rich_text: RichText[] } }
  | { id: string; type: "heading_2"; heading_2: { rich_text: RichText[] } }
  | { id: string; type: "heading_3"; heading_3: { rich_text: RichText[] } }
  | { id: string; type: "bulleted_list_item"; bulleted_list_item: { rich_text: RichText[] } }
  | { id: string; type: "numbered_list_item"; numbered_list_item: { rich_text: RichText[] } }
  | { id: string; type: "quote"; quote: { rich_text: RichText[] } }
  | { id: string; type: "code"; code: { rich_text: RichText[]; language: string } }
  | {
      id: string
      type: "image"
      image:
        | { type: "external"; external: { url: string } }
        | { type: "file"; file: { url: string } }
    }
  | { id: string; type: "divider"; divider: Record<string, never> }
