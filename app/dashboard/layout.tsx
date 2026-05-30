import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {/* SidebarInset은 <main>을 렌더링하므로 루트 레이아웃 <main>과 중첩을 피하기 위해 div 사용 */}
      <div className="relative flex w-full flex-1 flex-col bg-background">
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">관리자</span>
        </header>
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
