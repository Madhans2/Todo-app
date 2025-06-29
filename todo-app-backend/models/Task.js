// models/Task.js

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  status: String,
  isPrivate: { type: Boolean, default: false }, // ⬅️ for private tasks
  sharedWith: { type: Number, default: 0 },
  createdBy: {
    type: String, // You can use user ID or email here
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
