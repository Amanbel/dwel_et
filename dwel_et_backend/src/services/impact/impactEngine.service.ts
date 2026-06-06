export const calculateImpact = (classification: any) => {
  let score = 0;

  const topicWeights: Record<string, number> = {
    education: 3,
    finance: 2,
    fitness: 3,
    technology: 2,
    entertainment: 1,
    violence: -4,
  };

  const emotionWeights: Record<string, number> = {
    motivation: 3,
    inspiration: 3,
    positivity: 2,
    anxiety: -4,
    stress: -3,
  };

  classification.topics?.forEach((topic: string) => {
    score += topicWeights[topic] || 0;
  });

  classification.emotions?.forEach((emotion: string) => {
    score += emotionWeights[emotion] || 0;
  });

  return {
    wellbeingScore: score,
  };
};
