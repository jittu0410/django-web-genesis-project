
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Target, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 py-20 lg:py-32">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI-Powered Resume Intelligence</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            ATS Score Checker +<br />
            <span className="text-purple-400">Smart Resume Builder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get your resume ATS score, job match analysis, and build optimized resumes that land interviews. 
            Powered by advanced NLP and AI technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <FileText className="w-5 h-5 mr-2" />
              Check My Resume Score
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-xl">
              <Target className="w-5 h-5 mr-2" />
              Build Smart Resume
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">95%</div>
              <div className="text-sm text-gray-400">ATS Compatibility</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">3x</div>
              <div className="text-sm text-gray-400">More Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10k+</div>
              <div className="text-sm text-gray-400">Resumes Optimized</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
