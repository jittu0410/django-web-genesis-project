
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Upload, Plus, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { data: resumes, isLoading: resumesLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('uploaded_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: analyses, isLoading: analysesLoading } = useQuery({
    queryKey: ['analyses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ats_analyses')
        .select(`
          *,
          resumes (filename, uploaded_at)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <Link to="/">
                <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 mb-4">
                  ← Back to Home
                </Button>
              </Link>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Dashboard - Enhanced Features
              </h1>
              <p className="text-xl text-gray-300">
                Sign up to save your resumes and track your analysis history.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Lock className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                <h2 className="text-3xl font-bold mb-4">Unlock Premium Features</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Create a free account to save your resumes, track analysis history, and access advanced features.
                </p>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
                >
                  Sign Up for Free
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <FileText className="w-5 h-5 mr-2" />
                      Resume Storage
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Save and organize all your resumes in one place
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Unlimited resume uploads</li>
                      <li>• Version history tracking</li>
                      <li>• Easy file management</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Analysis History
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your progress and improvements over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Complete analysis reports</li>
                      <li>• Score comparison charts</li>
                      <li>• Progress tracking</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  Want to try our ATS checker without signing up?
                </p>
                <Link to="/upload">
                  <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                    <Upload className="w-4 h-4 mr-2" />
                    Try Free ATS Check
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            ATS Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Welcome back! Manage your resumes and view analysis results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="w-5 h-5 mr-2" />
                Total Resumes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {resumesLoading ? '...' : resumes?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyses Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {analysesLoading ? '...' : analyses?.filter(a => a.status === 'completed').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Upload className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/upload">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Resumes */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Resumes</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest uploaded resumes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resumesLoading ? (
                <div className="text-gray-400">Loading...</div>
              ) : resumes?.length ? (
                <div className="space-y-4">
                  {resumes.slice(0, 5).map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{resume.filename}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(resume.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-purple-300 text-sm">
                        {(resume.file_size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No resumes uploaded yet</div>
              )}
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Analyses</CardTitle>
              <CardDescription className="text-gray-400">
                Latest ATS analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysesLoading ? (
                <div className="text-gray-400">Loading...</div>
              ) : analyses?.length ? (
                <div className="space-y-4">
                  {analyses.slice(0, 5).map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{analysis.resumes?.filename}</p>
                        <p className="text-gray-400 text-sm">
                          Status: {analysis.status}
                        </p>
                      </div>
                      {analysis.ats_score && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-300">
                            {analysis.ats_score}%
                          </div>
                          <div className="text-gray-400 text-sm">ATS Score</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No analyses yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
