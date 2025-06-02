
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Upload } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23A855F7" fill-opacity="0.05"%3E%3Cpath d="M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Ready to Land Your Dream Job?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with our AI-powered resume optimization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Upload Resume & Job Description
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-xl group">
              <FileText className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Build My Smart Resume
            </Button>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-4">🐳 Local Deployment Ready</h3>
            <p className="text-gray-300 mb-4">
              Complete Docker setup included with Django + DRF backend, PostgreSQL database, and NLP processing
            </p>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400">
              <div>$ git clone your-repo</div>
              <div>$ docker-compose up --build</div>
              <div>$ # Your app is ready at localhost:3000 🚀</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
