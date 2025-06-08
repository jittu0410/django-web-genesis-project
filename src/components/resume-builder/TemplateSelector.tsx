
import React from 'react';
import { Button } from '@/components/ui/button';
import { useResumeBuilder } from './ResumeBuilderProvider';

export const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResumeBuilder();

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
    { id: 'creative', name: 'Creative', description: 'Unique design for creative fields' }
  ];

  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant={selectedTemplate === template.id ? "default" : "outline"}
          onClick={() => setSelectedTemplate(template.id)}
          className="w-full justify-start h-auto p-3"
        >
          <div className="text-left">
            <div className="font-medium">{template.name}</div>
            <div className="text-xs text-gray-500">{template.description}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};
