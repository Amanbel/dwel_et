/**
 * Format timestamp to string like "Today, 09:15 AM"
 */
export const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) {
    return `Today, ${timeString}`;
  }
  
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeString}`;
};
