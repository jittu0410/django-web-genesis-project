
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { resumeId, jobDescription } = await req.json()

    // Get resume data
    const { data: resume, error: resumeError } = await supabaseClient
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single()

    if (resumeError || !resume) {
      throw new Error('Resume not found')
    }

    // Create analysis record
    const { data: analysis, error: analysisError } = await supabaseClient
      .from('ats_analyses')
      .insert({
        resume_id: resumeId,
        status: 'processing'
      })
      .select()
      .single()

    if (analysisError) {
      throw new Error('Failed to create analysis record')
    }

    // Start background processing
    EdgeRuntime.waitUntil(processResume(supabaseClient, resume, analysis.id, jobDescription))

    return new Response(
      JSON.stringify({ analysisId: analysis.id, status: 'processing' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})

async function processResume(supabaseClient: any, resume: any, analysisId: string, jobDescription?: string) {
  try {
    console.log(`Processing resume: ${resume.filename}`)
    
    // Download file from storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('resumes')
      .download(resume.file_url.split('/').pop())

    if (downloadError) {
      throw new Error('Failed to download resume file')
    }

    // Extract text from file (simplified version)
    const extractedText = await extractTextFromFile(fileData, resume.file_type)
    
    // Perform ATS analysis
    const analysisResult = performATSAnalysis(extractedText, jobDescription)

    // Update analysis with results
    const { error: updateError } = await supabaseClient
      .from('ats_analyses')
      .update({
        status: 'completed',
        ats_score: analysisResult.score,
        extracted_text: extractedText,
        keywords_found: analysisResult.keywordsFound,
        keywords_missing: analysisResult.keywordsMissing,
        suggestions: analysisResult.suggestions,
        section_scores: analysisResult.sectionScores,
        detailed_feedback: analysisResult.detailedFeedback,
        completed_at: new Date().toISOString()
      })
      .eq('id', analysisId)

    if (updateError) {
      throw new Error('Failed to update analysis results')
    }

    console.log(`Analysis completed for resume: ${resume.filename}`)

  } catch (error) {
    console.error('Error processing resume:', error)
    
    // Update analysis with error status
    await supabaseClient
      .from('ats_analyses')
      .update({
        status: 'failed',
        detailed_feedback: { error: error.message }
      })
      .eq('id', analysisId)
  }
}

async function extractTextFromFile(fileData: Blob, fileType: string): Promise<string> {
  // Simplified text extraction - in production, you'd use proper PDF/DOC parsers
  if (fileType === 'pdf') {
    // For PDF files, you'd use a library like pdf-parse
    return "Extracted text from PDF (placeholder implementation)"
  } else if (fileType === 'doc' || fileType === 'docx') {
    // For Word documents, you'd use mammoth.js or similar
    return "Extracted text from Word document (placeholder implementation)"
  }
  
  return fileData.text()
}

function performATSAnalysis(text: string, jobDescription?: string) {
  // Simplified ATS analysis algorithm
  const commonKeywords = [
    'experience', 'skills', 'education', 'management', 'leadership',
    'project', 'team', 'development', 'analysis', 'communication'
  ]

  const foundKeywords = commonKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword)
  )

  const missingKeywords = commonKeywords.filter(keyword => 
    !text.toLowerCase().includes(keyword)
  )

  // Job description analysis if provided
  if (jobDescription) {
    const jobKeywords = extractKeywordsFromJobDescription(jobDescription)
    const jobKeywordsFound = jobKeywords.filter(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    )
    
    foundKeywords.push(...jobKeywordsFound)
  }

  const score = Math.min(Math.round((foundKeywords.length / commonKeywords.length) * 100), 100)

  return {
    score,
    keywordsFound: foundKeywords,
    keywordsMissing: missingKeywords,
    suggestions: generateSuggestions(missingKeywords, score),
    sectionScores: {
      contact_info: Math.random() * 100,
      work_experience: Math.random() * 100,
      education: Math.random() * 100,
      skills: Math.random() * 100,
      formatting: Math.random() * 100
    },
    detailedFeedback: {
      strengths: ["Clear formatting", "Good keyword usage"],
      improvements: ["Add more relevant keywords", "Improve section organization"]
    }
  }
}

function extractKeywordsFromJobDescription(jobDescription: string): string[] {
  // Simple keyword extraction - in production, use NLP libraries
  const words = jobDescription.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
  
  return [...new Set(words)]
}

function generateSuggestions(missingKeywords: string[], score: number): string[] {
  const suggestions = []
  
  if (score < 60) {
    suggestions.push("Consider adding more relevant keywords to improve ATS compatibility")
  }
  
  if (missingKeywords.length > 5) {
    suggestions.push("Include more industry-specific terms and skills")
  }
  
  suggestions.push("Ensure consistent formatting throughout the document")
  suggestions.push("Use bullet points for better readability")
  
  return suggestions
}
