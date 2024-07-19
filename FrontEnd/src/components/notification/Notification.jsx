import React, { useEffect, useContext } from "react";
import useUnreadMessages from "../../hooks/useUnreadMessages";
import useMarkAsRead from "../../hooks/useMarkAsRead";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Notification() {
  const unreadMessages = useUnreadMessages();
  const markAsReadStatus = useMarkAsRead();
  const { userSelectId, setUserSelectId } = useContext(AuthContext);

  useEffect(() => {
    console.log("Mark as read status: ", markAsReadStatus);
  }, [markAsReadStatus]);

  useEffect(() => {
    // console.log("Unread messages: ", unreadMessages);
  }, [unreadMessages]);

  // const handleChatClick = (userId) => {
  //   setUserSelectId(userId);
  // };

  return (
    <div>
      {/* <div>
        {unreadMessages.length > 0 ? (
          <p>Unread messages: {unreadMessages.length}</p>
        ) : (
          <p>No unread messages</p>
        )}
      </div> */}
      {/* Render chat list and call handleChatClick on chat click */}
      {/* <button onClick={() => handleChatClick("userId1")}>
        Chat with User 1
      </button> */}
      {/* <button onClick={() => handleChatClick("userId2")}>
        Chat with User 2
      </button> */}
      {/* Add more chat buttons as needed */}
    </div>
  );
}
