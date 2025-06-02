
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Scan, Download, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Resume & Job Description",
      description: "Simply upload your current resume and paste the job description you're targeting.",
      step: "01"
    },
    {
      icon: Scan,
      title: "Get AI-Powered Analysis",
      description: "Our advanced NLP algorithms analyze your resume for ATS compatibility and job match scoring.",
      step: "02"
    },
    {
      icon: Download,
      title: "Optimize & Export",
      description: "Implement our suggestions and export your optimized resume as a professional PDF.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get your resume optimized in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="hidden md:block absolute top-24 left-2/3 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>

          {steps.map((step, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 relative group hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
