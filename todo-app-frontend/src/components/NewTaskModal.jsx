import { useEffect, useState } from "react";
import { createTask, updateTask } from "../api";
import toast from "react-hot-toast";

export default function NewTaskModal({ isOpen, onClose, onTaskSaved, existingTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    sharedWith: 0,
    isPrivate: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setForm({
        title: existingTask.title || "",
        description: existingTask.description || "",
        dueDate: existingTask.dueDate?.slice(0, 10) || "",
        sharedWith: existingTask.sharedWith || 0,
        isPrivate: existingTask.isPrivate || false,
      });
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        sharedWith: 0,
        isPrivate: false,
      });
    }
  }, [existingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setForm((prev) => ({ ...prev, isPrivate: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        toast.error("User not logged in.");
        setLoading(false);
        return;
      }

      const taskData = { ...form, createdBy: userEmail };

      if (existingTask) {
        await updateTask(existingTask._id, taskData);
        toast.success("Task updated!");
      } else {
        await createTask(taskData);
        toast.success("Task created!");
      }

      onTaskSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Failed to save task:", err);
      toast.error("Failed to save task.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {existingTask ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="sharedWith"
            type="number"
            placeholder="Shared With (number)"
            value={form.sharedWith}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.isPrivate}
              onChange={handleCheckbox}
            />
            Private Task
          </label>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
