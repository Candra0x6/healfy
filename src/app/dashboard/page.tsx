"use client"

import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/session/UserProfile"
import { ProtectedRoute } from "@/components/session/ProtectedRoute"
import { LucideHome, LucideUser, LucideSettings } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => logout()} variant="outline">
              Sign Out
            </Button>
          </div>

          {/* Welcome Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideHome className="h-5 w-5" />
                Welcome back{user?.name ? `, ${user.name}` : ""}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Here&#39;s your personalized health dashboard. Track your progress and manage your habits.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <UserProfile />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideSettings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  View My Habits
                </Button>
                <Button className="w-full" variant="outline">
                  Check My Character
                </Button>
                <Button className="w-full" variant="outline">
                  View Missions
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User ID:</span>
                    <span className="text-sm font-mono">{user?.id || "Loading..."}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="text-sm">{user?.email || "Loading..."}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Character ID:</span>
                    <span className="text-sm font-mono">{user?.characterId || "None"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <Card>
              <CardHeader>
                <CardTitle>Debug Info</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify({ user, isAuthenticated }, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
