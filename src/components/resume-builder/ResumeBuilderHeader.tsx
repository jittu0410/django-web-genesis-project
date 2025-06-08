
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResumeBuilder } from './ResumeBuilderProvider';
import { exportToPDF } from '@/utils/resumeExporter';

export const ResumeBuilderHeader = () => {
  const navigate = useNavigate();
  const { resumeData, selectedTemplate, selectedFont, selectedColor } = useResumeBuilder();

  const handleExport = () => {
    exportToPDF(resumeData, selectedTemplate, selectedFont, selectedColor);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </header>
  );
};
