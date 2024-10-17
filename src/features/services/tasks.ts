import { AddTask, Task } from "@/types/tasks";
import privateApi from "./privateApi";

// fetch all tasks
export const GET_ALL_TASKS = async (): Promise<Task[]> => {
  const res = await privateApi.get<Task[]>("/tasks/");
  return res.data;
};

// fetch single task
export const GET_TASK = async (id: number): Promise<Task> => {
  const res = await privateApi.get<Task>(`/tasks/${id}/`);
  return res.data;
};

// add task
export const ADD_TASK = async (task: AddTask): Promise<Task> => {
  const res = await privateApi.post<Task>("/tasks/", task);
  return res.data;
};

// update task
export const UPDATE_TASK = async (task: Task): Promise<Task> => {
  const res = await privateApi.put<Task>(`/tasks/${task.id}/`, task);
  return res.data;
};

// delete task
export const DELETE_TASK = async (id: number) => {
  const res = await privateApi.delete<Task>(`/tasks/${id}/`);
  return res;
};
