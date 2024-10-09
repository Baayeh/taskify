import { AddTask, Task } from "@/types/tasks";
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

// add task
export const ADD_TASK = async (task: AddTask): Promise<Task> => {
  const res = await api.post<Task>("/tasks/", task);
  return res.data;
};

// update task
export const UPDATE_TASK = async (task: Task): Promise<Task> => {
  const res = await api.put<Task>(`/tasks/${task.id}/`, task);
  return res.data;
};

// delete task
export const DELETE_TASK = async (id: number) => {
  const res = await api.delete<Task>(`/tasks/${id}/`);
  return res;
};
