import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "관리자 대시보드",
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>
      <p className="text-muted-foreground mt-2">
        블로그 글을 관리할 수 있는 관리자 페이지입니다.
      </p>
    </div>
  )
}
