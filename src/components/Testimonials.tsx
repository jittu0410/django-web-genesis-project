
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      content: "This tool helped me increase my interview rate by 300%. The ATS score checker revealed issues I never knew existed in my resume.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "Microsoft",
      content: "The job match analysis is incredibly accurate. It helped me tailor my resume perfectly for each application.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Meta",
      content: "Finally landed my dream job after using the smart resume builder. The keyword suggestions were spot-on!",
      rating: 5,
      avatar: "EJ"
    }
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who landed their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-purple-500/30 absolute -top-2 -left-2" />
                  <p className="text-gray-300 leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
