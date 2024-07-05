import MessageStart from "./MessageStart";
import useGetMessages from "../../hooks/useGetMessages";
import MessageEnd from "./MessageEnd";
import SocketNewMessages from "../../hooks/SocketNewMessages.js";
import {useEffect} from "react";

const Messages = () => {
  const { messageArray, blank } = useGetMessages();
  console.log(messageArray);

  SocketNewMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {blank ? (
        <>{blank}</>
      ) : (
        messageArray && (
          <>
            {messageArray.senderMessage?.map((message, index) => (
              <MessageEnd message={message} key={index} />
            ))}
            {messageArray.recieverMessage?.map((message, index) => (
              <MessageStart message={message} key={index} />
            ))}
          </>
        )
      )}
    </div>
  );
};

export default Messages;
