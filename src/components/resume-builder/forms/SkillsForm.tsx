
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useResumeBuilder } from '../ResumeBuilderProvider';
import { Plus, X } from 'lucide-react';

export const SkillsForm = () => {
  const { resumeData, updateSkills } = useResumeBuilder();
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      updateSkills([...resumeData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(resumeData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'HTML/CSS',
    'Git', 'AWS', 'Docker', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular',
    'Project Management', 'Leadership', 'Communication', 'Problem Solving',
    'Data Analysis', 'Machine Learning', 'Agile/Scrum', 'REST APIs'
  ];

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill..."
        />
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center">
            {skill}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill)}
              className="ml-1 h-auto p-0 hover:bg-transparent"
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">Suggested Skills:</p>
        <div className="flex flex-wrap gap-1">
          {suggestedSkills
            .filter(skill => !resumeData.skills.includes(skill))
            .slice(0, 12)
            .map((skill) => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                onClick={() => updateSkills([...resumeData.skills, skill])}
                className="text-xs h-6"
              >
                + {skill}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
