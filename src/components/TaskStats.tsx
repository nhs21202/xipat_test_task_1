import { motion } from "framer-motion";
import React from "react";

type TaskStatsProps = {
  all: number;
  todo: number;
  done: number;
};
const TaskStats = ({ all, todo, done }: TaskStatsProps) => {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="flex w-full justify-between  my-4 gap-4"
    >
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-blue-600">{all}</span>
        <span className="mt-2 text-lg text-gray-700">Total</span>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-orange-600">{todo}</span>
        <span className="mt-2 text-lg text-gray-700">Pending</span>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <span className="text-3xl font-bold text-green-600">{done}</span>
        <span className="mt-2 text-lg text-gray-700">Done</span>
      </div>
    </motion.div>
  );
};

export default TaskStats;
