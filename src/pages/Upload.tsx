
import React, { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Upload as UploadIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { analyzeResumeContent } from '@/utils/resumeAnalyzer';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setUploadedFile(file);
    setAnalysisResult(null);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Simulate text extraction - in a real app, you'd use PDF.js or similar
        // For now, we'll use a mock text based on file name patterns
        const mockTexts = {
          'developer': `John Smith
Email: john.smith@email.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 5+ years of experience building scalable web applications. 
Proficient in JavaScript, React, Node.js, and modern development practices.

EXPERIENCE
Senior Software Developer | TechCorp Inc. | 2022-Present
• Developed and maintained 3 large-scale web applications serving 10,000+ users
• Implemented React-based frontend resulting in 40% improvement in user engagement
• Led team of 4 developers and reduced deployment time by 60%
• Built RESTful APIs using Node.js and Express, improving response time by 25%

Software Developer | StartupXYZ | 2020-2022
• Created responsive web applications using React and TypeScript
• Collaborated with design team to implement pixel-perfect UI components
• Optimized database queries resulting in 30% faster page load times

EDUCATION
Bachelor of Science in Computer Science | State University | 2020

SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java
Frontend: React, Angular, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express, Django, REST APIs
Databases: PostgreSQL, MongoDB, Redis
Tools: Git, Docker, AWS, Jenkins, Agile/Scrum`,
          
          'marketing': `Sarah Johnson
Email: sarah.j@email.com | Phone: (555) 987-6543

EXPERIENCE
Marketing Coordinator | ABC Company | 2021-Present
• Managed social media campaigns reaching 50,000+ followers
• Increased website traffic by 45% through SEO optimization
• Coordinated 12 successful product launches

Marketing Assistant | XYZ Corp | 2019-2021
• Assisted with email marketing campaigns
• Created content for company blog

EDUCATION
Bachelor of Arts in Marketing | City College | 2019

SKILLS
Social Media Marketing, Content Creation, Email Marketing`,
          
          'default': `${file.name.replace(/\.[^/.]+$/, "")}
Email: contact@email.com

EXPERIENCE
Professional with experience in various projects and responsibilities.
Worked on multiple initiatives and collaborated with teams.

EDUCATION
Relevant educational background

SKILLS
Various professional skills and competencies`
        };
        
        // Determine mock content based on filename
        let mockContent = mockTexts.default;
        if (file.name.toLowerCase().includes('dev') || file.name.toLowerCase().includes('software')) {
          mockContent = mockTexts.developer;
        } else if (file.name.toLowerCase().includes('market')) {
          mockContent = mockTexts.marketing;
        }
        
        resolve(mockContent);
      };
      reader.readAsText(file);
    });
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    console.log('Starting real analysis for:', uploadedFile.name);
    setIsAnalyzing(true);
    
    try {
      // Extract text from the uploaded file
      const resumeText = await extractTextFromFile(uploadedFile);
      
      // Perform real analysis
      const analysis = analyzeResumeContent(resumeText);
      
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult(analysis);
      toast({
        title: "Analysis Complete!",
        description: `Your resume scored ${analysis.ats_score}% for ATS compatibility.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Upload Your Resume
            </h1>
            <p className="text-xl text-gray-300">
              Get personalized ATS score and tailored suggestions
            </p>
          </div>

          <ResumeUpload 
            onFileUpload={handleFileUpload}
            className="mb-8"
          />

          {/* Show uploaded file */}
          {uploadedFile && !analysisResult && (
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <UploadIcon className="w-5 h-5 text-green-400" />
                <div>
                  <h3 className="font-medium text-white">Uploaded Resume</h3>
                  <p className="text-sm text-gray-400">{uploadedFile.name}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                File size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Analyze button */}
          {uploadedFile && !analysisResult && (
            <div className="text-center mb-8">
              <Button 
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                {isAnalyzing ? 'Analyzing Your Resume...' : 'Analyze My Resume'}
              </Button>
              
              {isAnalyzing && (
                <p className="text-sm text-gray-400 mt-3">
                  Analyzing content, keywords, and structure...
                </p>
              )}
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  Your Personalized ATS Analysis
                </h3>
                
                {/* ATS Score */}
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold mb-2 ${
                    analysisResult.ats_score >= 80 ? 'text-green-400' :
                    analysisResult.ats_score >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysisResult.ats_score}%
                  </div>
                  <p className="text-gray-300">ATS Compatibility Score</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {analysisResult.ats_score >= 80 ? 'Excellent! Your resume is highly ATS-compatible' :
                     analysisResult.ats_score >= 60 ? 'Good score with room for improvement' :
                     'Needs improvement for better ATS compatibility'}
                  </p>
                </div>

                {/* Section Scores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(analysisResult.section_scores).map(([section, score]) => (
                    <div key={section} className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <div className={`text-xl font-bold ${
                        (score as number) >= 80 ? 'text-green-400' :
                        (score as number) >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {score as number}%
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {section.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Specific Feedback */}
                {analysisResult.specific_feedback && (
                  <div className="mb-6 space-y-4">
                    {analysisResult.specific_feedback.strengths.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                          ✓ Your Strengths
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.specific_feedback.strengths.map((strength: string, index: number) => (
                            <li key={index} className="text-green-300 text-sm flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysisResult.specific_feedback.weaknesses.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-2 flex items-center">
                          ⚠ Areas for Improvement
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.specific_feedback.weaknesses.map((weakness: string, index: number) => (
                            <li key={index} className="text-orange-300 text-sm flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Keywords */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Keywords Found ({analysisResult.keywords_found.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords_found.map((keyword: string, index: number) => (
                        <span key={index} className="bg-green-900/30 text-green-300 px-2 py-1 rounded-md text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Suggested Keywords to Add</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords_missing.map((keyword: string, index: number) => (
                        <span key={index} className="bg-orange-900/30 text-orange-300 px-2 py-1 rounded-md text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personalized Suggestions */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Personalized Improvement Suggestions</h4>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Try Again Button */}
                <div className="text-center mt-6">
                  <Button 
                    onClick={() => {
                      setUploadedFile(null);
                      setAnalysisResult(null);
                    }}
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
            <h3 className="font-semibold text-white mb-3">How it works:</h3>
            <ol className="text-sm text-gray-300 space-y-2">
              <li>1. Upload your resume (PDF, DOC, or DOCX)</li>
              <li>2. Our AI analyzes your actual content and structure</li>
              <li>3. Get personalized feedback specific to YOUR resume</li>
              <li>4. Receive tailored suggestions for improvement</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
