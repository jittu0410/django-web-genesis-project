
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Upload, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthContext();

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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Please sign in to continue</h1>
          <p className="text-gray-300">You need to be authenticated to access the dashboard.</p>
        </div>
      </div>
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
