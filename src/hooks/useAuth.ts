import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

/**
 * Custom hook that provides session utilities and common authentication actions
 */
export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const login = useCallback(async (provider?: string) => {
    if (provider) {
      return await signIn(provider, { callbackUrl: "/dashboard" })
    }
    router.push("/sign-in")
  }, [router])

  const logout = useCallback(async (callbackUrl?: string) => {
    return await signOut({ callbackUrl: callbackUrl || "/sign-in" })
  }, [])

  const refreshSession = useCallback(async () => {
    return await update()
  }, [update])

  const isAuthenticated = status === "authenticated" && !!session
  const isLoading = status === "loading"
  const user = session?.user

  return {
    // Session data
    session,
    user,
    status,
    
    // Computed states
    isAuthenticated,
    isLoading,
    isUnauthenticated: status === "unauthenticated",
    
    // Actions
    login,
    logout,
    refreshSession,
    
    // User info shortcuts
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.name,
    userImage: user?.image,
    characterId: user?.characterId,
  }
}

/**
 * Hook to get user data with type safety
 */
export function useUser() {
  const { user, isAuthenticated, isLoading } = useAuth()
  
  return {
    user: isAuthenticated ? user : null,
    isAuthenticated,
    isLoading,
  }
}

/**
 * Hook that redirects to login if user is not authenticated
 */
export function useRequireAuth(redirectTo: string = "/sign-in") {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (!isLoading && !isAuthenticated) {
    router.push(redirectTo)
  }

  return { isAuthenticated, isLoading }
}
