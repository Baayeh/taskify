import { RegisterUser, LoginUser, LoginResponse } from "@/types/auth";
import api from "./api";

interface RegisterResponse {
  message: string;
}

// user registration
export const REGISTER_USER = async (
  data: RegisterUser
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register/", data);
  return res.data;
};

// user login
export const LOGIN_USER = async (data: LoginUser): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login/", data);
  return res.data;
};
