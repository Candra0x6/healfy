# Authentication System

This directory contains the complete CRUD authentication system for the Healthy app.

## Features

### API Routes

#### Authentication Routes (`/api/auth/`)

- **POST `/api/auth/register`** - User registration
- **POST `/api/auth/login`** - User login with email/password
- **GET `/api/auth/profile`** - Get current user profile
- **PATCH `/api/auth/profile`** - Update user profile
- **DELETE `/api/auth/profile`** - Delete user account (soft delete)
- **PATCH `/api/auth/change-password`** - Change user password
- **POST `/api/auth/forgot-password`** - Initiate password reset
- **POST `/api/auth/reset-password`** - Reset password with token

#### User Management Routes (`/api/auth/users/`)

- **GET `/api/auth/users`** - List all users (Admin only)
- **POST `/api/auth/users`** - Create new user (Admin only)
- **GET `/api/auth/users/[userId]`** - Get specific user (Admin or own account)
- **PATCH `/api/auth/users/[userId]`** - Update user (Admin or own account)
- **DELETE `/api/auth/users/[userId]`** - Delete user (Admin only)

### Components

#### Forms

- **`LoginForm`** - Complete login form with validation
- **`RegisterForm`** - User registration form with validation

#### Pages

- **`/sign-in`** - Login page
- **`/register`** - Registration page

### Features

1. **Email/Password Authentication**: Traditional username and password login
2. **Google OAuth**: Integration with NextAuth.js Google provider
3. **Password Security**: Bcrypt hashing for passwords
4. **JWT Tokens**: Optional JWT token generation for API authentication
5. **Role-Based Access**: User and Admin roles
6. **Input Validation**: Zod schema validation for all inputs
7. **Error Handling**: Comprehensive error handling and responses
8. **Password Strength**: Minimum 8 characters requirement
9. **Email Validation**: Proper email format validation
10. **Account Management**: Profile updates, password changes, account deletion

## Database Integration

The system integrates with your existing Prisma schema, using:

- `User` model for user data
- `Character` model for user characters (auto-created on registration)
- Supports existing OAuth flow through NextAuth.js

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **Session Management**: NextAuth.js session handling
3. **CSRF Protection**: Built-in CSRF protection
4. **Input Sanitization**: Zod validation prevents injection attacks
5. **Soft Delete**: User accounts are soft-deleted for data integrity
6. **Role-Based Authorization**: Admin-only routes are properly protected

## Usage Examples

### Registration

```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword123'
  })
})
```

### Login

```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword123'
  })
})
```

### Get Profile

```typescript
// Requires authentication
const response = await fetch('/api/auth/profile')
```

### Admin: List Users

```typescript
// Requires Admin role
const response = await fetch('/api/auth/users?page=1&limit=10&search=john')
```

## Configuration

Make sure to set up the following environment variables:

```env
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Integration with NextAuth.js

The system works alongside your existing NextAuth.js configuration:

- Credentials provider added for email/password login
- Google provider continues to work as before
- Session management handled by NextAuth.js
- Compatible with existing OAuth flow

## Error Handling

All API routes return consistent JSON responses:

```typescript
// Success response
{
  success: true,
  data: { /* response data */ },
  message: "Operation successful"
}

// Error response
{
  success: false,
  error: "Error message",
  code: 400
}
```

## Types

TypeScript interfaces are provided in `/types/auth.ts` for type safety:

- `User`
- `AuthUser`
- `LoginCredentials`
- `RegisterCredentials`
- `UserProfile`
- `AuthResponse`
- And more...
