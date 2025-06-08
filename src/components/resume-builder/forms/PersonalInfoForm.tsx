
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeBuilder } from '../ResumeBuilderProvider';

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeBuilder();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          placeholder="New York, NY"
        />
      </div>
      
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={personalInfo.linkedin}
          onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>
      
      <div>
        <Label htmlFor="portfolio">Portfolio/Website</Label>
        <Input
          id="portfolio"
          value={personalInfo.portfolio}
          onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
          placeholder="johndoe.com"
        />
      </div>
    </div>
  );
};
