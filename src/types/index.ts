export type Task = {
  id: string;
  content: string;
  status: "Todo" | "Done";
};

export type TodoState = {
  tasks: Task[];
  statusFilter: "All" | "Todo" | "Done";
};
