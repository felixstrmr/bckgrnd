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
      files: {
        Row: {
          created_at: string
          height: number | null
          id: string
          name: string
          path: string
          size: number
          type: string
          width: number | null
          workspace: string
        }
        Insert: {
          created_at?: string
          height?: number | null
          id?: string
          name: string
          path: string
          size: number
          type: string
          width?: number | null
          workspace: string
        }
        Update: {
          created_at?: string
          height?: number | null
          id?: string
          name?: string
          path?: string
          size?: number
          type?: string
          width?: number | null
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_workspace_fkey"
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
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
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
      projects: {
        Row: {
          client: string
          created_at: string
          created_by: string | null
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
          created_by?: string | null
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
          created_by?: string | null
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
      task_files: {
        Row: {
          created_at: string
          file: string
          id: string
          task: string
          version: number
          workspace: string
        }
        Insert: {
          created_at?: string
          file: string
          id?: string
          task: string
          version: number
          workspace: string
        }
        Update: {
          created_at?: string
          file?: string
          id?: string
          task?: string
          version?: number
          workspace?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_files_file_fkey"
            columns: ["file"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_files_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_files_workspace_fkey"
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
          position: number
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          is_default?: boolean
          name: string
          position: number
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          is_default?: boolean
          name?: string
          position?: number
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
          position: number
          type: Database["public"]["Enums"]["task_status_types"]
          workspace: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          position: number
          type: Database["public"]["Enums"]["task_status_types"]
          workspace: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          position?: number
          type?: Database["public"]["Enums"]["task_status_types"]
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
      tasks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          priority: string
          project: string
          status: string
          workspace: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          priority: string
          project: string
          status: string
          workspace: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          priority?: string
          project?: string
          status?: string
          workspace?: string
        }
        Relationships: [
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
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
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
      task_status_types: "uncompleted" | "completed"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
