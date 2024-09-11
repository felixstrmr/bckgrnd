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
      clients: {
        Row: {
          created_at: string
          id: string
          name: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_statuses: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          is_default: boolean
          name: string
          order: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default: boolean
          name: string
          order: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          order?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_statuses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      project_users: {
        Row: {
          created_at: string
          id: string
          project: string
          user: string
          user_role: Database["public"]["Enums"]["project_user_roles"]
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          project: string
          user: string
          user_role: Database["public"]["Enums"]["project_user_roles"]
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          project?: string
          user?: string
          user_role?: Database["public"]["Enums"]["project_user_roles"]
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_users_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client: string
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string
          workspace: string
        }
        Insert: {
          client: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status: string
          workspace: string
        }
        Update: {
          client?: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "project_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_images: {
        Row: {
          created_at: string
          id: string
          image_size: number
          image_url: string
          task: string
          version: number
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_size: number
          image_url: string
          task: string
          version: number
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          image_size?: number
          image_url?: string
          task?: string
          version?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_images_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_images_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_priorities: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          is_default: boolean
          name: string
          order: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default: boolean
          name: string
          order: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          order?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_priorities_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_statuses: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          order: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          order: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          order?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_statuses_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      task_users: {
        Row: {
          created_at: string
          id: string
          task: string
          user: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          task: string
          user: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          task?: string
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_users_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          priority: string
          project: string
          status: string
          workspace: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          priority: string
          project: string
          status: string
          workspace: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          priority?: string
          project?: string
          status?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "task_priorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "task_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_users: {
        Row: {
          created_at: string
          id: string
          user: string
          workspace: string
        }
        Insert: {
          created_at?: string
          id?: string
          user: string
          workspace: string
        }
        Update: {
          created_at?: string
          id?: string
          user?: string
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_users_workspace_fkey"
            columns: ["workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          domain: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          name?: string
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
      project_user_roles: "owner" | "editor" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
