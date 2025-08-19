import { Todo } from '../types';
// Test

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Done</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => onUpdate(todo.id, e.target.checked)}
              />
            </td>
            <td>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
