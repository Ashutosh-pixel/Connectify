import { useContext } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessage } from "react-icons/ti";
import { AuthContext } from "../../context/AuthContextProvider";

const MessageContainer = () => {
  const { noChatSelected, setNoChatSelected } = useContext(AuthContext);
  const { chatSelect, setChatSelect } = useContext(AuthContext);
  const { authuser } = useContext(AuthContext);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected authuser={authuser}></NoChatSelected>
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center">
            <img
              src={chatSelect.profile}
              alt="user avatar"
              className="w-10 rounded-full"
            />
            <span className="ml-3 text-white font-bold">
              {chatSelect.fullname}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = ({ authuser }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authuser.fullname}</p>
        <p>Select a chat to start messaging</p>
        <TiMessage className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
