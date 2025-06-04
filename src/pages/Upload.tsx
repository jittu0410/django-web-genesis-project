
import React, { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Upload as UploadIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    console.log('Starting analysis...');
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis without requiring authentication
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis results
      const mockResults = {
        ats_score: Math.floor(Math.random() * 40) + 60,
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
        }
      };
      
      setAnalysisResult(mockResults);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
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
              Get your ATS score and detailed analysis in seconds
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
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
              
              {isAnalyzing && (
                <p className="text-sm text-gray-400 mt-3">
                  This may take a few moments...
                </p>
              )}
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  ATS Analysis Results
                </h3>
                
                {/* ATS Score */}
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-purple-400 mb-2">
                    {analysisResult.ats_score}%
                  </div>
                  <p className="text-gray-300">ATS Compatibility Score</p>
                </div>

                {/* Section Scores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(analysisResult.section_scores).map(([section, score]) => (
                    <div key={section} className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-purple-300">{score as number}%</div>
                      <div className="text-xs text-gray-400 capitalize">
                        {section.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Keywords */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Keywords Found</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords_found.map((keyword: string, index: number) => (
                        <span key={index} className="bg-green-900/30 text-green-300 px-2 py-1 rounded-md text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords_missing.map((keyword: string, index: number) => (
                        <span key={index} className="bg-orange-900/30 text-orange-300 px-2 py-1 rounded-md text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Improvement Suggestions</h4>
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
              <li>2. Click "Analyze Resume" to start the ATS scan</li>
              <li>3. Get your ATS score and detailed feedback instantly</li>
              <li>4. No signup required - completely free!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
