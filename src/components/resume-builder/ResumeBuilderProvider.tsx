
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: string[];
  certifications: string[];
}

interface ResumeBuilderContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateLanguages: (languages: string[]) => void;
  updateCertifications: (certifications: string[]) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ResumeBuilderContext = createContext<ResumeBuilderContextType | undefined>(undefined);

export const useResumeBuilder = () => {
  const context = useContext(ResumeBuilderContext);
  if (!context) {
    throw new Error('useResumeBuilder must be used within a ResumeBuilderProvider');
  }
  return context;
};

export const ResumeBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedFont, setSelectedFont] = useState('inter');
  const [selectedColor, setSelectedColor] = useState('blue');

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const addWorkExperience = (experience: Omit<WorkExperience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateWorkExperience = (id: string, experience: Partial<WorkExperience>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => 
        exp.id === id ? { ...exp, ...experience } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...education } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, ...project } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const updateLanguages = (languages: string[]) => {
    setResumeData(prev => ({ ...prev, languages }));
  };

  const updateCertifications = (certifications: string[]) => {
    setResumeData(prev => ({ ...prev, certifications }));
  };

  return (
    <ResumeBuilderContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateSummary,
      addWorkExperience,
      updateWorkExperience,
      removeWorkExperience,
      addEducation,
      updateEducation,
      removeEducation,
      updateSkills,
      addProject,
      updateProject,
      removeProject,
      updateLanguages,
      updateCertifications,
      selectedTemplate,
      setSelectedTemplate,
      selectedFont,
      setSelectedFont,
      selectedColor,
      setSelectedColor
    }}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};
