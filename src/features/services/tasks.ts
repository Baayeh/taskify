import { Task } from "@/types/tasks";
import api from "./api";

// fetch all tasks
export const GET_ALL_TASKS = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks/");
  return res.data;
};
