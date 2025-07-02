import { ZodError } from "zod";
import { ApiResponse } from "./src/utils/apiResponse";
import { AppError } from "./src/utils/apiError";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    "/api/:path*",
    // Tambahkan path lain yang membutuhkan autentikasi
  ],
};

export function errorHandler(error: AppError | ZodError | Error) {
  if (error instanceof AppError) {
    return ApiResponse.error(error.message, error.statusCode);
  }

  if (error instanceof ZodError) {
    return ApiResponse.error(`Validation error${error}`, 400);
  }

  console.error("Unhandled error:", error);
  return ApiResponse.error(`An unexpected error occurred ${error}`, 500);
}
