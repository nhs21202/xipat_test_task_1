import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addTask } from "../store/todoSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md mt-8"
    >
      <div className="relative flex gap-3 p-2 bg-white rounded-2xl shadow-md border border-gray-100">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent border-0 rounded-xl focus:outline-none focus:ring-0 text-sm font-medium"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddTask}
          disabled={!task.trim()}
          className="px-6 py-3 text-white bg-blue-500 rounded-xl  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-md"
        >
          Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskInput;
