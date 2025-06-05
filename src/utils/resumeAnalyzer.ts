
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
  score_breakdown: {
    keyword_match: number;
    section_match: number;
    formatting_score: number;
    readability_consistency: number;
  };
}

export const analyzeResumeContent = (resumeText: string, jobDescription?: string): ResumeAnalysis => {
  console.log('Starting comprehensive ATS analysis...');
  
  // 1️⃣ KEYWORD MATCHING (40-50% weight)
  const keywordAnalysis = analyzeKeywords(resumeText, jobDescription);
  
  // 2️⃣ SECTION MATCHING (10-15% weight)
  const sectionAnalysis = analyzeSections(resumeText);
  
  // 3️⃣ FORMATTING CHECK (10-20% weight)
  const formattingScore = analyzeFormatting(resumeText);
  
  // 4️⃣ READABILITY & CONSISTENCY (10-15% weight)
  const readabilityScore = analyzeReadability(resumeText);
  
  // Calculate weighted ATS score
  const scoreBreakdown = {
    keyword_match: keywordAnalysis.score,
    section_match: sectionAnalysis.score,
    formatting_score: formattingScore,
    readability_consistency: readabilityScore
  };
  
  // Weighted calculation: 50% keyword + 15% section + 20% formatting + 15% readability
  const ats_score = Math.round(
    0.5 * keywordAnalysis.score +
    0.15 * sectionAnalysis.score +
    0.2 * formattingScore +
    0.15 * readabilityScore
  );
  
  console.log('ATS Score breakdown:', scoreBreakdown);
  console.log('Final ATS Score:', ats_score);
  
  return {
    ats_score: Math.min(ats_score, 100),
    keywords_found: keywordAnalysis.found,
    keywords_missing: keywordAnalysis.missing,
    section_scores: sectionAnalysis.sections,
    score_breakdown: scoreBreakdown
  };
};

// 1️⃣ KEYWORD MATCHING ANALYSIS
const analyzeKeywords = (resumeText: string, jobDescription?: string) => {
  const textLower = resumeText.toLowerCase();
  
  // Common ATS keywords across industries
  const commonKeywords = [
    'managed', 'developed', 'implemented', 'created', 'designed', 'led', 'achieved',
    'improved', 'increased', 'reduced', 'optimized', 'collaborated', 'coordinated',
    'supervised', 'established', 'maintained', 'analyzed', 'executed', 'delivered',
    'strategic', 'leadership', 'communication', 'problem-solving', 'team'
  ];
  
  // Technical skills keywords
  const techKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'sql',
    'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'api',
    'html', 'css', 'typescript', 'mongodb', 'postgresql', 'machine learning',
    'data analysis', 'project management', 'excel', 'powerpoint', 'salesforce'
  ];
  
  let relevantKeywords = [...commonKeywords, ...techKeywords];
  
  // If job description provided, extract additional keywords
  if (jobDescription) {
    const jdKeywords = extractJobDescriptionKeywords(jobDescription);
    relevantKeywords = [...relevantKeywords, ...jdKeywords];
    // Remove duplicates
    relevantKeywords = [...new Set(relevantKeywords)];
  }
  
  // Find keywords present in resume
  const foundKeywords = relevantKeywords.filter(keyword => 
    textLower.includes(keyword.toLowerCase())
  );
  
  // Calculate keyword match score
  const keywordScore = relevantKeywords.length > 0 
    ? Math.round((foundKeywords.length / relevantKeywords.length) * 100)
    : 80; // Default if no job description
  
  // Missing keywords (limit to most important ones)
  const missingKeywords = relevantKeywords
    .filter(keyword => !textLower.includes(keyword.toLowerCase()))
    .slice(0, 10);
  
  console.log(`Keyword Analysis: ${foundKeywords.length}/${relevantKeywords.length} keywords found`);
  
  return {
    score: Math.min(keywordScore, 100),
    found: foundKeywords.slice(0, 15),
    missing: missingKeywords
  };
};

// Extract keywords from job description
const extractJobDescriptionKeywords = (jobDescription: string): string[] => {
  const jdLower = jobDescription.toLowerCase();
  const extractedKeywords: string[] = [];
  
  // Common patterns in job descriptions
  const skillPatterns = [
    /\b(?:experience with|proficient in|knowledge of|familiar with)\s+([^.,\n]+)/gi,
    /\b(?:skills?|technologies?|tools?):?\s*([^.;\n]+)/gi,
    /\b(?:required|preferred|must have|should have):\s*([^.;\n]+)/gi
  ];
  
  skillPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(jdLower)) !== null) {
      const skills = match[1].split(/[,&\s]+/).filter(skill => 
        skill.length > 2 && !/\b(?:and|or|with|in|of|the|a|an)\b/.test(skill)
      );
      extractedKeywords.push(...skills);
    }
  });
  
  return [...new Set(extractedKeywords)].slice(0, 20);
};

// 2️⃣ SECTION MATCHING ANALYSIS
const analyzeSections = (resumeText: string) => {
  const text = resumeText.toLowerCase();
  
  // Check for essential sections
  const sections = {
    contact_info: checkContactInfo(resumeText),
    summary: checkSummary(text),
    experience: checkExperience(text),
    education: checkEducation(text),
    skills: checkSkills(text),
    formatting: 85 // Will be calculated separately
  };
  
  // Calculate section match score
  const sectionScores = Object.values(sections);
  const avgSectionScore = sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
  
  console.log('Section scores:', sections);
  
  return {
    score: Math.round(avgSectionScore),
    sections
  };
};

const checkContactInfo = (text: string): number => {
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  const hasAddress = /\b\d+\s+\w+.*(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln)\b/i.test(text);
  
  let score = 0;
  if (hasEmail) score += 40;
  if (hasPhone) score += 30;
  if (hasLinkedIn) score += 20;
  if (hasAddress) score += 10;
  
  return Math.min(score, 100);
};

const checkSummary = (text: string): number => {
  const hasSummary = /\b(?:summary|objective|profile|about)\b/i.test(text);
  const wordCount = text.split(/\s+/).length;
  
  if (!hasSummary) return 30;
  if (wordCount > 300) return 85;
  return 70;
};

const checkExperience = (text: string): number => {
  const hasExperience = /\b(?:experience|employment|work history|professional experience)\b/i.test(text);
  const hasNumbers = /\d+(?:%|\+|\$|k|years?|months?)\b/g.test(text);
  const hasBullets = /[•\-\*]\s+/.test(text);
  
  if (!hasExperience) return 25;
  
  let score = 60;
  if (hasNumbers) score += 20;
  if (hasBullets) score += 15;
  
  return Math.min(score, 95);
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

// 3️⃣ FORMATTING CHECK
const analyzeFormatting = (text: string): number => {
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

// 4️⃣ READABILITY & CONSISTENCY
const analyzeReadability = (text: string): number => {
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
