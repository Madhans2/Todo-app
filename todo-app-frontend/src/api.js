import axios from "axios";

// ✅ Set base URL for API
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ✅ Helper to get user email from localStorage
const getUserEmail = () => localStorage.getItem("userEmail");

// ✅ Fetch all tasks created by the current user
export const fetchTasks = () => {
  const userEmail = getUserEmail();
  return API.get(`/tasks?user=${userEmail}`).then((res) => res.data);
};

// ✅ Create a new task (adds createdBy field from localStorage)
export const createTask = (task) => {
  const userEmail = getUserEmail();
  return API.post("/tasks", { ...task, createdBy: userEmail }).then((res) => res.data);
};

// ✅ Update a task by ID
export const updateTask = (id, task) => {
  return API.put(`/tasks/${id}`, task).then((res) => res.data);
};

// ✅ Delete a task by ID
export const deleteTask = (id) => {
  return API.delete(`/tasks/${id}`).then((res) => res.data);
};
