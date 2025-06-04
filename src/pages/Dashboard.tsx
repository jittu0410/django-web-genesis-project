
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Free ATS Resume Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Get instant ATS compatibility scoring for your resume - completely free!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main ATS Check Card */}
          <div className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-white text-2xl">
                  <Upload className="w-6 h-6 mr-3" />
                  ATS Resume Analysis
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Upload your resume and get instant ATS compatibility scoring
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/upload">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Upload className="w-5 h-5 mr-2" />
                    Analyze My Resume
                  </Button>
                </Link>
                <p className="text-sm text-gray-400 mt-4">
                  No signup required • Instant results • Completely free
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-center">What You Get</CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  Comprehensive analysis of your resume's ATS compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="text-sm text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      ATS compatibility score (0-100%)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Section-by-section performance analysis
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Keywords found vs missing analysis
                    </li>
                  </ul>
                  <ul className="text-sm text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Detailed improvement suggestions
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Format and structure recommendations
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      Instant results - no waiting
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-center">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Upload Resume</h3>
                    <p className="text-sm text-gray-400">Upload your resume in PDF, DOC, or DOCX format</p>
                  </div>
                  <div>
                    <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">AI Analysis</h3>
                    <p className="text-sm text-gray-400">Our AI analyzes your resume for ATS compatibility</p>
                  </div>
                  <div>
                    <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Get Results</h3>
                    <p className="text-sm text-gray-400">Receive detailed feedback and improvement tips</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/20">
              <TrendingUp className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of job seekers who have improved their resume's ATS compatibility. Get started now - it's completely free!
              </p>
              <Link to="/upload">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl">
                  <Upload className="w-5 h-5 mr-2" />
                  Start Free Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
