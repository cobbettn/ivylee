import { createContext, useReducer } from "react";

const initialValue = { 
  user: {}
}

export const UserContext = createContext(null);

// export const UserContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(() => {}, initialValue)
//   return (
//     <UserContext.Provider value={{ state, dispatch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };