"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LucideLoader2, LucideUser, LucideMail, LucideLogOut } from "lucide-react"

export function UserProfile() {
  const { data: session, status } = useSession()

  // Loading state
  if (status === "loading") {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center py-8">
          <LucideLoader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading profile...</span>
        </CardContent>
      </Card>
    )
  }

  // Not authenticated
  if (status === "unauthenticated") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Not Logged In</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Authenticated - show user profile
  if (status === "authenticated" && session?.user) {
    const user = session.user

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LucideUser className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar and basic info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              {user.name && (
                <h3 className="text-lg font-semibold">{user.name}</h3>
              )}
              {user.email && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <LucideMail className="h-3 w-3" />
                  {user.email}
                </div>
              )}
            </div>
          </div>

          {/* User ID (for development purposes) */}
          {user.id && (
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">
                ID: {user.id}
              </Badge>
              {user.characterId && (
                <Badge variant="outline" className="text-xs ml-2">
                  Character: {user.characterId}
                </Badge>
              )}
            </div>
          )}

          {/* Session info */}
          <div className="text-xs text-muted-foreground">
            <p>Session Status: <Badge variant="default" className="text-xs">{status}</Badge></p>
          </div>

          {/* Sign out button */}
          <Button 
            onClick={() => signOut({ callbackUrl: "/sign-in" })} 
            variant="outline" 
            className="w-full"
          >
            <LucideLogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}
