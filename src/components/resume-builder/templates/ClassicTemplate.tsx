
import React from 'react';

interface TemplateProps {
  resumeData: any;
  font: string;
  color: string;
}

export const ClassicTemplate = ({ resumeData, font, color }: TemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects } = resumeData;

  return (
    <div className="font-serif text-gray-900 leading-normal">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-2 text-center">
            Objective
          </h2>
          <p className="text-sm text-center italic">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-center border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="font-semibold text-sm mb-2">{exp.company}</p>
              <ul className="text-sm space-y-1 ml-4">
                {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                  <li key={index} className="list-disc">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-center border-b border-gray-400 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 text-center">
              <h3 className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 text-center border-b border-gray-400 pb-1">
            Skills
          </h2>
          <div className="text-center">
            <p className="text-sm">{skills.join(' • ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};
