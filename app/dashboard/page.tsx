import { Users, DollarSign, ShoppingCart, Activity } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "총 수익", value: "₩45,231,890", delta: "전월 대비 +20.1%", trend: "up" as const, icon: DollarSign },
  { title: "활성 사용자", value: "2,350", delta: "전월 대비 +180.1%", trend: "up" as const, icon: Users },
  { title: "신규 주문", value: "12,234", delta: "전월 대비 +19%", trend: "up" as const, icon: ShoppingCart },
  { title: "현재 활성", value: "573", delta: "전월 대비 -2%", trend: "down" as const, icon: Activity },
]

const recentOrders = [
  { id: "ORD-001", customer: "김민준", email: "minjun@example.com", status: "완료", amount: "₩240,000" },
  { id: "ORD-002", customer: "이서연", email: "seoyeon@example.com", status: "처리중", amount: "₩150,000" },
  { id: "ORD-003", customer: "박지호", email: "jiho@example.com", status: "완료", amount: "₩350,000" },
  { id: "ORD-004", customer: "최수아", email: "sua@example.com", status: "취소", amount: "₩90,000" },
  { id: "ORD-005", customer: "정우진", email: "woojin@example.com", status: "완료", amount: "₩480,000" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  완료: "default",
  처리중: "secondary",
  취소: "destructive",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인하세요"
      />

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 탭 영역 */}
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">최근 주문</TabsTrigger>
          <TabsTrigger value="activity">활동 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>이번 달 처리된 최근 주문 현황입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>주문 ID</TableHead>
                    <TableHead>고객</TableHead>
                    <TableHead className="hidden md:table-cell">이메일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs">
                              {order.customer[0]}
                            </AvatarFallback>
                          </Avatar>
                          {order.customer}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        {order.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[order.status]}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>활동 내역</CardTitle>
              <CardDescription>최근 시스템 활동 로그입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["새 사용자 가입: 홍길동", "주문 #ORD-006 완료", "설정 업데이트됨", "백업 완료"].map(
                  (log) => (
                    <div key={log} className="flex items-center gap-3 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">{log}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
