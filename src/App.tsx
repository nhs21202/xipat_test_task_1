import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { RootState } from "./store/store";
import { setReduxTasks } from "./store/todoSlice";
import TaskStats from "./components/TaskStats";
const selectTaskCounts = (state: RootState) => {
  const all = state.todos.tasks.length;
  const todo = state.todos.tasks.filter(
    (task) => task.status === "Todo"
  ).length;
  const done = state.todos.tasks.filter(
    (task) => task.status === "Done"
  ).length;
  return { all, todo, done };
};
function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  const { all, todo, done } = useSelector(selectTaskCounts);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    console.log(savedTasks);
    if (savedTasks) {
      dispatch(setReduxTasks(JSON.parse(savedTasks)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="bg-indigo-100 w-full h-full min-h-screen">
      <div className=" max-w-2xl container mx-auto p-5 lg:p-10 flex flex-col items-center">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex flex-col items-center justify-center text-center max-w-lg"
        >
          <h1 className="mb-2 font-bold text-3xl">Todo App</h1>
          <p>
            Fill the input and click button or "Enter" to add a new task into
            the list. To mark as completed, just click directly to the task
          </p>
        </motion.div>
        <TaskStats all={all} todo={todo} done={done} />
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
