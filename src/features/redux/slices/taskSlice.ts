import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "@/types/tasks";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { setTasks, addTask } = taskSlice.actions;
export const selectTasks = (state: TaskState) => state.tasks;
export default taskSlice.reducer;
