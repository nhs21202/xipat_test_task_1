import { createSlice } from "@reduxjs/toolkit";
import { Task, TodoState } from "../types";

const initialState: TodoState = {
  tasks: [],
  statusFilter: "All",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask: Task = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 10),
        content: action.payload,
        status: "Todo",
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const { id, content } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.content = content;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "Todo" ? "Done" : "Todo";
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setReduxTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskStatus,
  setStatusFilter,
  setReduxTasks,
  editTask,
} = todoSlice.actions;
export default todoSlice.reducer;
