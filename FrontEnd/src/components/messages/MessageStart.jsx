import React from "react";

export default function MessageStart({ message, time }) {
  const messagetime = getMessageTime(time);
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar"></div>
      <div className="chat-bubble text-white bg-blue-500">{message}</div>
      <div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
        {messagetime}
      </div>
    </div>
  );
}

function getMessageTime(message) {
  const createdAt = new Date(message);
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const formattedCreatedAt = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return formattedCreatedAt;
}
