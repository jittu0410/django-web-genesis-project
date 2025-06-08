
export interface ResumeAnalysis {
  ats_score: number;
  keywords_found: string[];
  keywords_missing: string[];
  section_scores: {
    contact_info: number;
    summary: number;
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

export interface KeywordAnalysisResult {
  score: number;
  found: string[];
  missing: string[];
}

export interface SectionAnalysisResult {
  score: number;
  sections: {
    contact_info: number;
    summary: number;
    education: number;
    skills: number;
    formatting: number;
  };
}
