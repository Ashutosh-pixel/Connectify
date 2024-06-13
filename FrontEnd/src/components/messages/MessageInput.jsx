import { useContext, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-hot-toast";

const MessageInput = () => {
  const [sentmessage, setMessage] = useState({ message: "" });
  const { userSelectId } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userSelectId);
    sendMessage();
  };

  const sendMessage = async function () {
    try {
      const res = await fetch(`/auth/message/send/${userSelectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sentmessage),
      });
      if (!res.ok) {
        throw new Error(error);
      }

      const data = await res.json();
      console.log(data);
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
          onChange={(e) => {
            sentmessage.message = e.target.value;
            setMessage(sentmessage);
          }}
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsSend />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
