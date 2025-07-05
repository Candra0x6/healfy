import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createInitialChacarter } from "@/service/api/user-character";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return ApiResponse.error(
        validationResult.error.errors.map(err => err.message).join(", "),
        400
      );
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return ApiResponse.error("User with this email already exists", 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        emailVerified: 'now',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Create initial character for the user
    await createInitialChacarter(user.id);

    return ApiResponse.success(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        message: "User registered successfully",
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return errorHandler(error as ApiError);
  }
}
