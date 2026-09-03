export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type LoadStatus = "loading" | "ready" | "error";