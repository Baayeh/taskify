export interface Task {
  id: number;
  title: string;
  note: string;
  completed: boolean;
  my_day: boolean;
  important: boolean;
  reminder: Date | null;
  due_date: Date | null;
  repeat: string;
  created: string;
  date_completed: Date | null;
  updated: string;
}

export interface AddTask {
  title: string;
  note?: string;
  completed?: boolean;
  my_day?: boolean;
  important?: boolean;
  reminder?: Date | null;
  due_date?: Date | null;
  repeat?: string;
}
