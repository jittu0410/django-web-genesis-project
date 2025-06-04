
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useResume = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Upload resume function
  const uploadResumeFile = async (file: File, userId: string) => {
    console.log('Starting file upload for user:', userId);
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${userId}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    // Upload file to storage
    console.log('Uploading to storage bucket...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file, {
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    console.log('File uploaded successfully:', uploadData);

    // Get public URL (signed URL since bucket is private)
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    console.log('Generated public URL:', publicUrl);

    // Save resume metadata to database
    const { data: resumeData, error: dbError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        filename: file.name,
        file_type: fileExt as 'pdf' | 'doc' | 'docx',
        file_size: file.size,
        file_url: publicUrl,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('resumes').remove([fileName]);
      throw dbError;
    }

    console.log('Resume metadata saved:', resumeData);
    return resumeData;
  };

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) => 
      uploadResumeFile(file, userId),
    onSuccess: (data) => {
      console.log('Upload successful:', data);
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume is ready for analysis.",
      });
    },
    onError: (error: any) => {
      console.error('Upload failed:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Get user's resumes
  const { data: resumes, isLoading: isLoadingResumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching resumes for user:', user.id);
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('uploaded_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching resumes:', error);
        throw error;
      }
      
      console.log('Fetched resumes:', data);
      return data;
    },
    enabled: true,
  });

  // Analyze resume function
  const analyzeResumeFile = async (resumeId: string, jobDescription?: string) => {
    console.log('Starting analysis for resume:', resumeId);
    
    const { data, error } = await supabase.functions.invoke('analyze-resume', {
      body: { 
        resumeId, 
        jobDescription: jobDescription || null 
      },
    });

    if (error) {
      console.error('Analysis function error:', error);
      throw error;
    }
    
    console.log('Analysis completed:', data);
    return data;
  };

  // Analysis mutation
  const analyzeMutation = useMutation({
    mutationFn: ({ resumeId, jobDescription }: { resumeId: string; jobDescription?: string }) =>
      analyzeResumeFile(resumeId, jobDescription),
    onSuccess: (data) => {
      console.log('Analysis successful:', data);
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: "Analysis completed!",
        description: "Your resume analysis is ready. Check your dashboard for results.",
      });
    },
    onError: (error: any) => {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Get analyses for user's resumes
  const { data: analyses, isLoading: isLoadingAnalyses } = useQuery({
    queryKey: ['analyses'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching analyses for user:', user.id);
      const { data, error } = await supabase
        .from('ats_analyses')
        .select(`
          *,
          resumes!inner(
            id,
            filename,
            user_id
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching analyses:', error);
        throw error;
      }
      
      console.log('Fetched analyses:', data);
      return data;
    },
    enabled: true,
  });

  return {
    // Upload
    uploadResume: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    
    // Analysis
    analyzeResume: analyzeMutation.mutate,
    isAnalyzing: analyzeMutation.isPending,
    
    // Data
    resumes,
    analyses,
    isLoading: isLoadingResumes || isLoadingAnalyses,
    uploadProgress,
  };
};
