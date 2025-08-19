import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo Title"
      />
      <button type="submit">Add</button>
    </form>
  );
}
