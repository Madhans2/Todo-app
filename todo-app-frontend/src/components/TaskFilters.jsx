// components/TaskFilters.jsx
export default function TaskFilters({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={() => setFilter("all")} className={btnStyle(filter === "all")}>All</button>
      <button onClick={() => setFilter("today")} className={btnStyle(filter === "today")}>Due Today</button>
      <button onClick={() => setFilter("overdue")} className={btnStyle(filter === "overdue")}>Overdue</button>
      <button onClick={() => setFilter("priorityHigh")} className={btnStyle(filter === "priorityHigh")}>Priority: High → Low</button>
      <button onClick={() => setFilter("priorityLow")} className={btnStyle(filter === "priorityLow")}>Priority: Low → High</button>
      <button onClick={() => setFilter("completed")} className={btnStyle(filter === "completed")}>Completed</button>
      <button onClick={() => setFilter("inProgress")} className={btnStyle(filter === "inProgress")}>In Progress</button>
      <button onClick={() => setFilter("SharedNotes")} className={btnStyle(filter === "SharedNotes")}>Shared Notes</button>
    </div>
  );
}

function btnStyle(active) {
  return `px-3 py-1 rounded-full text-sm border ${active ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`;
}
