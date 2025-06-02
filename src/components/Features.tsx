
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Brain, FileEdit, Download, Target, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: FileSearch,
      title: "ATS Score Checker",
      description: "Upload your resume and get instant ATS compatibility scores based on formatting, structure, and keyword strength.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Job Match Analysis",
      description: "Compare your resume against job descriptions using advanced NLP to get precise match scores and suggestions.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Smart Resume Builder",
      description: "Build optimized resumes from scratch with AI-guided suggestions for keywords, sections, and formatting.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Get instant feedback and actionable suggestions to improve your resume's performance with ATS systems.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FileEdit,
      title: "Job-Specific Tailoring",
      description: "Create targeted resumes for specific positions with keyword recommendations and content optimization.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Download,
      title: "Professional PDF Export",
      description: "Export your optimized resumes as beautiful, ATS-friendly PDFs ready for job applications.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Powerful Features for Resume Success
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to create, optimize, and perfect your resume for today's competitive job market
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
