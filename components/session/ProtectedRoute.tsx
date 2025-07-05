"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LucideLoader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
  fallbackUrl?: string
  loadingComponent?: ReactNode
}

export function ProtectedRoute({ 
  children, 
  fallbackUrl = "/sign-in",
  loadingComponent 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(fallbackUrl)
    }
  }, [status, router, fallbackUrl])

  // Show loading state
  if (status === "loading") {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <LucideLoader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Authenticating...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (status === "unauthenticated") {
    return null
  }

  // Render children if authenticated
  if (status === "authenticated" && session) {
    return <>{children}</>
  }

  return null
}

// Alternative hook-based approach for protecting pages
export function useRequireAuth(redirectUrl: string = "/sign-in") {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (status === "unauthenticated") {
      router.push(redirectUrl)
    }
  }, [status, router, redirectUrl])

  return { session, status, isLoading: status === "loading" }
}
