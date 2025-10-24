"use client";
import { useState } from "react";

export default function HomePage() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 px-2">
      <div className="w-full sm:max-w-lg rounded-xl shadow-xl p-6 bg-white border border-slate-200">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight text-center mb-6 drop-shadow-sm">
          Todo List
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg placeholder:italic shadow-sm transition"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 ? (
            <li className="text-gray-500 text-center text-lg font-medium py-4">
              No tasks added yet.
            </li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-50/60 border border-slate-200 rounded-lg px-4 py-3 shadow-sm hover:shadow transition"
              >
                <span className="text-gray-800 text-lg break-all">{todo}</span>
                <button
                  onClick={() => deleteTodo(index)}
                  className="ml-4 px-3 py-1 rounded-md bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                  aria-label="Delete"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}

