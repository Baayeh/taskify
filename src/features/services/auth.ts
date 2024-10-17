import { RegisterUser } from "@/types/auth";
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
