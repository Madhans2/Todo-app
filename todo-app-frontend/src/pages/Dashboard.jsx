// Responsive Sidebar + Header layout with mobile support
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import NewTaskModal from "../components/NewTaskModal";
import { deleteTask, fetchTasks } from "../api";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const userEmail = localStorage.getItem("userEmail");

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(userEmail);
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEdit = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      setEditingTask(task);
      setIsModalOpen(true);
    } else {
      toast.error("Failed to load task for editing");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted");
        loadTasks();
      } catch {
        toast.error("Failed to delete task");
      }
    }
  };

  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const sortByPriority = (arr, desc = true) =>
      [...arr].sort((a, b) =>
        desc ? b.priority - a.priority : a.priority - b.priority
      );
    const visibleTasks = tasks.filter((t) => !t.isPrivate);

    switch (filter) {
      case "today":
        return visibleTasks.filter((task) => task.dueDate?.startsWith(today));
      case "overdue":
        return visibleTasks.filter(
          (task) => task.dueDate && new Date(task.dueDate) < new Date(today)
        );
      case "priorityHigh":
        return sortByPriority(visibleTasks, true);
      case "priorityLow":
        return sortByPriority(visibleTasks, false);
      case "completed":
        return visibleTasks.filter((task) => task.status === "completed");
      case "inProgress":
        return visibleTasks.filter((task) => task.status === "in-progress");
      case "SharedNotes":
    return visibleTasks.filter((task) => task.sharedWith && task.sharedWith.length > 0);
      default:
        return visibleTasks;
    }
  }, [tasks, filter]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:shadow-none`}
      >
        <Sidebar openModal={() => setIsModalOpen(true)} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow sm:px-6">
          <button
            className="sm:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Header />
        </div>

        {/* Main Area */}
        <main className="p-4 sm:p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
          <TaskFilters filter={filter} setFilter={setFilter} />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                date={task.dueDate}
                sharedWith={task.sharedWith}
                priority={task.priority}
                status={task.status}
                isPrivate={task.isPrivate}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </section>
        </main>
      </div>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onTaskSaved={loadTasks}
        existingTask={editingTask}
      />
    </div>
  );
}
