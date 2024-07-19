import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { SocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

export default function useUnreadMessages() {
  const { unreadMessages, setUnreadMessages } = useContext(AuthContext);
  const { authuser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { userSelectId } = useContext(AuthContext);
  const userSelectIdRef = useRef(userSelectId);

  useEffect(() => {
    userSelectIdRef.current = userSelectId;
  }, [userSelectId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/auth/message/unread");

        if (!res.ok) {
          const dataError = await res.json();
          throw new Error(dataError.error);
        }

        const data = await res.json();
        setUnreadMessages(data);
      } catch (error) {
        toast.error("This didn't work.");
      }
    }
    fetchData();

    const handleUnreadMessage = (message) => {
      if (userSelectIdRef.current === message.senderId) {
        // Mark as read immediately if the user is viewing the chat
        fetch("/auth/message/markasread", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: message.senderId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Message marked as read:", data);
          })
          .catch((error) =>
            console.error("Error marking message as read:", error)
          );
      } else {
        // Add to unread messages and show notification
        setUnreadMessages((prevMessages) => [...prevMessages, message]);
        // toast(`New message from ${message.senderId}`);
      }
    };

    socket.on("unreadmessage", handleUnreadMessage);

    return () => {
      socket.off("unreadmessage", handleUnreadMessage);
    };
  }, [authuser, socket]);

  useEffect(() => {
    // Remove read messages from the unreadMessages state when userSelectId changes
    setUnreadMessages((prevMessages) =>
      prevMessages.filter((message) => message.senderId !== userSelectId)
    );
  }, [userSelectId]);

  return unreadMessages;
}
