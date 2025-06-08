
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { TemplateSelector } from './TemplateSelector';
import { StyleCustomizer } from './StyleCustomizer';
import { User, FileText, Briefcase, GraduationCap, Code, FolderOpen, Palette, Layout } from 'lucide-react';

export const ResumeBuilderSidebar = () => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SummaryForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WorkExperienceForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EducationForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Code className="w-4 h-4 mr-2" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SkillsForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Layout className="w-4 h-4 mr-2" />
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TemplateSelector />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Palette className="w-4 h-4 mr-2" />
                  Customize Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StyleCustomizer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
