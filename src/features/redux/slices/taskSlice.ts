import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "@/types/tasks";
import { RootState } from "../store";

interface TaskState {
  task: Task;
  tasks: Task[];
  importantTasks: Task[];
  completedTasks: Task[];
  plannedTasks: Task[];
}

const initialState: TaskState = {
  task: {} as Task,
  tasks: [],
  importantTasks: [],
  completedTasks: [],
  plannedTasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    setImportantTasks: (state, action: PayloadAction<Task[]>) => {
      state.importantTasks = action.payload;
    },
    setCompletedTasks: (state, action: PayloadAction<Task[]>) => {
      state.completedTasks = action.payload;
    },
    setPlannedTasks: (state, action: PayloadAction<Task[]>) => {
      state.plannedTasks = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  setImportantTasks,
  setCompletedTasks,
  setPlannedTasks,
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks;

export const selectImportantTasksCount = createSelector(
  (state: RootState) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => task.important).length
);

export const selectPlannedTasksCount = createSelector(
  (state: RootState) => state.tasks.tasks,
  (tasks) =>
    tasks.filter((task) => task.due_date != null || task.reminder != null)
      .length
);

export default taskSlice.reducer;
