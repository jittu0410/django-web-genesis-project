
interface ResumeAnalysis {
  ats_score: number;
  keywords_found: string[];
  keywords_missing: string[];
  section_scores: {
    contact_info: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
  };
}

export const analyzeResumeContent = (resumeText: string, jobDescription?: string): ResumeAnalysis => {
  // Common ATS-friendly keywords across industries
  const commonATSKeywords = [
    'managed', 'developed', 'implemented', 'created', 'designed', 'led', 'achieved',
    'improved', 'increased', 'reduced', 'optimized', 'collaborated', 'coordinated',
    'supervised', 'established', 'maintained', 'analyzed', 'executed', 'delivered'
  ];

  // Technical skills keywords
  const techKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'sql',
    'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'api',
    'html', 'css', 'typescript', 'mongodb', 'postgresql', 'redis', 'jenkins'
  ];

  // Analyze text content
  const textLower = resumeText.toLowerCase();
  const wordCount = resumeText.split(/\s+/).length;
  
  // Check for essential sections
  const hasContactInfo = /email|phone|linkedin|github/i.test(resumeText);
  const hasSummary = /summary|objective|profile/i.test(resumeText);
  const hasExperience = /experience|employment|work history/i.test(resumeText);
  const hasEducation = /education|degree|university|college/i.test(resumeText);
  const hasSkills = /skills|technologies|technical/i.test(resumeText);
  
  // Check for quantifiable achievements
  const hasNumbers = /\d+%|\d+\+|\$\d+|\d+ years|\d+ months/g.test(resumeText);
  
  // Find keywords present in resume
  const foundKeywords = [...commonATSKeywords, ...techKeywords].filter(keyword => 
    textLower.includes(keyword.toLowerCase())
  );
  
  // Determine missing keywords based on job description or common needs
  const missingKeywords = [...commonATSKeywords, ...techKeywords]
    .filter(keyword => !textLower.includes(keyword.toLowerCase()))
    .slice(0, 8); // Limit to most relevant missing keywords
  
  // Calculate section scores
  const sectionScores = {
    contact_info: hasContactInfo ? (textLower.includes('linkedin') && textLower.includes('email') ? 95 : 80) : 40,
    summary: hasSummary ? (wordCount > 500 ? 85 : 70) : 30,
    experience: hasExperience ? (hasNumbers ? 90 : 75) : 25,
    education: hasEducation ? 85 : 60,
    skills: hasSkills ? (foundKeywords.length > 5 ? 85 : 70) : 40,
    formatting: calculateFormattingScore(resumeText)
  };
  
  // Calculate overall ATS score
  const avgSectionScore = Object.values(sectionScores).reduce((a, b) => a + b, 0) / Object.values(sectionScores).length;
  const keywordBonus = Math.min(foundKeywords.length * 2, 20);
  const ats_score = Math.min(Math.round(avgSectionScore + keywordBonus), 100);
  
  return {
    ats_score,
    keywords_found: foundKeywords.slice(0, 12),
    keywords_missing: missingKeywords.slice(0, 8),
    section_scores: sectionScores
  };
};

const calculateFormattingScore = (text: string): number => {
  let score = 85; // Base score
  
  // Penalize for potential formatting issues
  if (text.includes('�') || text.includes('□')) score -= 15; // Encoding issues
  if (text.split('\n').length < 10) score -= 10; // Too few line breaks
  if (text.length < 300) score -= 20; // Too short
  if (!/[A-Z][a-z]+ [A-Z][a-z]+/.test(text)) score -= 10; // No proper name format
  
  return Math.max(score, 40);
};
