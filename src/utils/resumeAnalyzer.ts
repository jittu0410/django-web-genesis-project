
interface ResumeAnalysis {
  ats_score: number;
  keywords_found: string[];
  keywords_missing: string[];
  suggestions: string[];
  section_scores: {
    contact_info: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
  };
  specific_feedback: {
    strengths: string[];
    weaknesses: string[];
    missing_sections: string[];
    formatting_issues: string[];
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
  const numberMatches = resumeText.match(/\d+%|\d+\+|\$\d+|\d+ years|\d+ months/g);
  
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
  
  // Generate specific suggestions
  const suggestions = generateSpecificSuggestions(sectionScores, hasNumbers, foundKeywords.length, textLower);
  
  // Generate specific feedback
  const specific_feedback = generateSpecificFeedback(sectionScores, textLower, numberMatches);
  
  return {
    ats_score,
    keywords_found: foundKeywords.slice(0, 12),
    keywords_missing: missingKeywords.slice(0, 8),
    suggestions,
    section_scores: sectionScores,
    specific_feedback
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

const generateSpecificSuggestions = (
  sectionScores: any, 
  hasNumbers: boolean, 
  keywordCount: number, 
  textLower: string
): string[] => {
  const suggestions = [];
  
  if (sectionScores.contact_info < 70) {
    suggestions.push("Add complete contact information including email, phone, and LinkedIn profile");
  }
  
  if (sectionScores.summary < 70) {
    suggestions.push("Include a professional summary highlighting your key achievements and career goals");
  }
  
  if (sectionScores.experience < 80) {
    if (!hasNumbers) {
      suggestions.push("Add quantifiable achievements with specific numbers, percentages, or dollar amounts");
    }
    suggestions.push("Use strong action verbs like 'implemented', 'developed', 'managed', 'achieved'");
  }
  
  if (keywordCount < 8) {
    suggestions.push("Include more industry-specific keywords and technical skills relevant to your field");
  }
  
  if (sectionScores.skills < 75) {
    suggestions.push("Add a dedicated skills section with both technical and soft skills");
  }
  
  if (!textLower.includes('certification') && !textLower.includes('certified')) {
    suggestions.push("Consider adding relevant certifications or professional development courses");
  }
  
  if (sectionScores.formatting < 80) {
    suggestions.push("Improve formatting consistency and ensure proper section headings for ATS parsing");
  }
  
  return suggestions.slice(0, 6); // Limit to most important suggestions
};

const generateSpecificFeedback = (
  sectionScores: any, 
  textLower: string, 
  numberMatches: string[] | null
): any => {
  const strengths = [];
  const weaknesses = [];
  const missing_sections = [];
  const formatting_issues = [];
  
  // Identify strengths
  if (sectionScores.contact_info > 85) strengths.push("Complete and professional contact information");
  if (sectionScores.experience > 85) strengths.push("Strong professional experience section");
  if (numberMatches && numberMatches.length > 3) strengths.push("Good use of quantifiable achievements");
  if (textLower.includes('leadership') || textLower.includes('managed team')) {
    strengths.push("Demonstrates leadership experience");
  }
  
  // Identify weaknesses
  if (sectionScores.summary < 70) weaknesses.push("Professional summary needs improvement");
  if (sectionScores.skills < 75) weaknesses.push("Skills section could be more comprehensive");
  if (!numberMatches || numberMatches.length < 2) {
    weaknesses.push("Lacks quantifiable achievements and metrics");
  }
  
  // Check for missing sections
  if (sectionScores.summary < 50) missing_sections.push("Professional Summary");
  if (sectionScores.education < 70) missing_sections.push("Education Details");
  if (sectionScores.skills < 60) missing_sections.push("Skills Section");
  
  // Check formatting issues
  if (sectionScores.formatting < 80) {
    formatting_issues.push("Inconsistent formatting detected");
    formatting_issues.push("Use standard section headings like 'Experience', 'Education', 'Skills'");
  }
  
  return {
    strengths: strengths.length > 0 ? strengths : ["Professional presentation", "Clear structure"],
    weaknesses: weaknesses.length > 0 ? weaknesses : ["Consider adding more specific achievements"],
    missing_sections,
    formatting_issues
  };
};
