export type lifestyleAIResponse = {
  id: string;
  isActive: boolean;
  activity: string;
  impactFactor: number;
  targetConditions: string[];
  implementationPlan: {
    frequency: string;
    duration: string;
    intensity: string;
    precautions: string[];
  };
};
export type HealthAnalysis = {
  healthScore: {
    score: number;
    interpretation: {
      rating: number;
      message: string;
    };
    bmiAssessment: {
      bmiValue: number;
      category: string;
      healthImplications: string;
    };
  };
  potentialConditions: Array<{
    name: string;
    probability: number;
    severity: "low" | "medium" | "high";
    medicalAttention: "monitoring" | "consult" | "immediate";
    detailedAnalysis: string;
    recommendedTests: string[];
  }>;
  lifestyleModifications: Array<lifestyleAIResponse>;
  nutritionalRecommendations: Array<{
    food: string;
    benefits: string;
    targetSymptoms: string[];
    servingGuidelines: {
      amount: string;
      frequency: string;
      bestTimeToConsume: string;
      preparations: string[];
    };
  }>;
  healthSummary: {
    overallAssessment: string;
    urgentConcerns: string[];
    shortTermActions: string[];
    longTermStrategy: string;
    followUpRecommendations: string;
  };
};
