"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
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

function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
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
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          {siteConfig.name}
        </Link>

        {!isMobile && <NavLinks />}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isMobile && (
            <Button size="sm" asChild>
              <Link href="/sign-in">시작하기</Link>
            </Button>
          )}
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <NavLinks className="flex-col items-start" onNavigate={() => setOpen(false)} />
                  <Button asChild className="mt-2">
                    <Link href="/sign-in" onClick={() => setOpen(false)}>
                      시작하기
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
