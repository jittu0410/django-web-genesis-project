
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              ATS Score Checker + Smart Resume Builder
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered resume optimization platform built with Django, React, and advanced NLP technology.
            </p>
            <div className="flex space-x-4">
              <Github className="w-6 h-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
              <Mail className="w-6 h-6 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-purple-400 cursor-pointer transition-colors">ATS Score Checker</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">Job Match Analysis</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">Smart Resume Builder</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">PDF Export</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Technology</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-purple-400 cursor-pointer transition-colors">Django + DRF</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">React + TypeScript</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">spaCy NLP</li>
              <li className="hover:text-purple-400 cursor-pointer transition-colors">Docker Ready</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ATS Score Checker + Smart Resume Builder. Built with ❤️ for job seekers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
