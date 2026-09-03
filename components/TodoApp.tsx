"use client";

import { useEffect, useId, useState } from "react";
import { createTask, loadTasks, saveTasks } from "@/lib/taskStore";
import type { LoadStatus, Task } from "@/lib/types";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorId = useId();

  useEffect(() => {
    void loadTasks()
      .then((stored) => {
        setTasks(stored);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        setErrorMessage(toMessage(error));
        setStatus("error");
      });
  }, []);

  async function persist(next: Task[]) {
    setTasks(next);
    try {
      await saveTasks(next);
    } catch (error) {
      setErrorMessage(toMessage(error));
    }
  }

  function handleAdd(title: string) {
    const next = [createTask(title), ...tasks];
    void persist(next);
  }

  function handleToggle(id: string) {
    const next = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    void persist(next);
  }

  function handleDelete(id: string) {
    const next = tasks.filter((task) => task.id !== id);
    void persist(next);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        My Tasks
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        A simple, local-first to-do list. Tasks are saved in your browser.
      </p>

      <div className="mt-6">
        <TodoInput onSubmit={handleAdd} />
      </div>

      <section
        className="mt-6"
        aria-label="Task list"
        aria-live="polite"
        aria-busy={status === "loading"}
      >
        <h2 className="sr-only">Tasks</h2>

        {status === "loading" ? (
          <SkeletonList count={3} />
        ) : status === "error" ? (
          <ErrorState
            message={errorMessage ?? "Something went wrong while loading your tasks."}
            errorId={errorId}
            onRetry={() => window.location.reload()}
          />
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}

        {tasks.length > 0 ? (
          <p
            className="mt-4 text-xs text-slate-400 dark:text-slate-500"
            aria-live="polite"
          >
            {tasks.filter((task) => task.completed).length} of {tasks.length} tasks
            completed
          </p>
        ) : null}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400"
    >
      <p className="font-medium">No tasks yet</p>
      <p className="mt-1 text-sm">Add your first task above to get started.</p>
    </div>
  );
}

function ErrorState({
  message,
  errorId,
  onRetry,
}: {
  message: string;
  errorId: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      aria-describedby={errorId}
      className="rounded-xl border border-rose-300 bg-rose-50 p-6 text-rose-800 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
    >
      <p id={errorId} className="font-medium">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300"
      >
        Reload
      </button>
    </div>
  );
}

function SkeletonList({ count }: { count: number }) {
  return (
    <ul className="space-y-2" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="h-11 animate-pulse rounded-lg border border-slate-200 bg-slate-200 dark:border-slate-700 dark:bg-slate-800"
        />
      ))}
    </ul>
  );
}

function toMessage(error: unknown): string {
  return typeof error === "object" && error !== null && "message" in error
    ? String((error as { message: unknown }).message)
    : "Something went wrong.";
}