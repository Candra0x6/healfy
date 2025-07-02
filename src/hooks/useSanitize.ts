import { HealthAnalysis } from "../types/genrateResponse";

function validateSeverity(severity: string): "low" | "medium" | "high" {
  const validSeverities = ["low", "medium", "high"] as const;
  return validSeverities.includes(severity as "low" | "medium" | "high")
    ? (severity as "low" | "medium" | "high")
    : "medium";
}

function validateMedicalAttention(
  attention: string
): "monitoring" | "consult" | "immediate" {
  const validAttentions = ["monitoring", "consult", "immediate"] as const;
  return validAttentions.includes(
    attention as "monitoring" | "consult" | "immediate"
  )
    ? (attention as "monitoring" | "consult" | "immediate")
    : "monitoring";
}

function validateLifestyleModifications(
  modifications: HealthAnalysis["lifestyleModifications"]
): HealthAnalysis["lifestyleModifications"] {
  if (!Array.isArray(modifications)) return [];

  return modifications.map((mod) => ({
    id: String(mod.id || ""),
    isActive: Boolean(mod.isActive),
    activity: String(mod.activity),
    impactFactor: Number(mod.impactFactor) || 0,
    targetConditions: Array.isArray(mod.targetConditions)
      ? mod.targetConditions.map(String)
      : [],
    implementationPlan: {
      frequency: String(mod.implementationPlan?.frequency || ""),
      duration: String(mod.implementationPlan?.duration || ""),
      intensity: String(mod.implementationPlan?.intensity || ""),
      precautions: Array.isArray(mod.implementationPlan?.precautions)
        ? mod.implementationPlan.precautions.map(String)
        : [],
    },
  }));
}

function validateNutritionalRecommendations(
  recommendations: HealthAnalysis["nutritionalRecommendations"]
): HealthAnalysis["nutritionalRecommendations"] {
  if (!Array.isArray(recommendations)) return [];

  return recommendations.map((rec) => ({
    food: String(rec.food),
    benefits: String(rec.benefits),
    targetSymptoms: Array.isArray(rec.targetSymptoms)
      ? rec.targetSymptoms.map(String)
      : [],
    servingGuidelines: {
      amount: String(rec.servingGuidelines?.amount || ""),
      frequency: String(rec.servingGuidelines?.frequency || ""),
      bestTimeToConsume: String(rec.servingGuidelines?.bestTimeToConsume || ""),
      preparations: Array.isArray(rec.servingGuidelines?.preparations)
        ? rec.servingGuidelines.preparations.map(String)
        : [],
    },
  }));
}

function validateHealthSummary(
  summary: HealthAnalysis["healthSummary"]
): HealthAnalysis["healthSummary"] {
  return {
    overallAssessment: String(summary?.overallAssessment || ""),
    urgentConcerns: Array.isArray(summary?.urgentConcerns)
      ? summary.urgentConcerns.map(String)
      : [],
    shortTermActions: Array.isArray(summary?.shortTermActions)
      ? summary.shortTermActions.map(String)
      : [],
    longTermStrategy: String(summary?.longTermStrategy || ""),
    followUpRecommendations: String(summary?.followUpRecommendations || ""),
  };
}

export const sanitizeHealthAnalysis = (
  data: HealthAnalysis
): HealthAnalysis | null => {
  try {
    // Validate health score
    if (
      !data.healthScore?.score ||
      typeof data.healthScore.score !== "number" ||
      data.healthScore.score < 0 ||
      data.healthScore.score > 100
    ) {
      throw new Error("Invalid health score");
    }

    // Validate potential conditions
    if (!Array.isArray(data.potentialConditions)) {
      throw new Error("Invalid potential conditions");
    }

    // Deep validation of each section
    const sanitizedData: HealthAnalysis = {
      healthScore: {
        score: data.healthScore.score,
        interpretation: {
          rating: Number(data.healthScore.interpretation.rating) || 0,
          message: String(data.healthScore.interpretation.message),
        },
        bmiAssessment: {
          bmiValue: Number(data.healthScore.bmiAssessment.bmiValue) || 0,
          category: String(data.healthScore.bmiAssessment.category),
          healthImplications: String(
            data.healthScore.bmiAssessment.healthImplications
          ),
        },
      },
      potentialConditions: data.potentialConditions.map((condition) => ({
        name: String(condition.name),
        probability: Number(condition.probability) || 0,
        severity: validateSeverity(condition.severity),
        medicalAttention: validateMedicalAttention(condition.medicalAttention),
        detailedAnalysis: String(condition.detailedAnalysis),
        recommendedTests: Array.isArray(condition.recommendedTests)
          ? condition.recommendedTests.map(String)
          : [],
      })),
      lifestyleModifications: validateLifestyleModifications(
        data.lifestyleModifications
      ),
      nutritionalRecommendations: validateNutritionalRecommendations(
        data.nutritionalRecommendations
      ),
      healthSummary: validateHealthSummary(data.healthSummary),
    };

    return sanitizedData;
  } catch (error) {
    console.error("Sanitization error:", error);
    return null;
  }
};
