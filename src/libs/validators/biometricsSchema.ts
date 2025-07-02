import { z } from "zod";

// Custom transformer to handle Decimal as string
const decimalString = z
  .string()
  .refine(
    (value) => {
      return !Number.isNaN(Number(value));
    },
    {
      message: "Invalid decimal string",
    }
  )
  .transform((value) => {
    return value.toString();
  });

export const biometricsSchema = z.object({
  age: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Age must be greater than 0",
    })
    .refine((value) => Number(value) < 200, {
      message: "Age must be less than 200",
    }),
  gender: z.enum(["MALE", "FEMALE"]),
  avargeDailyBP: decimalString.refine((value) => Number(value) > 0, {
    message: "Average daily blood pressure must be greater than 0",
  }),
  heartRate: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Heart rate must be greater than 0",
    })
    .refine((value) => Number(value) < 250, {
      message: "Heart rate must be less than 250",
    }),
  restingHeartRate: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Resting heart rate must be greater than 0",
    })
    .refine((value) => Number(value) < 200, {
      message: "Resting heart rate must be less than 200",
    }),
  waistCircumference: decimalString.refine((value) => Number(value) > 0, {
    message: "Waist circumference must be greater than 0",
  }),
  hipCircumference: decimalString.refine((value) => Number(value) > 0, {
    message: "Hip circumference must be greater than 0",
  }),
  height: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Height must be greater than 0",
    })
    .refine((value) => Number(value) < 300, {
      message: "Height must be less than 300",
    }),
  weight: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Weight must be greater than 0",
    })
    .refine((value) => Number(value) < 500, {
      message: "Weight must be less than 500",
    }),
});

export type BiometricsPayload = z.infer<typeof biometricsSchema>;
