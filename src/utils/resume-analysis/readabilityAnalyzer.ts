
export const analyzeReadability = (text: string): number => {
  let score = 80; // Base score
  
  // Check for consistency indicators
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;
  
  // Bullet point consistency
  const bulletTypes = (text.match(/^[\s]*[•\-\*]\s+/gm) || []).length;
  if (bulletTypes > 5) score += 10; // Good use of bullets
  
  // Date format consistency
  const dateMatches = text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/g) || [];
  if (dateMatches.length > 2) score += 5; // Consistent date formatting
  
  // Penalize for readability issues
  if (avgSentenceLength > 25) score -= 10; // Sentences too long
  if (!/^[A-Z]/.test(text.trim())) score -= 10; // Doesn't start with capital
  if (text.includes('  ')) score -= 5; // Double spaces
  
  // Grammar indicators (basic)
  const grammarIssues = (text.match(/\b(?:teh|recieve|seperate|occured|accomodate)\b/gi) || []).length;
  score -= grammarIssues * 5;
  
  console.log('Readability score:', Math.max(score, 50));
  return Math.max(score, 50);
};
