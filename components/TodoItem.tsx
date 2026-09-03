import type { Task } from "@/lib/types";

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
        className="mt-1.5 size-5 shrink-0 accent-indigo-600"
      />
      <span
        className={`min-w-0 flex-1 text-slate-800 dark:text-slate-200 ${
          task.completed ? "line-through text-slate-400 dark:text-slate-500" : ""
        }`}
      >
        {task.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
        className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-rose-600 opacity-0 transition hover:bg-rose-50 hover:text-rose-700 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-rose-300 group-hover:opacity-100 dark:text-rose-400 dark:hover:bg-rose-950 dark:hover:text-rose-300"
      >
        Delete
      </button>
    </li>
  );
}