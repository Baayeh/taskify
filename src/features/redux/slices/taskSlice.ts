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
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
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
  setTask,
  setTasks,
  addTask,
  setImportantTasks,
  setCompletedTasks,
  setPlannedTasks,
  updateTask,
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks;

export const selectUncompletedTasks = createSelector(
  (state: RootState) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => !task.completed).length
);

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

export const selectMyDayTasksCount = createSelector(
  (state: RootState) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => task.my_day).length
);

export default taskSlice.reducer;
