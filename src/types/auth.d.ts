// user registration
export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
}

// user registration response
export interface RegisterResponse {
  data: {
    email: string;
    first_name: string;
    last_name: string;
  };
  message: string;
}

// user login
export interface LoginUser {
  email: string;
  password: string;
}

// user login response
export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  message: string;
}

// user object
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

// tokens
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
