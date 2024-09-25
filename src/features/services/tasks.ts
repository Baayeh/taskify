import { Task } from "@/types/tasks";
import api from "./api";

// fetch all tasks
export const GET_ALL_TASKS = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks/");
  return res.data;
};

// fetch single task
export const GET_TASK = async (id: number): Promise<Task> => {
  const res = await api.get<Task>(`/tasks/${id}/`);
  return res.data;
};

// fetch important tasks
export const GET_IMPORTANT_TASKS = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks/important/");
  return res.data;
};

// fetch planned tasks
export const GET_PLANNED_TASKS = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks/planned/");
  return res.data;
};
