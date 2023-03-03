import { createContext, useReducer } from "react";
import { tasksReducer } from "../../Reducers/TasksReducer"

const tasksState = { 
  tasks: []
}

export const TasksContext = createContext(null);

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, tasksState)
  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};