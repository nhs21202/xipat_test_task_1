import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../store/store";
import {
  deleteTask,
  toggleTaskStatus,
  setStatusFilter,
  editTask,
} from "../store/todoSlice";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  const statusFilter = useSelector(
    (state: RootState) => state.todos.statusFilter
  );

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "All") return true;
    return task.status === statusFilter;
  });

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };
  const handleEdit = (id: string, content: string) => {
    dispatch(editTask({ id, content }));
    console.log(id, content);
  };

  return (
    <div className="w-full max-w-md mt-8">
      <div className="flex justify-center gap-4 mb-6">
        {["All", "Todo", "Done"].map((filter) => (
          <motion.button
            key={filter}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              dispatch(setStatusFilter(filter as "All" | "Todo" | "Done"))
            }
            className={`px-4 py-2 rounded-lg ${
              statusFilter === filter
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 px-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <motion.div
              animate={{
                rotate: [10, -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-4xl mb-4"
            >
              📝
            </motion.div>
            <p className="text-gray-600 text-lg">
              {statusFilter === "All"
                ? "No tasks yet! Add one above 👆"
                : `No ${statusFilter.toLowerCase()} tasks!`}
            </p>
          </motion.div>
        ) : (
          filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
            >
              <TaskItem
                id={task.id}
                content={task.content}
                status={task.status}
                index={idx}
                onStatusChange={() => handleStatusChange(task.id)}
                onDelete={() => handleDelete(task.id)}
                onEdit={handleEdit}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
