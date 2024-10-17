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
  created_at: Date | null;
  completed_at: Date | null;
  updated_at: string;
  note_updated_at: Date | null;
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
