
import React, { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { useResume } from '@/hooks/useResume';
import { AuthModal } from '@/components/auth/AuthModal';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuthContext();
  const { uploadResume, analyzeResume, isUploading, isAnalyzing } = useResume();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    if (user) {
      uploadResume({ file, userId: user.id });
    }
  };

  const handleAnalyze = () => {
    if (uploadedFile && user) {
      // For now, we'll analyze without job description
      // In the future, you can add a job description input
      analyzeResume({ resumeId: 'latest', jobDescription: undefined });
    }
  };

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

            {uploadedFile && (
              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isUploading || isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
              </div>
            )}
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
