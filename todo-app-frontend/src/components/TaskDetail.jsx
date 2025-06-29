// src/pages/TaskDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-600">Loading task...</p>;
  if (!task) return <p className="p-6 text-red-600">Task not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
      <p className="mt-2 text-gray-600">{task.description}</p>
      <p className="mt-4 text-sm text-gray-400">Due Date: {task.dueDate}</p>
      {task.sharedWith?.length > 0 && (
        <p className="mt-2 text-sm text-blue-500">
          Shared with: {task.sharedWith.join(", ")}
        </p>
      )}
    </div>
  );
}
