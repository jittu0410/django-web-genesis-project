export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ats_analyses: {
        Row: {
          ats_score: number | null
          completed_at: string | null
          created_at: string | null
          detailed_feedback: Json | null
          extracted_text: string | null
          id: string
          job_description_id: string | null
          keywords_found: string[] | null
          keywords_missing: string[] | null
          resume_id: string
          section_scores: Json | null
          status: Database["public"]["Enums"]["analysis_status"] | null
          suggestions: string[] | null
        }
        Insert: {
          ats_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          detailed_feedback?: Json | null
          extracted_text?: string | null
          id?: string
          job_description_id?: string | null
          keywords_found?: string[] | null
          keywords_missing?: string[] | null
          resume_id: string
          section_scores?: Json | null
          status?: Database["public"]["Enums"]["analysis_status"] | null
          suggestions?: string[] | null
        }
        Update: {
          ats_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          detailed_feedback?: Json | null
          extracted_text?: string | null
          id?: string
          job_description_id?: string | null
          keywords_found?: string[] | null
          keywords_missing?: string[] | null
          resume_id?: string
          section_scores?: Json | null
          status?: Database["public"]["Enums"]["analysis_status"] | null
          suggestions?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "ats_analyses_job_description_id_fkey"
            columns: ["job_description_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ats_analyses_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      job_descriptions: {
        Row: {
          company: string | null
          created_at: string | null
          description: string
          id: string
          keywords: string[] | null
          requirements: string[] | null
          title: string
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          description: string
          id?: string
          keywords?: string[] | null
          requirements?: string[] | null
          title: string
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          description?: string
          id?: string
          keywords?: string[] | null
          requirements?: string[] | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          file_size: number
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          filename: string
          id: string
          updated_at: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          file_size: number
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          filename: string
          id?: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          file_size?: number
          file_type?: Database["public"]["Enums"]["file_type"]
          file_url?: string
          filename?: string
          id?: string
          updated_at?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      analysis_status: "pending" | "processing" | "completed" | "failed"
      file_type: "pdf" | "doc" | "docx"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      analysis_status: ["pending", "processing", "completed", "failed"],
      file_type: ["pdf", "doc", "docx"],
    },
  },
} as const
