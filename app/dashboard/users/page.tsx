import { Users, UserCheck, UserPlus, UserX } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  { title: "전체 사용자", value: "1,284", icon: Users },
  { title: "활성 사용자", value: "1,031", delta: "이번 달 +18명", trend: "up" as const, icon: UserCheck },
  { title: "이번 달 신규", value: "84", delta: "전월 대비 +12%", trend: "up" as const, icon: UserPlus },
  { title: "비활성", value: "253", delta: "전월 대비 -5명", trend: "down" as const, icon: UserX },
]

interface User {
  id: number
  name: string
  email: string
  role: "관리자" | "편집자" | "뷰어"
  status: "활성" | "비활성" | "보류"
  joinedAt: string
}

const users: User[] = [
  { id: 1, name: "김민준", email: "minjun@example.com", role: "관리자", status: "활성", joinedAt: "2024-01-15" },
  { id: 2, name: "이서연", email: "seoyeon@example.com", role: "편집자", status: "활성", joinedAt: "2024-02-03" },
  { id: 3, name: "박지호", email: "jiho@example.com", role: "뷰어", status: "비활성", joinedAt: "2024-02-18" },
  { id: 4, name: "최수아", email: "sua@example.com", role: "편집자", status: "활성", joinedAt: "2024-03-07" },
  { id: 5, name: "정우진", email: "woojin@example.com", role: "뷰어", status: "보류", joinedAt: "2024-03-22" },
  { id: 6, name: "한예은", email: "yeeun@example.com", role: "뷰어", status: "활성", joinedAt: "2024-04-11" },
  { id: 7, name: "오동현", email: "donghyun@example.com", role: "편집자", status: "활성", joinedAt: "2024-04-28" },
  { id: 8, name: "신지아", email: "jia@example.com", role: "뷰어", status: "비활성", joinedAt: "2024-05-14" },
  { id: 9, name: "임준서", email: "junseo@example.com", role: "관리자", status: "활성", joinedAt: "2024-05-30" },
  { id: 10, name: "강하윤", email: "hayoon@example.com", role: "뷰어", status: "활성", joinedAt: "2024-06-09" },
]

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  관리자: "default",
  편집자: "secondary",
  뷰어: "outline",
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  활성: "default",
  보류: "secondary",
  비활성: "destructive",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="사용자 관리"
        description="서비스 사용자를 관리하세요"
        actions={
          <Button size="sm">사용자 초대</Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>총 {users.length}명의 사용자가 등록되어 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead className="hidden md:table-cell">이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="hidden lg:table-cell">가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {user.joinedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
