import { useContext, useState } from "react";
import { BsSend } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-hot-toast";
import Spinner from "../spinner/Spinner";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { userSelectId } = useContext(AuthContext);
  let { usermessage, setUserMessage } = useContext(AuthContext);
  let { dummymessage, setDummymessage } = useContext(AuthContext);
  const [sendloader, setSendloader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage();
      console.log(message);
    }
    setMessage("");
  };

  const sendMessage = async function () {
    try {
      setSendloader(true);
      const res = await fetch(`/auth/message/send/${userSelectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        throw new Error("nhi chal rha");
      }

      setSendloader(false);

      const data = await res.json();
      usermessage = message;
      setUserMessage(usermessage);
      dummymessage = dummymessage + 1;
      setDummymessage(dummymessage);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={(e) => handleSubmit(e)}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => {
            // sentmessage.message = e.target.value;
            setMessage(e.target.value);
          }}
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          {sendloader ? <Spinner /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
