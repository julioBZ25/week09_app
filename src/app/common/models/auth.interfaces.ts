export interface LoginData {
  data: UserRequest;
}

interface UserRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: DataResponse;
}

interface DataResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
}
