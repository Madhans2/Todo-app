import { useEffect, useState } from 'react';
import { API } from '../api';
import { socket } from '../socket';

export default function TaskList({ onSelect }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    socket.on('taskCreated', task => setTasks(prev => [task, ...prev]));
    socket.on('taskUpdated', updated => setTasks(prev => prev.map(t => t._id === updated._id ? updated : t)));
    socket.on('taskDeleted', id => setTasks(prev => prev.filter(t => t._id !== id)));
    return () => socket.off();
  }, []);

  const handleDelete = async (id) => await API.delete(`/tasks/${id}`);

  return (
    <div className="grid gap-4">
      {tasks.map(task => (
        <div key={task._id} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
          <div className="flex gap-2 mt-2">
            <button className="btn" onClick={() => onSelect(task)}>Edit</button>
            <button className="btn bg-red-500" onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}