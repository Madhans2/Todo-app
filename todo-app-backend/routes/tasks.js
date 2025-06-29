// routes/taskRoutes.js (ES Module)

import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ GET tasks filtered by user (private tasks)
router.get('/user', async (req, res) => {
  try {
    const { user } = req.query;
    const tasks = await Task.find({ createdBy: user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all tasks (for admin/global view)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update task by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete task by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server/routes/taskRoutes.js
router.get("/reminders", async (req, res) => {
  const now = new Date();
  const upcomingTasks = await Task.find({ dueDate: { $gte: now } });
  res.json({ tasks: upcomingTasks });
});



export default router;
