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
      Advisors: {
        Row: {
          Duration: number | null
          Industry: string | null
          LinkedIn: string | null
          Location: string | null
          Name: string
          Picture: string | null
        }
        Insert: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string | null
          Location?: string | null
          Name?: string
          Picture?: string | null
        }
        Update: {
          Duration?: number | null
          Industry?: string | null
          LinkedIn?: string | null
          Location?: string | null
          Name?: string
          Picture?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          lead_linkedin_url: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          lead_linkedin_url: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          lead_linkedin_url?: string
        }
        Relationships: []
      }
      "Established-Connection": {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string
          Last_Name: string | null
          LinkedIn_URL: string
          "Profile Picture": string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name: string
          Last_Name?: string | null
          LinkedIn_URL: string
          "Profile Picture"?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string
          Last_Name?: string | null
          LinkedIn_URL?: string
          "Profile Picture"?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      Leads: {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      "More-Active-Leads": {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          Deal_Size: string | null
          Email: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
          Time_Stamp: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          Deal_Size?: string | null
          Email?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
          Time_Stamp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      "Uncertain Leads": {
        Row: {
          Advisor: string | null
          Company: string | null
          Company_Website: string | null
          First_Name: string | null
          Full_Name: string | null
          Last_Name: string | null
          LinkedIn_URL: string
          Profile_Picture: string | null
        }
        Insert: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL: string
          Profile_Picture?: string | null
        }
        Update: {
          Advisor?: string | null
          Company?: string | null
          Company_Website?: string | null
          First_Name?: string | null
          Full_Name?: string | null
          Last_Name?: string | null
          LinkedIn_URL?: string
          Profile_Picture?: string | null
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
      [_ in never]: never
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
