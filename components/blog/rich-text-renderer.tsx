import type { RichText, RichTextAnnotations } from "@/types/notion"

interface RichTextRendererProps {
  richText: RichText[]
}

// 어노테이션에 따라 시맨틱 HTML 요소로 중첩 래핑
function applyAnnotations(text: string, annotations: RichTextAnnotations): React.ReactNode {
  let content: React.ReactNode = text
  if (annotations.code) {
    content = <code className="font-mono bg-muted px-1 py-0.5 rounded text-sm">{content}</code>
  }
  if (annotations.strikethrough) content = <s>{content}</s>
  if (annotations.underline) content = <u>{content}</u>
  if (annotations.italic) content = <em>{content}</em>
  if (annotations.bold) content = <strong>{content}</strong>
  return content
}

export function RichTextRenderer({ richText }: RichTextRendererProps) {
  return (
    <>
      {richText.map((segment, i) => {
        const annotated = applyAnnotations(segment.plain_text, segment.annotations)

        // 링크가 있는 경우 <a> 태그로 래핑
        if (segment.text.link) {
          return (
            <a
              key={i}
              href={segment.text.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:opacity-80"
            >
              {annotated}
            </a>
          )
        }

        return <span key={i}>{annotated}</span>
      })}
    </>
  )
}
