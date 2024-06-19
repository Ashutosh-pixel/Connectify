import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
const Messages = () => {
  const { messageArray, blank } = useGetMessages();
  console.log(messageArray);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {blank ? (
        <>{blank}</>
      ) : (
        messageArray.map((message, index) => {
          return <Message message={message} key={index} />;
        })
      )}
    </div>
  );
};
export default Messages;
