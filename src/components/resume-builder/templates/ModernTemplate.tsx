
import React from 'react';

interface TemplateProps {
  resumeData: any;
  font: string;
  color: string;
}

export const ModernTemplate = ({ resumeData, font, color }: TemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects } = resumeData;

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'text-blue-600 border-blue-600',
      green: 'text-green-600 border-green-600',
      purple: 'text-purple-600 border-purple-600',
      red: 'text-red-600 border-red-600',
      gray: 'text-gray-600 border-gray-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getFontClass = (font: string) => {
    const fontMap: { [key: string]: string } = {
      inter: 'font-sans',
      roboto: 'font-sans',
      'open-sans': 'font-sans',
      lato: 'font-sans'
    };
    return fontMap[font] || fontMap.inter;
  };

  const colorClass = getColorClass(color);
  const fontClass = getFontClass(font);

  return (
    <div className={`${fontClass} text-gray-800 leading-relaxed`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${colorClass.split(' ')[0]} mb-2`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${colorClass.split(' ')[0]} mb-2 border-b-2 ${colorClass.split(' ')[1]} pb-1`}>
            Professional Summary
          </h2>
          <p className="text-sm">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${colorClass.split(' ')[0]} mb-3 border-b-2 ${colorClass.split(' ')[1]} pb-1`}>
            Work Experience
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className={`font-medium text-sm ${colorClass.split(' ')[0]} mb-2`}>{exp.company}</p>
              <ul className="text-sm space-y-1">
                {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                  <li key={index}>• {desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${colorClass.split(' ')[0]} mb-3 border-b-2 ${colorClass.split(' ')[1]} pb-1`}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className={`${colorClass.split(' ')[0]} text-sm`}>{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${colorClass.split(' ')[0]} mb-3 border-b-2 ${colorClass.split(' ')[1]} pb-1`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${colorClass.split(' ')[0]} mb-3 border-b-2 ${colorClass.split(' ')[1]} pb-1`}>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{project.name}</h3>
                {project.link && (
                  <a href={project.link} className={`text-sm ${colorClass.split(' ')[0]} hover:underline`}>
                    View Project
                  </a>
                )}
              </div>
              <p className="text-sm mb-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={`bg-gray-100 px-2 py-1 rounded text-xs ${colorClass.split(' ')[0]}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
