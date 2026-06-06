const OLLAMA_URL = "http://localhost:11434/api/generate";

export const classifyContent = async (title: string, description: string) => {
  const prompt = `
Classify this content.

Title:
${title}

Description:
${description}

Return JSON:

{
 "topics": [],
 "emotions": [],
 "sentiment": "",
 "riskLevel": ""
}
`;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();

  return JSON.parse(data.response);
};
