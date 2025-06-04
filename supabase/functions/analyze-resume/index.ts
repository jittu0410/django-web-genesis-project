
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.9";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyzeRequest {
  resumeId: string;
  jobDescription?: string;
}

serve(async (req) => {
  console.log('Analyze resume function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request body
    const { resumeId, jobDescription }: AnalyzeRequest = await req.json();
    console.log('Processing analysis for resume:', resumeId);

    // Get resume data
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (resumeError || !resume) {
      console.error('Resume not found:', resumeError);
      throw new Error('Resume not found');
    }

    console.log('Found resume:', resume.filename);

    // Create analysis record
    const { data: analysis, error: analysisError } = await supabase
      .from('ats_analyses')
      .insert({
        resume_id: resumeId,
        status: 'processing',
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Failed to create analysis record:', analysisError);
      throw analysisError;
    }

    console.log('Created analysis record:', analysis.id);

    // Simulate resume processing and ATS scoring
    // In a real implementation, you would:
    // 1. Download the file from storage
    // 2. Extract text using PDF parsing libraries
    // 3. Analyze the content using NLP/AI
    // 4. Calculate ATS score based on various factors

    // For now, we'll simulate this with a delay and mock data
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis results
    const mockResults = {
      ats_score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
      extracted_text: 'Mock extracted text from resume...',
      keywords_found: ['javascript', 'react', 'typescript', 'node.js'],
      keywords_missing: ['python', 'aws', 'docker'],
      suggestions: [
        'Add more relevant keywords from the job description',
        'Include quantifiable achievements with numbers',
        'Optimize section headings for ATS parsing',
        'Use standard fonts and formatting'
      ],
      section_scores: {
        contact_info: 95,
        summary: 80,
        experience: 85,
        education: 90,
        skills: 75,
        formatting: 88
      },
      detailed_feedback: {
        strengths: [
          'Good use of relevant technical skills',
          'Clear professional experience section',
          'Proper contact information formatting'
        ],
        improvements: [
          'Add more industry-specific keywords',
          'Include measurable achievements',
          'Optimize bullet point structure'
        ],
        ats_tips: [
          'Use standard section headings',
          'Avoid images and graphics',
          'Use common fonts like Arial or Calibri',
          'Save as .docx or .pdf format'
        ]
      }
    };

    // Update analysis with results
    const { error: updateError } = await supabase
      .from('ats_analyses')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        ...mockResults
      })
      .eq('id', analysis.id);

    if (updateError) {
      console.error('Failed to update analysis:', updateError);
      throw updateError;
    }

    console.log('Analysis completed successfully for resume:', resumeId);

    return new Response(
      JSON.stringify({
        success: true,
        analysisId: analysis.id,
        message: 'Resume analysis completed successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
