export const siteConfig = {
  name: "책 리뷰 블로그",
  description: "Notion을 CMS로 활용한 북 리뷰 블로그",
  url: "https://example.com",
  nav: [
    { label: "홈", href: "/" },
    { label: "카테고리", href: "/categories" },
  ],
  social: {
    github: "https://github.com",
  },
}

export type SiteConfig = typeof siteConfig
