
import { KeywordAnalysisResult } from './types';

export const analyzeKeywords = (resumeText: string, jobDescription?: string): KeywordAnalysisResult => {
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
