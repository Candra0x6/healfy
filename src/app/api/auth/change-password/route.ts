import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { ApiResponse } from "@/utils/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/oAuth";
import { ApiError } from "next/dist/server/api-utils";
import bcrypt from "bcryptjs";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await request.json();
    
    // Validate input
    const validationResult = changePasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponse.error(
        validationResult.error.errors.map(err => err.message).join(", "),
        400
      );
    }

    const { currentPassword, newPassword } = validationResult.data;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        hashedPassword: true,
      },
    });

    if (!user || !user.hashedPassword) {
      return ApiResponse.error("User not found or no password set", 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword);
    
    if (!isCurrentPasswordValid) {
      return ApiResponse.error("Current password is incorrect", 400);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return ApiResponse.success(
      { message: "Password changed successfully" },
      200
    );
  } catch (error) {
    console.error("Change password error:", error);
    return errorHandler(error as ApiError);
  }
}
