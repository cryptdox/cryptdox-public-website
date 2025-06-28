export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      about: {
        Row: {
          id: string;
          title: string;
          founder_name: string | null;
          mission: string | null;
          description: string | null;
          story: string | null;
          core_values: string[] | null;
          founder_image_url: string | null;
          created_by: string | null;
          updated_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          founder_name?: string | null;
          mission?: string | null;
          description?: string | null;
          story?: string | null;
          core_values?: string[] | null;
          founder_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          founder_name?: string | null;
          mission?: string | null;
          description?: string | null;
          story?: string | null;
          core_values?: string[] | null;
          founder_image_url?: string | null;
          created_by?: string | null;
          updated_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          cv_url: string | null;
          applicant_name: string;
          email: string;
          reviewed: boolean;
          approved: boolean;
          objective: string | null;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          cv_url?: string | null;
          applicant_name: string;
          email: string;
          reviewed?: boolean;
          approved?: boolean;
          objective?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          cv_url?: string | null;
          applicant_name?: string;
          email?: string;
          reviewed?: boolean;
          approved?: boolean;
          objective?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
      };
      blog: {
        Row: {
          id: string;
          created_by: string | null;
          title: string;
          content: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          created_by?: string | null;
          title: string;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          created_by?: string | null;
          title?: string;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      clients: {
        Row: {
          id: string;
          platform_user_id: string;
          organization: string | null;
          joined_at: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          platform_user_id: string;
          organization?: string | null;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          platform_user_id?: string;
          organization?: string | null;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      contact: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      faq: {
        Row: {
          id: string;
          created_by: string | null;
          updated_by: string | null;
          sequence: number | null;
          question: string;
          answer: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          created_by?: string | null;
          updated_by?: string | null;
          sequence?: number | null;
          question: string;
          answer: string;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          created_by?: string | null;
          updated_by?: string | null;
          sequence?: number | null;
          question?: string;
          answer?: string;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      individual_education: {
        Row: {
          id: string;
          portfolio_id: string;
          degree: string;
          institution: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      individual_portfolio: {
        Row: {
          id: string;
          platform_user_id: string;
          objective: string | null;
          profile_image: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      individual_projects: {
        Row: {
          id: string;
          portfolio_id: string;
          title: string;
          technology_used: string[] | null;
          description: string | null;
          link: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      individual_skills: {
        Row: {
          id: string;
          skill_id: string;
          portfolio_id: string;
          level: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      individual_team: {
        Row: {
          id: string;
          team_id: string;
          portfolio_id: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      individual_work_experience: {
        Row: {
          id: string;
          portfolio_id: string;
          company: string;
          position: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      job_circular: {
        Row: {
          id: string;
          created_by: string | null;
          title: string;
          description: string | null;
          recruitment_expire_date: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          created_by?: string | null;
          title: string;
          description?: string | null;
          recruitment_expire_date?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          created_by?: string | null;
          title?: string;
          description?: string | null;
          recruitment_expire_date?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      platform_role: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      platform_user: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      platform_user_role: {
        Row: {
          id: string;
          platform_user_id: string;
          platform_role_id: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      product: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          service_id: string;
          free: boolean | null;
          price: number | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
      };
      team: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
      testimonials: {
        Row: {
          id: string;
          client_id: string;
          content: string;
          rating: number | null;
          approved: boolean | null;
          created_at: string;
          updated_at: string;
          is_deleted: boolean | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          content: string;
          rating?: number | null;
          approved?: boolean | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          content?: string;
          rating?: number | null;
          approved?: boolean | null;
          created_at?: string;
          updated_at?: string;
          is_deleted?: boolean | null;
          deleted_at?: string | null;
        };
      };
    };
  };
}