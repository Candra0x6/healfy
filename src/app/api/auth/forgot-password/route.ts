import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { z } from "zod";
import crypto from "crypto";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponse.error(
        validationResult.error.errors.map(err => err.message).join(", "),
        400
      );
    }

    const { email } = validationResult.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return ApiResponse.success(
        { message: "If an account with that email exists, we've sent a password reset link." },
        200
      );
    }    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // In a real application, you would:
    // 1. Store the reset token in the database (create a PasswordReset model)
    // 2. Send an email with the reset link
    // For now, we'll just log it (in production, remove this)
    console.log(`Password reset token for ${email}: ${resetToken}`);
    console.log(`Reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`);

    // Here you would typically store the token in a PasswordReset table
    // and send an email. For this example, we'll skip the actual implementation

    return ApiResponse.success(
      { 
        message: "If an account with that email exists, we've sent a password reset link.",
        // In development only - remove in production
        ...(process.env.NODE_ENV === "development" && { 
          token: resetToken,
          resetUrl: `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
        })
      },
      200
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return errorHandler(error as ApiError);
  }
}
