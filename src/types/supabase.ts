// Generated from the org_ tables in the Bangla Tools Supabase project
// (batools/supabase/migrations/030_org_site_tables.sql). Regenerate when they change.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      org_about: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          founder_name: string | null;
          mission: string | null;
          description: string | null;
          story: string | null;
          core_values: string[];
          founder_image_url: string | null;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          title?: string;
          founder_name?: string | null;
          mission?: string | null;
          description?: string | null;
          story?: string | null;
          core_values?: string[];
          founder_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          title?: string;
          founder_name?: string | null;
          mission?: string | null;
          description?: string | null;
          story?: string | null;
          core_values?: string[];
          founder_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_blogs: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          content: string | null;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          title: string;
          content?: string | null;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          title?: string;
          content?: string | null;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_clients: {
        Row: {
          id: string;
          org_id: string;
          organization: string;
          joined_at: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          organization: string;
          joined_at?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          organization?: string;
          joined_at?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_contacts: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          email: string;
          message: string;
          status: string;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          email: string;
          message: string;
          status?: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          email?: string;
          message?: string;
          status?: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_faqs: {
        Row: {
          id: string;
          org_id: string;
          question: string;
          answer: string;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_job_applications: {
        Row: {
          id: string;
          org_id: string;
          job_id: string;
          applicant_name: string;
          email: string;
          objective: string | null;
          cv_url: string | null;
          is_reviewed: boolean;
          is_approved: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          job_id: string;
          applicant_name: string;
          email: string;
          objective?: string | null;
          cv_url?: string | null;
          is_reviewed?: boolean;
          is_approved?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          job_id?: string;
          applicant_name?: string;
          email?: string;
          objective?: string | null;
          cv_url?: string | null;
          is_reviewed?: boolean;
          is_approved?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_job_applications_job_id_fkey'; columns: ['job_id']; isOneToOne: false; referencedRelation: 'org_jobs'; referencedColumns: ['id'] },
        ];
      };
      org_jobs: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          description: string | null;
          recruitment_expire_date: string | null;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          title: string;
          description?: string | null;
          recruitment_expire_date?: string | null;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          title?: string;
          description?: string | null;
          recruitment_expire_date?: string | null;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_member_education: {
        Row: {
          id: string;
          org_id: string;
          member_id: string;
          degree: string;
          institution: string;
          start_date: string | null;
          end_date: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          member_id: string;
          degree: string;
          institution: string;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          member_id?: string;
          degree?: string;
          institution?: string;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_member_education_member_id_fkey'; columns: ['member_id']; isOneToOne: false; referencedRelation: 'org_members'; referencedColumns: ['id'] },
        ];
      };
      org_member_experiences: {
        Row: {
          id: string;
          org_id: string;
          member_id: string;
          company: string;
          position: string;
          start_date: string | null;
          end_date: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          member_id: string;
          company: string;
          position: string;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          member_id?: string;
          company?: string;
          position?: string;
          start_date?: string | null;
          end_date?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_member_experiences_member_id_fkey'; columns: ['member_id']; isOneToOne: false; referencedRelation: 'org_members'; referencedColumns: ['id'] },
        ];
      };
      org_member_skills: {
        Row: {
          id: string;
          org_id: string;
          member_id: string;
          skill_id: string;
          level: string | null;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          member_id: string;
          skill_id: string;
          level?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          member_id?: string;
          skill_id?: string;
          level?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_member_skills_member_id_fkey'; columns: ['member_id']; isOneToOne: false; referencedRelation: 'org_members'; referencedColumns: ['id'] },
          { foreignKeyName: 'org_member_skills_skill_id_fkey'; columns: ['skill_id']; isOneToOne: false; referencedRelation: 'org_skills'; referencedColumns: ['id'] },
        ];
      };
      org_member_teams: {
        Row: {
          id: string;
          org_id: string;
          member_id: string;
          team_id: string;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          member_id: string;
          team_id: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          member_id?: string;
          team_id?: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_member_teams_member_id_fkey'; columns: ['member_id']; isOneToOne: false; referencedRelation: 'org_members'; referencedColumns: ['id'] },
          { foreignKeyName: 'org_member_teams_team_id_fkey'; columns: ['team_id']; isOneToOne: false; referencedRelation: 'org_teams'; referencedColumns: ['id'] },
        ];
      };
      org_members: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          designation: string | null;
          objective: string | null;
          profile_image_url: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          designation?: string | null;
          objective?: string | null;
          profile_image_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          designation?: string | null;
          objective?: string | null;
          profile_image_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_products: {
        Row: {
          id: string;
          org_id: string;
          service_id: string | null;
          name: string;
          description: string | null;
          is_free: boolean;
          price: number | null;
          image_url: string | null;
          site_url: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          service_id?: string | null;
          name: string;
          description?: string | null;
          is_free?: boolean;
          price?: number | null;
          image_url?: string | null;
          site_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          service_id?: string | null;
          name?: string;
          description?: string | null;
          is_free?: boolean;
          price?: number | null;
          image_url?: string | null;
          site_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_products_service_id_fkey'; columns: ['service_id']; isOneToOne: false; referencedRelation: 'org_services'; referencedColumns: ['id'] },
        ];
      };
      org_projects: {
        Row: {
          id: string;
          org_id: string;
          member_id: string | null;
          title: string;
          description: string | null;
          technology_used: string[];
          link: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          member_id?: string | null;
          title: string;
          description?: string | null;
          technology_used?: string[];
          link?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          member_id?: string | null;
          title?: string;
          description?: string | null;
          technology_used?: string[];
          link?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_projects_member_id_fkey'; columns: ['member_id']; isOneToOne: false; referencedRelation: 'org_members'; referencedColumns: ['id'] },
        ];
      };
      org_services: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          description: string | null;
          lucide_icon: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          description?: string | null;
          lucide_icon?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          description?: string | null;
          lucide_icon?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_skills: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_teams: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          description: string | null;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          description?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          description?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
        ];
      };
      org_testimonials: {
        Row: {
          id: string;
          org_id: string;
          client_id: string | null;
          content: string;
          rating: number;
          sort_order: number;
          is_visible: boolean;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          client_id?: string | null;
          content: string;
          rating?: number;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          client_id?: string | null;
          content?: string;
          rating?: number;
          sort_order?: number;
          is_visible?: boolean;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: 'org_testimonials_client_id_fkey'; columns: ['client_id']; isOneToOne: false; referencedRelation: 'org_clients'; referencedColumns: ['id'] },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
