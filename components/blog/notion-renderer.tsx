import Image from "next/image"
import type { NotionBlock } from "@/types/notion"
import { RichTextRenderer } from "@/components/blog/rich-text-renderer"

type Props = {
  blocks: NotionBlock[]
}

// 연속된 리스트 블록을 그룹으로 묶는 타입
type BulletedListItem = Extract<NotionBlock, { type: "bulleted_list_item" }>
type NumberedListItem = Extract<NotionBlock, { type: "numbered_list_item" }>

type ListGroup =
  | { type: "bulleted_list"; items: BulletedListItem[] }
  | { type: "numbered_list"; items: NumberedListItem[] }
type RenderedBlock = NotionBlock | ListGroup

function groupBlocks(blocks: NotionBlock[]): RenderedBlock[] {
  const result: RenderedBlock[] = []

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      const last = result[result.length - 1]
      if (last && "items" in last && last.type === "bulleted_list") {
        last.items.push(block)
      } else {
        result.push({ type: "bulleted_list", items: [block] })
      }
    } else if (block.type === "numbered_list_item") {
      const last = result[result.length - 1]
      if (last && "items" in last && last.type === "numbered_list") {
        last.items.push(block)
      } else {
        result.push({ type: "numbered_list", items: [block] })
      }
    } else {
      result.push(block)
    }
  }

  return result
}

function getImageUrl(block: Extract<NotionBlock, { type: "image" }>): string {
  if (block.image.type === "external") return block.image.external.url
  return block.image.file.url
}

export function NotionRenderer({ blocks }: Props) {
  const grouped = groupBlocks(blocks)

  return (
    <div className="space-y-4 text-base leading-7">
      {grouped.map((item, i) => {
        // 리스트 그룹 렌더링
        if ("items" in item) {
          if (item.type === "bulleted_list") {
            return (
              <ul key={i} className="list-disc list-inside space-y-1 pl-4">
                {item.items.map((li) => (
                  <li key={li.id}>
                    <RichTextRenderer richText={li.bulleted_list_item.rich_text} />
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <ol key={i} className="list-decimal list-inside space-y-1 pl-4">
              {item.items.map((li) => (
                <li key={li.id}>
                  <RichTextRenderer richText={li.numbered_list_item.rich_text} />
                </li>
              ))}
            </ol>
          )
        }

        // 단일 블록 렌더링
        switch (item.type) {
          case "paragraph":
            return (
              <p key={item.id} className="text-foreground/90">
                <RichTextRenderer richText={item.paragraph.rich_text} />
              </p>
            )
          case "heading_1":
            return (
              <h2 key={item.id} className="text-2xl font-bold mt-8 mb-2">
                <RichTextRenderer richText={item.heading_1.rich_text} />
              </h2>
            )
          case "heading_2":
            return (
              <h3 key={item.id} className="text-xl font-semibold mt-6 mb-2">
                <RichTextRenderer richText={item.heading_2.rich_text} />
              </h3>
            )
          case "heading_3":
            return (
              <h4 key={item.id} className="text-lg font-semibold mt-4 mb-1">
                <RichTextRenderer richText={item.heading_3.rich_text} />
              </h4>
            )
          case "quote":
            return (
              <blockquote
                key={item.id}
                className="border-l-4 border-primary pl-4 italic text-muted-foreground"
              >
                <RichTextRenderer richText={item.quote.rich_text} />
              </blockquote>
            )
          case "code":
            return (
              <pre
                key={item.id}
                className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono"
                data-language={item.code.language}
              >
                <code>{item.code.rich_text.map((t) => t.plain_text).join("")}</code>
              </pre>
            )
          case "image": {
            const url = getImageUrl(item)
            return (
              // 이미지 블록: Notion에서 alt 텍스트를 제공하지 않으므로 빈 alt로 장식 이미지 처리
              <figure key={item.id} className="my-6">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={url}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                    role="presentation"
                  />
                </div>
              </figure>
            )
          }
          case "divider":
            return <hr key={item.id} className="border-border my-6" />
          default:
            return null
        }
      })}
    </div>
  )
}
