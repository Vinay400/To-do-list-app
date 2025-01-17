import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, SunMedium } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <SunMedium className="text-yellow-500" />
                My Day
              </h1>
              <p className="text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-violet-100 px-4 py-2 rounded-full">
              <span className="text-violet-600 font-medium">{todos.length} tasks</span>
            </div>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 text-white px-6 rounded-xl flex items-center gap-2 transition-colors"
              >
                <PlusCircle size={20} />
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                } hover:shadow-md border border-gray-100`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="focus:outline-none"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-green-500 hover:text-green-600 transition-colors" size={24} />
                  ) : (
                    <Circle className="text-gray-400 hover:text-violet-500 transition-colors" size={24} />
                  )}
                </button>
                <span
                  className={`flex-1 text-lg ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;