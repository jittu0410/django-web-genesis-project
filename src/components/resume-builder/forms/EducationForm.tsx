
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeBuilder } from '../ResumeBuilderProvider';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeBuilder();
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleAdd = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-2">
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                placeholder="University/School Name"
              />
              <div className="flex space-x-2">
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder="Degree"
                />
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  placeholder="Field of Study"
                />
              </div>
              <div className="flex space-x-2">
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  placeholder="Start Date"
                />
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  placeholder="End Date"
                />
              </div>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                placeholder="GPA (optional)"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <Input
            value={newEducation.institution}
            onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
            placeholder="University/School Name"
          />
          <div className="flex space-x-2">
            <Input
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
              placeholder="Degree"
            />
            <Input
              value={newEducation.field}
              onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
              placeholder="Field of Study"
            />
          </div>
          <div className="flex space-x-2">
            <Input
              type="month"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
              placeholder="Start Date"
            />
            <Input
              type="month"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
              placeholder="End Date"
            />
          </div>
          <Input
            value={newEducation.gpa}
            onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
            placeholder="GPA (optional)"
          />
          <div className="flex space-x-2">
            <Button onClick={handleAdd} size="sm">Add Education</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)} size="sm">Cancel</Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setIsAdding(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      )}
    </div>
  );
};
