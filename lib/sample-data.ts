import type { Post, Category, NotionBlock } from "@/types/notion"

export const samplePosts: Post[] = [
  {
    id: "1",
    slug: "the-great-gatsby",
    title: "위대한 개츠비 — 꿈과 환상의 끝에서",
    category: "소설",
    tags: ["고전", "미국문학", "추천"],
    publishedAt: "2026-05-20",
    status: "발행됨",
  },
  {
    id: "2",
    slug: "atomic-habits",
    title: "아주 작은 습관의 힘 — 1%의 변화가 만드는 기적",
    category: "자기계발",
    tags: ["습관", "생산성", "추천"],
    publishedAt: "2026-05-15",
    status: "발행됨",
  },
  {
    id: "3",
    slug: "clean-code",
    title: "클린 코드 — 읽기 좋은 코드를 만드는 원칙",
    category: "기술",
    tags: ["프로그래밍", "소프트웨어공학"],
    publishedAt: "2026-05-10",
    status: "발행됨",
  },
  {
    id: "4",
    slug: "sapiens",
    title: "사피엔스 — 인류의 역사를 단 한 권으로",
    category: "인문",
    tags: ["역사", "인류학", "추천"],
    publishedAt: "2026-05-05",
    status: "발행됨",
  },
  {
    id: "5",
    slug: "the-psychology-of-money",
    title: "돈의 심리학 — 부에 대한 고정관념을 깨다",
    category: "자기계발",
    tags: ["투자", "경제", "심리"],
    publishedAt: "2026-04-28",
    status: "발행됨",
  },
  {
    id: "6",
    slug: "the-pragmatic-programmer",
    title: "실용주의 프로그래머 — 시대를 초월한 개발자의 지혜",
    category: "기술",
    tags: ["프로그래밍", "커리어", "추천"],
    publishedAt: "2026-04-20",
    status: "발행됨",
  },
]

export const sampleCategories: Category[] = [
  { name: "소설", count: 1 },
  { name: "자기계발", count: 2 },
  { name: "기술", count: 2 },
  { name: "인문", count: 1 },
]

export const sampleBlocks: NotionBlock[] = [
  {
    id: "b1",
    type: "heading_2",
    heading_2: {
      rich_text: [
        {
          type: "text",
          text: { content: "한 줄 요약", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "한 줄 요약",
        },
      ],
    },
  },
  {
    id: "b2",
    type: "quote",
    quote: {
      rich_text: [
        {
          type: "text",
          text: { content: "과거로 돌아가 새로운 시작을 할 수는 없지만, 지금 시작해서 새로운 결말을 만들 수는 있다.", link: null },
          annotations: {
            bold: false,
            italic: true,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "과거로 돌아가 새로운 시작을 할 수는 없지만, 지금 시작해서 새로운 결말을 만들 수는 있다.",
        },
      ],
    },
  },
  {
    id: "b3",
    type: "heading_2",
    heading_2: {
      rich_text: [
        {
          type: "text",
          text: { content: "읽게 된 계기", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "읽게 된 계기",
        },
      ],
    },
  },
  {
    id: "b4",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: { content: "오래전부터 고전 문학에 관심이 있었지만 선뜻 손이 가지 않았다. 어느 날 서점에서 우연히 마주친 이 책의 표지가 마음에 들어 집어 들었고, 그날 밤 단숨에 절반을 읽어버렸다. 이름만 들어왔던 작품을 직접 읽으니 왜 고전이라 불리는지 단번에 이해할 수 있었다.", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "오래전부터 고전 문학에 관심이 있었지만 선뜻 손이 가지 않았다. 어느 날 서점에서 우연히 마주친 이 책의 표지가 마음에 들어 집어 들었고, 그날 밤 단숨에 절반을 읽어버렸다. 이름만 들어왔던 작품을 직접 읽으니 왜 고전이라 불리는지 단번에 이해할 수 있었다.",
        },
      ],
    },
  },
  {
    id: "b5",
    type: "heading_2",
    heading_2: {
      rich_text: [
        {
          type: "text",
          text: { content: "인상 깊었던 부분", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "인상 깊었던 부분",
        },
      ],
    },
  },
  {
    id: "b6",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: { content: "책에서 가장 인상 깊었던 것은 ", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "책에서 가장 인상 깊었던 것은 ",
        },
        {
          type: "text",
          text: { content: "개츠비의 집착과 순수함이 공존하는 방식", link: null },
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "개츠비의 집착과 순수함이 공존하는 방식",
        },
        {
          type: "text",
          text: { content: "이다. 그는 분명 자신을 파괴하는 꿈을 쫓고 있지만, 그 안에는 진심이 담겨 있다. 독자는 그를 비판하면서도 응원하게 된다.", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "이다. 그는 분명 자신을 파괴하는 꿈을 쫓고 있지만, 그 안에는 진심이 담겨 있다. 독자는 그를 비판하면서도 응원하게 된다.",
        },
      ],
    },
  },
  {
    id: "b7",
    type: "heading_2",
    heading_2: {
      rich_text: [
        {
          type: "text",
          text: { content: "추천하는 이유", link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "추천하는 이유",
        },
      ],
    },
  },
  {
    id: "b8",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: { content: "짧은 분량 (200페이지 내외)으로 부담 없이 읽을 수 있다", link: null },
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          plain_text: "짧은 분량 (200페이지 내외)으로 부담 없이 읽을 수 있다",
        },
      ],
    },
  },
  {
    id: "b9",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: { content: "아메리칸 드림의 허상을 날카롭게 꿰뚫는 시대적 통찰", link: null },
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          plain_text: "아메리칸 드림의 허상을 날카롭게 꿰뚫는 시대적 통찰",
        },
      ],
    },
  },
  {
    id: "b10",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: { content: "읽은 후에도 오래 생각하게 만드는 여운", link: null },
          annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          plain_text: "읽은 후에도 오래 생각하게 만드는 여운",
        },
      ],
    },
  },
  {
    id: "b11",
    type: "divider",
    divider: {},
  },
  {
    id: "b12",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: { content: "⭐️ 개인 평점: 4.5 / 5", link: null },
          annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: "default" },
          plain_text: "⭐️ 개인 평점: 4.5 / 5",
        },
      ],
    },
  },
]
