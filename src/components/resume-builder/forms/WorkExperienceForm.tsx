
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeBuilder } from '../ResumeBuilderProvider';
import { Plus, Trash2, Calendar } from 'lucide-react';

export const WorkExperienceForm = () => {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeBuilder();
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  });

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      addWorkExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      });
      setIsAdding(false);
    }
  };

  const updateDescription = (id: string, descriptions: string[]) => {
    updateWorkExperience(id, { description: descriptions });
  };

  const addDescriptionPoint = (id: string, currentDescriptions: string[]) => {
    updateDescription(id, [...currentDescriptions, '']);
  };

  const removeDescriptionPoint = (id: string, index: number, currentDescriptions: string[]) => {
    const newDescriptions = currentDescriptions.filter((_, i) => i !== index);
    updateDescription(id, newDescriptions);
  };

  const updateDescriptionPoint = (id: string, index: number, value: string, currentDescriptions: string[]) => {
    const newDescriptions = [...currentDescriptions];
    newDescriptions[index] = value;
    updateDescription(id, newDescriptions);
  };

  return (
    <div className="space-y-4">
      {resumeData.workExperience.map((exp) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-2">
              <Input
                value={exp.position}
                onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                placeholder="Job Title"
                className="font-medium"
              />
              <Input
                value={exp.company}
                onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                placeholder="Company Name"
              />
              <div className="flex space-x-2">
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                  placeholder="Start Date"
                />
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                  placeholder="End Date"
                  disabled={exp.current}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateWorkExperience(exp.id, { current: !!checked })}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-sm">Currently working here</Label>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWorkExperience(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Job Description</Label>
            {exp.description.map((desc, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={desc}
                  onChange={(e) => updateDescriptionPoint(exp.id, index, e.target.value, exp.description)}
                  placeholder="• Describe your achievements and responsibilities..."
                  className="flex-1"
                />
                {exp.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDescriptionPoint(exp.id, index, exp.description)}
                    className="text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addDescriptionPoint(exp.id, exp.description)}
              className="w-full"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Point
            </Button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <Input
            value={newExperience.position}
            onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
            placeholder="Job Title"
          />
          <Input
            value={newExperience.company}
            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Company Name"
          />
          <div className="flex space-x-2">
            <Input
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
              placeholder="Start Date"
            />
            <Input
              type="month"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
              placeholder="End Date"
              disabled={newExperience.current}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="current-new"
              checked={newExperience.current}
              onCheckedChange={(checked) => setNewExperience(prev => ({ ...prev, current: !!checked }))}
            />
            <Label htmlFor="current-new" className="text-sm">Currently working here</Label>
          </div>
          <Textarea
            value={newExperience.description[0]}
            onChange={(e) => setNewExperience(prev => ({ ...prev, description: [e.target.value] }))}
            placeholder="Describe your achievements and responsibilities..."
          />
          <div className="flex space-x-2">
            <Button onClick={handleAdd} size="sm">Add Experience</Button>
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
          Add Work Experience
        </Button>
      )}
    </div>
  );
};
