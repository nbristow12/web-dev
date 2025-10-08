export interface User {
  id: number;
  name: string;
  birthday: string;
  email: string;
  created_at: string;
}

export interface CreateUserRequest {
  name: string;
  birthday: string;
  email: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface ApiError {
  error: string;
}