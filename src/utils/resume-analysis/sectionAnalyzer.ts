
import { SectionAnalysisResult } from './types';

export const analyzeSections = (resumeText: string): SectionAnalysisResult => {
  const text = resumeText.toLowerCase();
  
  // Check for essential sections (removed experience)
  const sections = {
    contact_info: checkContactInfo(resumeText),
    summary: checkSummary(text),
    education: checkEducation(text),
    skills: checkSkills(text),
    formatting: 85 // Will be calculated separately
  };
  
  // Calculate section match score
  const sectionScores = Object.values(sections);
  const avgSectionScore = sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
  
  // Add 10% extra to section match score by default
  const boostedSectionScore = Math.min(Math.round(avgSectionScore * 1.1), 100);
  
  console.log('Section scores:', sections);
  console.log('Original section score:', Math.round(avgSectionScore), '-> Boosted to:', boostedSectionScore);
  
  return {
    score: boostedSectionScore,
    sections
  };
};

const checkContactInfo = (text: string): number => {
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
  const hasPhone = /\+91[-.\s]?\d{10}|\+91[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  
  let score = 0;
  if (hasEmail) score += 40;
  if (hasPhone) score += 40;  // Increased from 30 to 40 (added the 10 from address)
  if (hasLinkedIn) score += 20;
  
  return Math.min(score, 100);
};

const checkSummary = (text: string): number => {
  const hasSummary = /\b(?:summary|objective|profile|about)\b/i.test(text);
  const wordCount = text.split(/\s+/).length;
  
  if (!hasSummary) return 30;
  if (wordCount > 300) return 85;
  return 70;
};

const checkEducation = (text: string): number => {
  const hasEducation = /\b(?:education|degree|university|college|bachelor|master|phd)\b/i.test(text);
  const hasGradYear = /\b(?:19|20)\d{2}\b/.test(text);
  
  if (!hasEducation) return 40;
  if (hasGradYear) return 90;
  return 75;
};

const checkSkills = (text: string): number => {
  const hasSkillsSection = /\b(?:skills|technical skills|core competencies|technologies)\b/i.test(text);
  const skillCount = (text.match(/\b(?:javascript|python|java|react|sql|excel|leadership|communication)\b/gi) || []).length;
  
  if (!hasSkillsSection) return 40;
  if (skillCount > 8) return 90;
  if (skillCount > 4) return 75;
  return 60;
};
