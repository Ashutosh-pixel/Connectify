import MessageStart from "./MessageStart";
import useGetMessages from "../../hooks/useGetMessages";
import MessageEnd from "./MessageEnd";
import SocketNewMessages from "../../hooks/SocketNewMessages.js";
import { useEffect } from "react";
import { useRef } from "react";

const Messages = () => {
  const { messageArray, blank } = useGetMessages();
  const chatContainerRef = useRef(null);
  SocketNewMessages();

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messageArray]);

  return (
    <div
      className="px-4 flex-1 overflow-auto scroll-smooth"
      ref={chatContainerRef}
    >
      {blank ? (
        <>{blank}</>
      ) : (
        messageArray && (
          <>
            {/* {messageArray?.map((message, index) => (
              <MessageEnd message={message} key={index} />
            ))}
            {messageArray?.map((message, index) => (
              <MessageStart message={message} key={index} />
            ))} */}
            {Array.isArray(messageArray) &&
              messageArray.map((person, index) =>
                person.identity === "senderMessage" ? (
                  <MessageEnd
                    message={person.message}
                    key={index}
                    time={person.createdAt}
                  />
                ) : (
                  <MessageStart
                    message={person.message}
                    key={index}
                    time={person.createdAt}
                  />
                )
              )}
          </>
        )
      )}
    </div>
  );
};

export default Messages;
