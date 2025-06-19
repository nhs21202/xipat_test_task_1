import { motion } from "framer-motion";
import {
  MdDelete,
  MdModeEditOutline,
  MdOutlineDone,
  MdClose,
} from "react-icons/md";
import { useState, useEffect } from "react";

type TaskItemProps = {
  id: string;
  content: string;
  status: string;
  index: number;
  onStatusChange: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
};

const TaskItem = ({
  id,
  content,
  status,
  index,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  useEffect(() => {
    if (status === "Done" && isEditing) {
      setIsEditing(false);
    }
  }, [status, isEditing]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(content);
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit?.(id, editValue);
    setIsEditing(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => !isEditing && onStatusChange(id)}
      className={`mt-3 flex gap-4 justify-between items-center border-b border-green-200 group hover:cursor-pointer transition-all duration-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:bg-green-50 ${
        status === "Done"
          ? "line-through text-green-700 bg-green-100 border-green-400"
          : "text-gray-800 bg-white"
      }`}
    >
      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <span className="font-bold text-green-600 mr-2">{index + 1}.</span>
          <input
            className="flex-1 border border-green-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="ml-2 rounded-full p-2 bg-blue-100 cursor-pointer shadow hover:scale-110 focus:outline-none transition-colors duration-200"
            disabled={!editValue.trim()}
            onClick={handleEditSubmit}
            title="Save changes"
          >
            <MdOutlineDone size={20} className="text-blue-700" />
          </button>
          <button
            type="button"
            className="ml-1 rounded-full p-2 bg-red-100 cursor-pointer shadow hover:scale-110 focus:outline-none transition-colors duration-200"
            onClick={() => setIsEditing(false)}
            title="Cancel"
          >
            <MdClose size={20} className="text-red-700" />
          </button>
        </div>
      ) : (
        <>
          <p className="cursor-pointer group-hover:line-through text-base sm:text-lg break-all flex-1">
            <span className="font-bold text-green-600 mr-2">{index + 1}.</span>{" "}
            {content}
          </p>
          {status !== "Done" && (
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 rounded-full p-2 bg-blue-100 cursor-pointer shadow hover:scale-110 focus:outline-none "
              onClick={handleEditClick}
              title="Edit task"
            >
              <MdModeEditOutline size={20} className="text-blue-700" />
            </button>
          )}
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200  rounded-full p-2 bg-red-100 cursor-pointer shadow hover:scale-110 focus:outline-none "
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title="Delete task"
          >
            <MdDelete size={20} className="text-red-700" />
          </button>
        </>
      )}
    </motion.div>
  );
};

export default TaskItem;
