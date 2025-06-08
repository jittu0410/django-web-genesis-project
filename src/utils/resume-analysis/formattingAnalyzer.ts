
export const analyzeFormatting = (text: string): number => {
  let score = 90; // Start with high score
  
  // Penalize for ATS-unfriendly elements
  if (text.includes('�') || text.includes('□')) score -= 20; // Encoding issues
  if (text.includes('\t')) score -= 10; // Tables detected
  if (text.split('\n').length < 5) score -= 15; // Too few line breaks
  if (text.length < 200) score -= 25; // Too short
  if (!/[A-Z][a-z]+ [A-Z][a-z]+/.test(text)) score -= 15; // No proper name format
  
  // Check for good formatting indicators
  if (/[•\-\*]\s+/.test(text)) score += 5; // Has bullet points
  if (/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/.test(text)) score += 5; // Good date format
  
  console.log('Formatting score:', Math.max(score, 40));
  return Math.max(score, 40);
};
