import { classifyContent } from "../classification/gemmaClassifier.service";
import { calculateImpact } from "../impact/impactEngine.service";

export const processContent = async (payload: any) => {
  const classification = await classifyContent(
    payload.title,
    payload.description,
  );

  const impact = calculateImpact(classification);

  return {
    classification,
    impact,
  };
};
