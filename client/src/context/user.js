import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ value, children }) => {
  localStorage.setItem("username", value.name);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const user = useContext(UserContext);
  return user;
}
