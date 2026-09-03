import { type FormEvent, type MouseEvent } from "react";

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

export function TodoInput({ onSubmit }: TodoInputProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const field = form.elements.namedItem("new-task") as HTMLInputElement | null;
    const title = field?.value.trim() ?? "";

    if (title.length === 0) {
      return;
    }

    onSubmit(title);
    if (field) {
      field.value = "";
      field.focus();
    }
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    const field = form?.elements.namedItem("new-task") as HTMLInputElement | null;
    if (field) {
      field.value = "";
      field.focus();
    }
  }

  return (
    <form
      className="flex gap-3 rounded-xl border border-slate-300 bg-white p-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900"
      onSubmit={handleSubmit}
      aria-label="Create a new task"
    >
      <label className="visually-hidden" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        name="new-task"
        type="text"
        placeholder="What needs to be done?"
        maxLength={200}
        autoComplete="off"
        aria-describedby="new-task-help"
        className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        Add
      </button>
      <button
        type="reset"
        className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
        onClick={handleClear}
      >
        Clear
      </button>
      <span id="new-task-help" className="visually-hidden">
        Enter a task title and press Add to create it. Max 200 characters.
      </span>
    </form>
  );
}