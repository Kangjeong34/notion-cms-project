import type { RichText } from "@/types/notion"
import { cn } from "@/lib/utils"

type Props = {
  richText: RichText[]
}

export function RichTextRenderer({ richText }: Props) {
  return (
    <>
      {richText.map((segment, i) => {
        const { bold, italic, strikethrough, underline, code } = segment.annotations

        if (segment.text.link) {
          return (
            <a
              key={i}
              href={segment.text.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-primary underline underline-offset-4 hover:opacity-80",
                bold && "font-bold",
                italic && "italic",
                strikethrough && "line-through",
                code && "font-mono bg-muted px-1 rounded text-sm"
              )}
            >
              {segment.plain_text}
            </a>
          )
        }

        return (
          <span
            key={i}
            className={cn(
              bold && "font-bold",
              italic && "italic",
              strikethrough && "line-through",
              underline && "underline underline-offset-2",
              code && "font-mono bg-muted px-1 rounded text-sm"
            )}
          >
            {segment.plain_text}
          </span>
        )
      })}
    </>
  )
}
