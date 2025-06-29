// src/pages/Reminders.jsx
import { useEffect, useState } from "react";

export default function Reminders() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://todo-app-9dt4.onrender.com/api/tasks/reminders") // ✅ Deployed backend
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error("Error loading reminders", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Reminders</h2>
      {tasks.length === 0 ? (
        <p>No upcoming reminders.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
