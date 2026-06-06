/**
 * Helper to simulate network latency in dev
 */
export const delay = (ms: number = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
