"use client";
import React, { useState } from "react";

export default function HomePage() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // track which todo is being edited
  const [editText, setEditText] = useState(""); // track the new text

  console.log("🟢 Current todos:", todos);
  console.log("✏️ editIndex:", editIndex, "editText:", editText);

  // ADD TODO
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  // DELETE TODO
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // START EDIT
  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(todos[index]);
    console.log("🟡 Editing todo index:", index, "value:", todos[index]);
  };

  // UPDATE / SAVE EDITED TODO
  const saveTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
    console.log("✅ Saved updated todo:", updatedTodos);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 px-2">
      <div className="w-full sm:max-w-lg rounded-xl shadow-xl p-6 bg-white border border-slate-200">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight text-center mb-6">
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
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 ? (
            <li className="text-gray-500 text-center text-lg py-4">
              No tasks added yet.
            </li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-50 border border-slate-200 rounded-lg px-4 py-3 shadow-sm hover:shadow transition"
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 mr-3 border rounded-md px-2 py-1 text-slate-800 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span className="text-lg text-slate-800 flex-1">{todo}</span>
                )}

                <div className="flex gap-2">
                  {editIndex === index ? (
                    <button
                      onClick={() => saveTodo(index)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(index)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-700 hover:text-white transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(index)}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-700 transition hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
