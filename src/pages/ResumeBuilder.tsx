
import React from 'react';
import { ResumeBuilderHeader } from '@/components/resume-builder/ResumeBuilderHeader';
import { ResumeBuilderSidebar } from '@/components/resume-builder/ResumeBuilderSidebar';
import { ResumeCanvas } from '@/components/resume-builder/ResumeCanvas';
import { ResumeBuilderProvider } from '@/components/resume-builder/ResumeBuilderProvider';

const ResumeBuilder = () => {
  return (
    <ResumeBuilderProvider>
      <div className="min-h-screen bg-gray-50">
        <ResumeBuilderHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <ResumeBuilderSidebar />
          <ResumeCanvas />
        </div>
      </div>
    </ResumeBuilderProvider>
  );
};

export default ResumeBuilder;
