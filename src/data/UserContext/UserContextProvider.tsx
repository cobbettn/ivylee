import { createContext, useReducer } from "react";
import { tasksReducer } from "../tasksReducer";

const initialValue = { 
  user: {}
}

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialValue)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};