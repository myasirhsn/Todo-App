import type { Task } from "./types";

const STORAGE_KEY = "todo-app/tasks";

export async function loadTasks(): Promise<Task[]> {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isTask).sort(byNewestFirst);
  } catch {
    throw new Error("Could not load saved tasks from local storage.");
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    throw new Error("Could not save tasks to local storage.");
  }
}

export function createTask(title: string): Task {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: title.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.completed === "boolean" &&
    typeof candidate.createdAt === "number"
  );
}

function byNewestFirst(a: Task, b: Task): number {
  return b.createdAt - a.createdAt;
}