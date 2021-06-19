import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/socket";
import { useUser } from "../context/user";
import "./ChatHistory.scss";

export const ChatHistory = () => {
  const socket = useSocket();
  const user = useUser();
  const newMessageRef = useRef();
  const [messageHistory, updateMessageHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    const localMessageHistoryJSON = localStorage.getItem("history");
    if (localMessageHistoryJSON) {
      try {
        const localMessageHistory = JSON.parse(localMessageHistoryJSON);
        updateMessageHistory([...localMessageHistory]);
        setHistoryLoaded(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    socket.on("send-message-to-all", ({ user, message }) => {
      messageHistory.push({ username: user.name, message });
      updateMessageHistory((m) => {
        console.log(console.log(messageHistory));
        return [...messageHistory];
      });
    });
  }, [socket, historyLoaded]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(messageHistory));
  }, [messageHistory]);

  useEffect(() => {
    if (!newMessageRef.current) {
      //   newMessageRef.current = true;
    } else {
      newMessageRef.current?.scrollIntoView(true);
    }
  });

  return (
    <div className="chat-history-window">
      {messageHistory.map((message, index) => {
        if (message.username === user.name) {
          return (
            <div
              className="users-message"
              key={message.id}
              ref={index === messageHistory.length - 1 ? newMessageRef : null}
            >
              <div className="users-name">you</div>
              <div>{message.message}</div>
            </div>
          );
        }
        return (
          <div
            className="others-message"
            key={message.id}
            ref={index === messageHistory.length - 1 ? newMessageRef : null}
          >
            <div className="others-name">{message.username}</div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </div>
  );
};
