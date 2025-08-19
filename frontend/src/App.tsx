import { useState, useEffect, useCallback } from 'react';
import { Todo } from './types';
import { http } from './api/http';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await http.get<Todo[]>('/api/todos');
      setTodos(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await http.post<Todo>('/api/todos', { title, done: false });
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdateTodo = async (id: number, done: boolean) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await http.put<Todo>(`/api/todos/${id}`, { ...todo, done });
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await http.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </>
  );
}

export default App;
