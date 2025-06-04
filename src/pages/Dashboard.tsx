
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Upload, Plus, Zap, Target, TrendingUp } from 'lucide-react';
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
            Premium ATS Features
          </h1>
          <p className="text-xl text-gray-300">
            Enhance your resume analysis with advanced features and insights.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Upload className="w-5 h-5 mr-2" />
                  Free ATS Check
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Get instant ATS compatibility score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/upload">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Check My Resume
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="w-5 h-5 mr-2" />
                  AI Optimization
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered resume improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Job Matching
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Match resume to specific job descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Target className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Premium Features Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  Advanced Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Deep insights into your resume performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Detailed keyword analysis and optimization suggestions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Section-by-section scoring and improvement tips
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Industry-specific ATS compatibility checks
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Format and structure optimization recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Tracking
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor your resume improvements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Track ATS score improvements across versions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Historical analysis data and trends
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Compare multiple resume versions side-by-side
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Export detailed reports for your records
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-white text-center">Feature Comparison</CardTitle>
              <CardDescription className="text-gray-400 text-center">
                See what's included in our free and premium offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-300">Feature</th>
                      <th className="text-center py-3 text-green-400">Free</th>
                      <th className="text-center py-3 text-purple-400">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Basic ATS Score</td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Keyword Analysis</td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Section Scoring</td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Advanced Analytics</td>
                      <td className="text-center py-3">
                        <span className="text-gray-600">✗</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Historical Tracking</td>
                      <td className="text-center py-3">
                        <span className="text-gray-600">✗</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">AI Optimization</td>
                      <td className="text-center py-3">
                        <span className="text-gray-600">✗</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Job-Specific Analysis</td>
                      <td className="text-center py-3">
                        <span className="text-gray-600">✗</span>
                      </td>
                      <td className="text-center py-3">
                        <span className="text-green-400">✓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/20">
              <TrendingUp className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Start with our free ATS checker to see how your resume performs. No signup required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/upload">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl">
                    <Upload className="w-5 h-5 mr-2" />
                    Try Free ATS Check
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 text-lg font-semibold rounded-xl"
                  disabled
                >
                  Premium Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
