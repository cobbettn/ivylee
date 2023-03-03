import { createContext, useReducer } from "react";
import { DateReducer } from "../../Reducers/DateReducer";

const date = { 
  date: new Date(),
}
export const DateContext = createContext(null);

export const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DateReducer, date)
  return (
    <DateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};