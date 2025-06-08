
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useResumeBuilder } from '../ResumeBuilderProvider';
import { Plus, Trash2, X } from 'lucide-react';

export const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeBuilder();
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: [] as string[],
    link: ''
  });
  const [newTech, setNewTech] = useState('');

  const handleAdd = () => {
    if (newProject.name && newProject.description) {
      addProject(newProject);
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: ''
      });
      setIsAdding(false);
    }
  };

  const addTechToNew = () => {
    if (newTech.trim() && !newProject.technologies.includes(newTech.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechFromNew = (tech: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addTechToExisting = (projectId: string, tech: string, currentTechs: string[]) => {
    if (tech.trim() && !currentTechs.includes(tech.trim())) {
      updateProject(projectId, { technologies: [...currentTechs, tech.trim()] });
    }
  };

  const removeTechFromExisting = (projectId: string, techToRemove: string, currentTechs: string[]) => {
    updateProject(projectId, { 
      technologies: currentTechs.filter(tech => tech !== techToRemove) 
    });
  };

  return (
    <div className="space-y-4">
      {resumeData.projects.map((project) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-2">
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, { name: e.target.value })}
                placeholder="Project Name"
                className="font-medium"
              />
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                placeholder="Project description and your contributions..."
                className="min-h-[60px]"
              />
              <Input
                value={project.link || ''}
                onChange={(e) => updateProject(project.id, { link: e.target.value })}
                placeholder="Project URL (optional)"
              />
              <div className="space-y-2">
                <Label className="text-sm">Technologies Used</Label>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="flex items-center">
                      {tech}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTechFromExisting(project.id, tech, project.technologies)}
                        className="ml-1 h-auto p-0 hover:bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add technology..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechToExisting(project.id, input.value, project.technologies);
                        input.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
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
            value={newProject.name}
            onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Project Name"
          />
          <Textarea
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Project description and your contributions..."
            className="min-h-[60px]"
          />
          <Input
            value={newProject.link}
            onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
            placeholder="Project URL (optional)"
          />
          <div className="space-y-2">
            <Label className="text-sm">Technologies Used</Label>
            <div className="flex flex-wrap gap-1">
              {newProject.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="flex items-center">
                  {tech}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTechFromNew(tech)}
                    className="ml-1 h-auto p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechToNew();
                  }
                }}
              />
              <Button onClick={addTechToNew} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAdd} size="sm">Add Project</Button>
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
          Add Project
        </Button>
      )}
    </div>
  );
};
