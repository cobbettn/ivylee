import { createContext, useReducer } from "react";
import { tasksReducer } from "../tasksReducer";

const initialValue = { 
  tasks: [] 
}

export const TasksContext = createContext(null);

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialValue)
  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};