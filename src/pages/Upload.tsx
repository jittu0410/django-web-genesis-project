
import React, { useState } from 'react';
import { ResumeUpload } from '@/components/ResumeUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log('File uploaded:', file.name, file.type, file.size);
  };

  const handleAnalyze = () => {
    if (uploadedFile) {
      // TODO: Implement actual analysis logic here
      console.log('Analyzing resume:', uploadedFile.name);
      alert(`Analyzing ${uploadedFile.name}... (Backend integration needed)`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
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

          {uploadedFile && (
            <div className="text-center">
              <Button 
                size="lg"
                onClick={handleAnalyze}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyze Resume
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
