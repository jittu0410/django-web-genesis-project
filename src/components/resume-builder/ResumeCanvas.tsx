
import React from 'react';
import { useResumeBuilder } from './ResumeBuilderProvider';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

export const ResumeCanvas = () => {
  const { resumeData, selectedTemplate, selectedFont, selectedColor } = useResumeBuilder();

  const renderTemplate = () => {
    const templateProps = {
      resumeData,
      font: selectedFont,
      color: selectedColor
    };

    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8" style={{ minHeight: '1056px' }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
