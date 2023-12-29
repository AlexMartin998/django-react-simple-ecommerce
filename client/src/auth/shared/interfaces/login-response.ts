export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface Token {
  user_id: number;
  exp: number;
  is_staff: boolean;
  email: string;
  name: string;
  last_name: string;
  avatar: File | null;
}
