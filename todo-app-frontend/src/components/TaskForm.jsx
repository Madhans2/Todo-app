import { useState, useEffect } from 'react';
import { API } from '../api';

export default function TaskForm({ selectedTask, onSuccess }) {
  const [task, setTask] = useState({
    title: '', description: '', dueDate: '', priority: 'medium', sharedWith: []
  });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task._id) await API.put(`/tasks/${task._id}`, task);
    else await API.post('/tasks', task);
    onSuccess();
    setTask({ title: '', description: '', dueDate: '', priority: 'medium', sharedWith: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input placeholder="Title" className="input" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} />
      <textarea placeholder="Description" className="input" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
      <input type="date" className="input" value={task.dueDate} onChange={e => setTask({ ...task, dueDate: e.target.value })} />
      <select className="input" value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input placeholder="Share with (email)" className="input" onBlur={e => setTask({ ...task, sharedWith: [...task.sharedWith, e.target.value] })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">{task._id ? 'Update' : 'Create'} Task</button>
    </form>
  );
}
