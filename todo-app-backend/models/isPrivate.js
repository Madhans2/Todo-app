const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  email: String,
  isPrivate: { type: Boolean, default: false },
});

export default mongoose.model("Note", noteSchema);
