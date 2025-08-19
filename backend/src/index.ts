
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn React', done: true },
  { id: 2, title: 'Learn TypeScript', done: false },
  { id: 3, title: 'Build a Todo App', done: false },
];
let nextId = 4;

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { title, done } = req.body;
  if (typeof title !== 'string' || typeof done !== 'boolean') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  const newTodo: Todo = {
    id: nextId++,
    title,
    done,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, done } = req.body;
  
  if (typeof title !== 'string' || typeof done !== 'boolean') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const updatedTodo = { ...todos[todoIndex], title, done };
  todos[todoIndex] = updatedTodo;

  res.json(updatedTodo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
