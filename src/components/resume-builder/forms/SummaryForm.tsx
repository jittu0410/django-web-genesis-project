
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResumeBuilder } from '../ResumeBuilderProvider';
import { Lightbulb } from 'lucide-react';

export const SummaryForm = () => {
  const { resumeData, updateSummary } = useResumeBuilder();

  const sampleSummaries = [
    "Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-quality solutions.",
    "Results-driven marketing professional with expertise in digital strategy, content creation, and campaign management. Increased brand awareness by 40% and generated $2M in revenue through innovative marketing initiatives.",
    "Detail-oriented data analyst with strong background in statistical analysis, machine learning, and business intelligence. Skilled in Python, SQL, and Tableau with experience transforming complex data into actionable insights."
  ];

  const useSample = (sample: string) => {
    updateSummary(sample);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a compelling summary of your professional background and key achievements..."
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center text-sm text-gray-600">
          <Lightbulb className="w-4 h-4 mr-1" />
          Sample Summaries
        </Label>
        {sampleSummaries.map((sample, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => useSample(sample)}
            className="w-full text-left h-auto p-2 text-xs"
          >
            {sample.substring(0, 80)}...
          </Button>
        ))}
      </div>
    </div>
  );
};
