import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notes?email=${userEmail}`);
        const data = await res.json();
        setNotes(data.notes);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };

    if (userEmail) fetchNotes();
  }, [userEmail]);

  const filteredNotes = notes.filter((note) => {
    if (filter === "private") return note.isPrivate === true;
    if (filter === "public") return note.isPrivate === false;
    return true;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>

      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "text-blue-600" : ""}>
          All
        </button>
        <button onClick={() => setFilter("private")} className={filter === "private" ? "text-blue-600" : ""}>
          Private
        </button>
        <button onClick={() => setFilter("public")} className={filter === "public" ? "text-blue-600" : ""}>
          Public
        </button>
      </div>

      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <div key={note._id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>
              <p className="text-sm text-gray-500">Type: {note.isPrivate ? "Private" : "Public"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
