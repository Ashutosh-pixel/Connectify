import { useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import { AuthContext } from "../../context/AuthContextProvider";

const Conversations = () => {
  const { getallusers } = useContext(AuthContext);
  const { unreadMessages, setUnreadMessages } = useContext(AuthContext);

  let unreadmessagecount = {};

  useEffect(() => {
    if (getallusers) {
      getallusers.forEach((element1) => {
        unreadMessages.forEach((element2) => {
          if (element1._id === element2.senderId) {
            if (element1._id in unreadmessagecount) {
              unreadmessagecount[element1._id]++;
            } else {
              unreadmessagecount[element1._id] = 1;
            }
          }
        });
      });
    }
    console.log("unreadmessagecount =", unreadmessagecount);
  }, [unreadMessages, getallusers]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation /> */}
      {getallusers.map((userdetail, index) => {
        return (
          <Conversation
            key={index}
            userdetail={userdetail}
            id={userdetail._id}
            unreadmessagecount={unreadmessagecount}
          ></Conversation>
        );
      })}
    </div>
  );
};
export default Conversations;
