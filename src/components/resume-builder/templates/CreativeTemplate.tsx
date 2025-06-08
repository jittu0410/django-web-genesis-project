
import React from 'react';

interface TemplateProps {
  resumeData: any;
  font: string;
  color: string;
}

export const CreativeTemplate = ({ resumeData, font, color }: TemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects } = resumeData;

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500' },
      red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500' },
      gray: { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-500' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(color);

  return (
    <div className="font-sans text-gray-800">
      {/* Sidebar */}
      <div className="grid grid-cols-3 gap-6">
        <div className={`${colors.bg} text-white p-6 rounded-lg`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="space-y-1 text-sm opacity-90">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            </div>
          </div>

          {/* Skills in sidebar */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white bg-opacity-20 rounded px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education in sidebar */}
          {education.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-3">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 text-sm">
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="opacity-90">{edu.institution}</div>
                  <div className="opacity-90">{edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          {/* Summary */}
          {summary && (
            <div className="mb-6">
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>About Me</h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-xl font-bold ${colors.text} mb-4`}>Experience</h2>
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-6 relative">
                  <div className={`absolute left-0 top-0 w-1 h-full ${colors.bg} rounded`}></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.position}</h3>
                        <p className={`font-semibold ${colors.text}`}>{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <ul className="text-sm space-y-1">
                      {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                        <li key={index}>• {desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className={`text-xl font-bold ${colors.text} mb-4`}>Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className={`text-sm ${colors.text} hover:underline`}>
                        View →
                      </a>
                    )}
                  </div>
                  <p className="text-sm mb-3">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className={`${colors.bg} text-white px-2 py-1 rounded text-xs`}>
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
      </div>
    </div>
  );
};
