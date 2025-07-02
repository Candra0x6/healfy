import { errorHandler } from "@/middleware";
import { sanitizeHealthAnalysis } from "@/src/hooks/useSanitize";
import prisma from "@/src/libs/db";
import { model } from "@/src/libs/genAI";
import { getAuthSession } from "@/src/libs/oAuth";
import { MedicalData } from "@/src/types/medicalBiometrics";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ConditionType } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const session = await getAuthSession();
    const from: MedicalData = body;

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    if (!body) {
      return ApiResponse.error("Body Not FOund", 404);
    }

    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        healthAnalysis: true,
        medicalData: true,
      },
    });

    if (data?.healthAnalysis && data?.medicalData) {
      return ApiResponse.error("Health analysis already exists", 400);
    }

    const prompt = `
        You are a medical analysis system that MUST ONLY respond with a valid JSON object. DO NOT include any explanations, comments, or additional text outside the JSON structure.

        IMPORTANT RESPONSE RULES: 
      - Return ONLY the JSON object
      - DO NOT use markdown code blocks
      - DO NOT add explanations before or after the JSON
      - DO NOT include the word "json" or any other text
      - ALL responses MUST be in English language
      - Use global medical terms and descriptions
      - Ensure all JSON values are properly formatted and enclosed in quotes when needed
      - You MUST provide EXACTLY 12 items in potentialConditions array
      - You MUST provide EXACTLY 12 items in lifestyleModifications array
      - You MUST provide EXACTLY 6 items in nutritionalRecommendations array
      
      Analyze this health data and return a single JSON object:
      
      {
        ${from.medicalHistory},
        ${from.biometrics}
        ${from.lifestyle}
      }
      Required response structure (MUST FOLLOW EXACTLY):
      {
        "healthScore": {
          "score": <health ratio score around number 0-100>,
          "interpretation": {
            "rating": <number 0-1>,
            "message": <string>
          },
          "bmiAssessment": {
            "bmiValue": <number>,
            "category": <string>,
            "healthImplications": <string>
          }
        },
        "potentialConditions": [
              // EXACTLY 12 ITEMS REQUIRED
      
          {
            "name": <string>,
            "probability": <number 0-1>,
            "severity": <"low" | "medium" | "high">,
            "medicalAttention": <"monitoring" | "consult" | "immediate">,
            "detailedAnalysis": <string>,
            "recommendedTests": [<string array>]
          }
        ],
        "lifestyleModifications": [
              // EXACTLY 12 ITEMS REQUIRED
          {
            "activity": <string>,
            "impactFactor": <number 0-1>,
            "targetConditions": [<string array>],
            "implementationPlan": {
              "frequency": <string>,
              "duration": <string>,
              "intensity": <string>,
              "precautions": [<string array>]
            }
          }
        ],
        "nutritionalRecommendations": [
              // EXACTLY 6 ITEMS REQUIRED
      
          {
            "food": <string>,
            "benefits": <string>,
            "targetSymptoms": [<string array>],
            "servingGuidelines": {
              "amount": <string>,
              "frequency": <string>,
              "bestTimeToConsume": <string>,
              "preparations": [<string array>]
            }
          }
        ],
        "healthSummary": {
          "overallAssessment": <string>,
          "urgentConcerns": [<string array>],
          "shortTermActions": [<string array>],
          "longTermStrategy": <string>,
          "followUpRecommendations": <string>
        }
      }
      
      STRICT REQUIREMENTS:
      1. potentialConditions MUST contain EXACTLY 12 different conditions, ordered by probability (highest first)
      2. lifestyleModifications MUST contain EXACTLY 12 different activities, ordered by impactFactor (highest first)
      3. nutritionalRecommendations MUST contain EXACTLY 6 different food recommendations, ordered as follows:
         - First 2: High-protein foods for malnutrition
         - Next 2: Vitamin and mineral-rich foods for immune support
         - Last 2: Foods that help with symptom management
      4. Include global context and locally available foods
      5. Use global medical terminology and culturally appropriate recommendations
      6. Consider local global healthcare access and resources
      7. Base all predictions on provided symptoms and data
      8. Ensure all number values are actual numbers, not strings
      9. Arrays must be properly formatted with square brackets
      10. All string values must be enclosed in double quotes
      11. Severity levels must be exactly "low", "medium", or "high"
      12. Medical attention levels must be exactly "monitoring", "consult", or "immediate"
      `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let generatedText = response.text();
    // Clean up the response text to ensure it's valid JSON
    generatedText = generatedText.replace(/```json\s*|\s*```/g, "");
    generatedText = generatedText.trim();

    try {
      const jsonResult = JSON.parse(generatedText);
      // Validate and sanitize the JSON structure
      const sanitizedResult = sanitizeHealthAnalysis(jsonResult);

      if (sanitizedResult) {
        const user = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          include: {
            healthAnalysis: true,
            medicalData: true,
          },
          data: {
            medicalData: {
              create: {
                biometrics: {
                  create: {
                    age: from.biometrics.age,
                    height: from.biometrics.height,
                    weight: from.biometrics.weight,
                    gender: from.biometrics.gender,
                    averageDailyBP: from.biometrics.avargeDailyBP,
                    heartRate: from.biometrics.heartRate,
                    restingHeartRate: from.biometrics.restingHeartRate,
                    waistCircumference: from.biometrics.waistCircumference,
                    hipCircumference: from.biometrics.hipCircumference,
                  },
                },
                lifestyle: {
                  create: {
                    alcoholConsumption: from.lifestyle.alcoholConsumption,
                    dietaryPattern: from.lifestyle.dietaryPattern,
                    physicalActivity: from.lifestyle.physicalActivity,
                    smokingHabit: from.lifestyle.smokingHabit,
                  },
                },
                conditions: {
                  create: from.medicalHistory.map((condition) => {
                    return {
                      name: condition as ConditionType,
                    };
                  }),
                },
              },
            },
            healthAnalysis: {
              create: {
                healthScore: {
                  create: {
                    score: sanitizedResult.healthScore.score,
                    interpretation: {
                      create: {
                        rating:
                          sanitizedResult.healthScore.interpretation.rating,
                        message:
                          sanitizedResult.healthScore.interpretation.message,
                      },
                    },
                    bmiAssessment: {
                      create: {
                        bmiValue:
                          sanitizedResult.healthScore.bmiAssessment.bmiValue,
                        category:
                          sanitizedResult.healthScore.bmiAssessment.category,
                        healthImplications:
                          sanitizedResult.healthScore.bmiAssessment
                            .healthImplications,
                      },
                    },
                  },
                },
                potentialConditions: {
                  create: sanitizedResult.potentialConditions.map(
                    (condition) => {
                      return {
                        name: condition.name,
                        probability: condition.probability,
                        severity: condition.severity,
                        medicalAttention: condition.medicalAttention,
                        detailedAnalysis: condition.detailedAnalysis,
                        recommendedTests: condition.recommendedTests,
                      };
                    }
                  ),
                },
                lifestyleModifications: {
                  create: sanitizedResult.lifestyleModifications.map(
                    (lifestyle) => {
                      return {
                        activity: lifestyle.activity,
                        impactFactor: lifestyle.impactFactor,
                        targetConditions: lifestyle.targetConditions,
                        implementationPlan: {
                          create: {
                            frequency: lifestyle.implementationPlan.frequency,
                            duration: lifestyle.implementationPlan.duration,
                            intensity: lifestyle.implementationPlan.intensity,
                            precautions:
                              lifestyle.implementationPlan.precautions,
                          },
                        },
                      };
                    }
                  ),
                },
                nutritionalRecommendations: {
                  create: sanitizedResult.nutritionalRecommendations.map(
                    (nutrition) => {
                      return {
                        benefits: nutrition.benefits,
                        food: nutrition.food,
                        servingGuidelines: {
                          create: {
                            amount: nutrition.servingGuidelines.amount,
                            bestTimeToConsume:
                              nutrition.servingGuidelines.bestTimeToConsume,
                            frequency: nutrition.servingGuidelines.frequency,
                            preparations:
                              nutrition.servingGuidelines.preparations,
                          },
                        },
                        targetSymptoms: nutrition.targetSymptoms,
                      };
                    }
                  ),
                },
                // typo fix later 😂
                healthSummery: {
                  create: {
                    followUpRecommendations:
                      sanitizedResult.healthSummary.followUpRecommendations,
                    longTermStrategy:
                      sanitizedResult.healthSummary.longTermStrategy,
                    overallAssessment:
                      sanitizedResult.healthSummary.overallAssessment,
                    shortTermActions:
                      sanitizedResult.healthSummary.shortTermActions,
                    urgentConcerns:
                      sanitizedResult.healthSummary.urgentConcerns,
                  },
                },
              },
            },
          },
        });
        return ApiResponse.success(user, 201);
      } else {
        return ApiResponse.error("Invalid Data Structure", 400);
      }
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return ApiResponse.error("Error Parsing JSON", 400);
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return errorHandler(error as ApiError);
  }
}
