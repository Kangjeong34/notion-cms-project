"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error)
    }
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-24 px-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>오류가 발생했습니다</AlertTitle>
        <AlertDescription>
          {error.message || "예상치 못한 오류가 발생했습니다. 다시 시도해주세요"}
        </AlertDescription>
      </Alert>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  )
}
