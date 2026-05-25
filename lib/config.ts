export const siteConfig = {
  name: "StarterKit",
  description: "Next.js 16 App Router 기반 모던 웹 스타터킷",
  url: "https://example.com",
  nav: [
    { label: "홈", href: "/" },
    { label: "예제", href: "/examples" },
    { label: "대시보드", href: "/dashboard" },
    { label: "문서", href: "/dashboard/docs" },
    { label: "설정", href: "/settings" },
  ],
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
}

export type SiteConfig = typeof siteConfig
