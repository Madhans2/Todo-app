import {
  FaRegCalendarAlt,
  FaUserFriends,
  FaShareAlt,
  FaLock,
} from "react-icons/fa";

export default function TaskCard({
  id,
  title = "No Title",
  description = "No Description",
  date = "N/A",
  sharedWith = 0,
  isPrivate = false,
  onEdit,
  onDelete,
}) {
  const handleShare = () => {
    const subject = encodeURIComponent(`Task Shared: ${title}`);
    const body = encodeURIComponent(
      `Hey, check out this task:\n\n${title}\n${description}\n\nOpen here: http://localhost:5173/task/${id}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <div className="relative bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 w-full max-w-sm hover:bg-teal-300">
      {/* Icon and Actions */}
      <div className="flex justify-between items-start mb-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          {isPrivate ? (
            <FaLock className="text-red-600 text-lg" title="Private Task" />
          ) : (
            <FaRegCalendarAlt className="text-blue-600 text-lg" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            title="Edit Task"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            title="Delete Task"
          >
            Delete
          </button>
          <button
            onClick={handleShare}
            className="text-green-600 hover:text-green-800 text-lg"
            title="Share via Gmail"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {title}
      </h2>
      <p
        className="text-sm text-gray-500 mb-4 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </p>

      {/* Meta info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaUserFriends className="text-blue-500" />
          <span className="font-semibold">
            {String(sharedWith).padStart(2, "0")} Share
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegCalendarAlt className="text-blue-500" />
          <span className="font-semibold">{date}</span>
        </div>
      </div>

      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-b-xl"></div>
    </div>
  );
}
