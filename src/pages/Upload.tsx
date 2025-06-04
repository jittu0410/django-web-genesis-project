
import React, { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, User, Upload as UploadIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { useResume } from '@/hooks/useResume';
import { AuthModal } from '@/components/auth/AuthModal';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuthContext();
  const { uploadResume, analyzeResume, isUploading, isAnalyzing, resumes } = useResume();

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    setUploadedFile(file);
    if (user) {
      console.log('Uploading resume for user:', user.id);
      uploadResume({ file, userId: user.id });
    }
  };

  const handleAnalyze = () => {
    console.log('Starting analysis...');
    if (resumes && resumes.length > 0) {
      const latestResume = resumes[0];
      console.log('Analyzing latest resume:', latestResume.id);
      analyzeResume({ resumeId: latestResume.id, jobDescription: undefined });
    } else if (uploadedFile && user) {
      console.log('No resumes found, please wait for upload to complete');
    }
  };

  const latestResume = resumes && resumes.length > 0 ? resumes[0] : null;
  const canAnalyze = latestResume && !isUploading;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                  Dashboard
                </Button>
              </Link>
              
              {user && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm text-gray-300">{user.email}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="text-gray-400 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
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

            {/* Show upload status */}
            {isUploading && (
              <div className="text-center mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                <p className="text-gray-300">Uploading your resume...</p>
              </div>
            )}

            {/* Show latest uploaded resume */}
            {latestResume && !isUploading && (
              <div className="bg-gray-800/50 rounded-xl p-6 mb-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <UploadIcon className="w-5 h-5 text-green-400" />
                  <div>
                    <h3 className="font-medium text-white">Latest Resume</h3>
                    <p className="text-sm text-gray-400">{latestResume.filename}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Uploaded {new Date(latestResume.uploaded_at).toLocaleString()}
                </p>
              </div>
            )}

            {/* Analyze button */}
            {canAnalyze && (
              <div className="text-center">
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

            {/* Instructions */}
            <div className="mt-8 bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-3">How it works:</h3>
              <ol className="text-sm text-gray-300 space-y-2">
                <li>1. Upload your resume (PDF, DOC, or DOCX)</li>
                <li>2. Click "Analyze Resume" to start the ATS scan</li>
                <li>3. Get your ATS score and detailed feedback</li>
                <li>4. View results in your dashboard</li>
              </ol>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    </ProtectedRoute>
  );
};

export default Upload;
