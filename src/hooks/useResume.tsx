
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useResume = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadResume = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${userId}/${Date.now()}-${file.name}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

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

    if (dbError) throw dbError;

    return resumeData;
  };

  const uploadMutation = useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) => 
      uploadResume(file, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume is ready for analysis.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('uploaded_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const analyzeResume = async (resumeId: string, jobDescription?: string) => {
    const { data, error } = await supabase.functions.invoke('analyze-resume', {
      body: { resumeId, jobDescription },
    });

    if (error) throw error;
    return data;
  };

  const analyzeMutation = useMutation({
    mutationFn: ({ resumeId, jobDescription }: { resumeId: string; jobDescription?: string }) =>
      analyzeResume(resumeId, jobDescription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      toast({
        title: "Analysis started!",
        description: "Your resume is being analyzed. Results will be available shortly.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    uploadResume: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    analyzeResume: analyzeMutation.mutate,
    isAnalyzing: analyzeMutation.isPending,
    resumes,
    isLoading,
    uploadProgress,
  };
};
