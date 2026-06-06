import { classifyContent } from "../classification/geminiClassifier.service";
import { calculateImpact } from "../impact/impactEngine.service";

export const processContent = async (payload: any) => {
  const content = `
Title: ${payload.title}

Description: ${payload.description}
`;
  const classification = await classifyContent(content);

  const impact = calculateImpact(classification);

  return {
    classification,
    impact,
  };
};
