"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/lib/config"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavLinksProps {
  className?: string
  onNavigate?: () => void
}

// 현재 경로에 따라 aria-current="page" 적용
function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="주 내비게이션" className={cn("flex items-center gap-1", className)}>
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          aria-current={pathname === item.href ? "page" : undefined}
          className={cn(
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* 사이트 로고/이름 */}
        <Link href="/" className="font-bold text-lg" aria-label={`${siteConfig.name} 홈으로 이동`}>
          {siteConfig.name}
        </Link>

        {/* 데스크톱 내비게이션 — md 이상에서 표시 */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* 모바일 햄버거 메뉴 — md 미만에서 표시 */}
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <NavLinks className="flex-col items-start" onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
