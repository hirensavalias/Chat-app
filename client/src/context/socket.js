import { createContext, useContext } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log(socket.id);
});

const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
