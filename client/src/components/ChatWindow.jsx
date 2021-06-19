import { useEffect, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/user";
import { ChatHistory } from "./ChatHistory";
import uniqid from "uniqid";
import "./ChatWindow.scss";

export const ChatWindow = () => {
  const [message, setMessage] = useState();
  const socket = useSocket();
  const user = useUser();

  useEffect(() => {
    socket.on("new user", (activeUsers) => {
      console.log(activeUsers);
    });
  });

  const onSend = () => {
    const sanitizedMessage = message.trim();
    if (sanitizedMessage !== "") {
      setMessage("");
      socket.emit("send", { id: uniqid(), user, message: message.trim() });
    }
  };

  return (
    <div className="chat-window">
      <ChatHistory />
      <div className="message-container">
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          placeholder="enter your message"
          autoFocus
        />
        <button className="send-button" onClick={onSend}>
          send
        </button>
      </div>
    </div>
  );
};
