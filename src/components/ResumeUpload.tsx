
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onFileUpload?: (file: File) => void;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "lg";
}

export const ResumeUpload = ({ onFileUpload, className, variant = "default", size = "default" }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    onFileUpload?.(file);
    
    toast({
      title: "Resume uploaded successfully!",
      description: `${file.name} is ready for analysis.`,
    });
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-colors ${
          dragActive 
            ? 'border-purple-400 bg-purple-500/10' 
            : 'border-gray-600 hover:border-purple-500/50'
        } ${className}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          id="resume-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />
        
        <div className="text-center">
          {uploadedFile ? (
            <div className="space-y-3">
              <CheckCircle className="w-12 h-12 mx-auto text-green-400" />
              <div>
                <p className="text-lg font-medium text-white">{uploadedFile.name}</p>
                <p className="text-sm text-gray-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setUploadedFile(null)}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                Upload Different File
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-medium text-white">
                  Drop your resume here or click to browse
                </p>
                <p className="text-sm text-gray-400">
                  Supports PDF, DOC, DOCX • Max 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alternative Button Style */}
      <div className="mt-4 flex justify-center">
        <Button 
          variant={variant} 
          size={size} 
          className={variant === "default" 
            ? "bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
            : "border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-xl"
          }
          onClick={() => document.getElementById('resume-upload')?.click()}
        >
          <Upload className="w-5 h-5 mr-2" />
          {uploadedFile ? 'Change Resume' : 'Upload Resume'}
        </Button>
      </div>
    </div>
  );
};
