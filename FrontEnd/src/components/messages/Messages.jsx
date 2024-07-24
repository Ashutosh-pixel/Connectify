import MessageStart from "./MessageStart";
import useGetMessages from "../../hooks/useGetMessages";
import MessageEnd from "./MessageEnd";
import SocketNewMessages from "../../hooks/SocketNewMessages.js";
import React, { useEffect, useState, useRef } from "react";
import DateSeparator from "../dateseparator/DateSeparator.jsx"; // Import the DateSeparator component

const Messages = () => {
  const { messageArray, blank } = useGetMessages();
  const chatContainerRef = useRef(null);
  let [dateArray, setDateArray] = useState([]);
  let [datesObject, setDatesObject] = useState({});

  SocketNewMessages();

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
      if (messageArray.length > 0) {
        let result = UniqueDatesArray(messageArray);
        setDateArray(result.dateset);
        setDatesObject(result.dateobject);
      }
      console.log("datesObject = ", datesObject);
    }
  }, [messageArray]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const shouldShowDateSeparator = (currentIndex) => {
    if (currentIndex === 0) return true;

    const currentMessageDate = new Date(
      messageArray[currentIndex].createdAt
    ).toDateString();
    const previousMessageDate = new Date(
      messageArray[currentIndex - 1].createdAt
    ).toDateString();

    return currentMessageDate !== previousMessageDate;
  };

  return (
    <div
      className="px-4 flex-1 overflow-auto scroll-smooth"
      ref={chatContainerRef}
    >
      {blank ? (
        <>{blank}</>
      ) : (
        Array.isArray(messageArray) && (
          <>
            {messageArray.map((person, index) => (
              <React.Fragment key={index}>
                {shouldShowDateSeparator(index) && (
                  <DateSeparator date={formatDate(person.createdAt)} />
                )}
                {person.identity === "senderMessage" ? (
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
                )}
              </React.Fragment>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default Messages;

function UniqueDatesArray(messageArray) {
  let dateset = new Set();
  let dateobject = {};
  const options = { year: "numeric", month: "long", day: "numeric" };

  if (Array.isArray(messageArray)) {
    let currentdate = messageArray[0].createdAt.split("T")[0];

    messageArray.forEach((message, index) => {
      let messageDate = message.createdAt.split("T")[0];
      if (currentdate !== messageDate) {
        dateobject[currentdate] = index - 1;
        let formattedDate = new Date(currentdate).toLocaleDateString(
          undefined,
          options
        );
        dateset.add(formattedDate);
        currentdate = messageDate;
      }
    });
    dateobject[currentdate] = messageArray.length - 1;

    // Add the last processed date
    let lastFormattedDate = new Date(currentdate).toLocaleDateString(
      undefined,
      options
    );
    dateset.add(lastFormattedDate);
  }

  return {
    dateset: Array.from(dateset),
    dateobject: dateobject,
  };
}
