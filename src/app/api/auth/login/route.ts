import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sign } from "jsonwebtoken";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponse.error(
        validationResult.error.errors.map(err => err.message).join(", "),
        400
      );
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Character: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
      },
    });

    if (!user || !user.hashedPassword) {
      return ApiResponse.error("Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isPasswordValid) {
      return ApiResponse.error("Invalid email or password", 401);
    }

    // Generate JWT token (optional, for custom auth)
    const token = sign(
      { 
        userId: user.id, 
        email: user.email,
        characterId: user.Character?.id 
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    return ApiResponse.success(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          character: user.Character,
        },
        token,
        message: "Login successful",
      },
      200
    );
  } catch (error) {
    console.error("Login error:", error);
    return errorHandler(error as ApiError);
  }
}
