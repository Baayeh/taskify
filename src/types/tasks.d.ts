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
  created: Date | null;
  date_completed: Date | null;
  updated: string;
  note_updated: Date | null;
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
