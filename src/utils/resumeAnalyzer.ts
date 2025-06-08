
import { ResumeAnalysis } from './resume-analysis/types';
import { analyzeKeywords } from './resume-analysis/keywordAnalyzer';
import { analyzeSections } from './resume-analysis/sectionAnalyzer';
import { analyzeFormatting } from './resume-analysis/formattingAnalyzer';
import { analyzeReadability } from './resume-analysis/readabilityAnalyzer';

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
  
  // Weighted calculation: 20% keyword + 25% section + 30% formatting + 25% readability
  const ats_score = Math.round(
    0.2 * keywordAnalysis.score +
    0.25 * sectionAnalysis.score +
    0.3 * formattingScore +
    0.25 * readabilityScore
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
