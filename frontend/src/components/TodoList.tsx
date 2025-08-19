import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => onUpdate(todo.id, e.target.checked)}
          />
          <span className="todo-title">{todo.title}</span>
          <button onClick={() => onDelete(todo.id)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
