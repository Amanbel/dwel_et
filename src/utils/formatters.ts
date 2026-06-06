/**
 * Format minutes into a string like "4h 12m" or "45m"
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};

/**
 * Format numbers with a sign (e.g., "+8.4" or "-1.2")
 */
export const formatImpactScore = (score: number): string => {
  if (score === 0) return '0.0';
  return score > 0 ? `+${score.toFixed(1)}` : `${score.toFixed(1)}`;
};
