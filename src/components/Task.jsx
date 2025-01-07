import { useState } from 'react';

export default function Task({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  function handleUpdate() {
    if (!editedText.trim() || editedText === task.text) {
      setEditedText(task.text);
      setIsEditing(false);
      return;
    }

    onUpdate(editedText);
    setIsEditing(false);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleUpdate();
    } else if (event.key === 'Escape') {
      setEditedText(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all duration-200">
      <input
        type="checkbox"
        className="w-5 h-5 accent-purple-600 cursor-pointer rounded-md"
        checked={task.completed}
        onChange={onToggle}
      />
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            className="w-full px-3 py-1 rounded-md bg-purple-50 text-purple-900 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <p
            className={`text-purple-900 truncate cursor-pointer ${
              task.completed ? 'line-through text-purple-400' : ''
            }`}
            onClick={() => setIsEditing(true)}
          >
            {task.text}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded text-purple-500 hover:text-purple-700 hover:bg-purple-100 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded text-purple-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
