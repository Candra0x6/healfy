# Session Implementation Guide

This guide explains how to use NextAuth sessions in client components throughout the application.

## Setup

The application already has NextAuth configured with:
- **SessionProvider** wrapped around the app in `src/provider/ClientProvider.tsx`
- **Google OAuth** and **Credentials** providers configured in `src/libs/oAuth.ts`
- Session management in login/register forms

## Using Sessions in Client Components

### 1. Basic Session Hook

```tsx
import { useSession } from "next-auth/react"

function MyComponent() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Not logged in</p>

  return <p>Welcome, {session.user.name}!</p>
}
```

### 2. Custom useAuth Hook

Use the custom hook for more functionality:

```tsx
import { useAuth } from "@/hooks/useAuth"

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) return <p>Loading...</p>
  if (!isAuthenticated) return <p>Please log in</p>

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
      <p>Character ID: {user.characterId}</p>
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  )
}
```

### 3. Protected Routes

Wrap components that require authentication:

```tsx
import { ProtectedRoute } from "@/components/session/ProtectedRoute"

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  )
}
```

### 4. Authentication Actions

#### Login with Credentials
```tsx
import { signIn } from "next-auth/react"

const handleLogin = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })
  
  if (result?.ok) {
    // Success
  } else {
    // Handle error
  }
}
```

#### Login with Google
```tsx
import { signIn } from "next-auth/react"

const handleGoogleLogin = async () => {
  await signIn("google", { callbackUrl: "/dashboard" })
}
```

#### Logout
```tsx
import { signOut } from "next-auth/react"

const handleLogout = async () => {
  await signOut({ callbackUrl: "/sign-in" })
}
```

## Components Available

### 1. LoginForm (`components/form/LoginForm.tsx`)
- Handles both credential and Google authentication
- Redirects authenticated users to dashboard
- Uses NextAuth `signIn` function

### 2. RegisterForm (`components/form/RegisterForm.tsx`)
- Handles user registration
- Includes Google OAuth option
- Redirects authenticated users to dashboard

### 3. UserProfile (`src/components/session/UserProfile.tsx`)
- Displays user session information
- Shows avatar, name, email, and IDs
- Includes sign-out functionality

### 4. ProtectedRoute (`src/components/session/ProtectedRoute.tsx`)
- HOC for protecting routes
- Shows loading state during authentication check
- Redirects unauthenticated users

### 5. Dashboard (`src/app/dashboard/page.tsx`)
- Example of a protected page
- Shows how to use session data
- Demonstrates various session utilities

## Session Data Structure

The session object contains:
```tsx
{
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    characterId?: string
  }
}
```

## Environment Variables

Make sure these are set in your `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Best Practices

1. **Always check authentication status** before rendering protected content
2. **Use loading states** while session is being fetched
3. **Handle unauthenticated states** gracefully
4. **Use the custom useAuth hook** for common session operations
5. **Wrap sensitive routes** with ProtectedRoute component
6. **Store session-related utilities** in the hooks folder

## API Integration

The session integrates with your existing API routes:
- `/api/auth/register` - User registration
- `/api/auth/login` - Custom login (now replaced by NextAuth)
- `/api/auth/profile` - User profile management
- NextAuth handles `/api/auth/*` routes automatically

## Examples

See the following files for implementation examples:
- `src/app/(home)/page.tsx` - Basic session usage
- `src/app/dashboard/page.tsx` - Full protected dashboard
- `components/form/LoginForm.tsx` - Authentication forms
- `src/hooks/useAuth.ts` - Custom session utilities
