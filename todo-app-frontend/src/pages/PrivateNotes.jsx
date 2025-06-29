import { useEffect, useState } from "react";

function PrivateNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("https://todo-app-9dt4.onrender.com/api/notes/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setNotes(data);
        } else {
          console.error("Failed to fetch notes", data.message);
        }
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Private Notes</h2>
      {notes.length === 0 ? (
        <p>No private notes available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <li key={note._id} className="bg-white shadow p-4 rounded">
              <h3 className="font-semibold text-lg">{note.title}</h3>
              <p className="text-sm mt-2">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PrivateNotes;
