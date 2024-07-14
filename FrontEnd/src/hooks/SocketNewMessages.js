import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { SocketContext } from "../context/SocketContext.jsx";

const SocketNewMessages = () => {
  const { usermessage, setUserMessage } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);
  let { dummymessage, setDummymessage } = useContext(AuthContext);

  useEffect(() => {
    socket?.on("newmessage", (newmessage) => {
      setUserMessage((prev) => [...prev, newmessage]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("newmessage");
    };
  }, []);
};

export default SocketNewMessages;
