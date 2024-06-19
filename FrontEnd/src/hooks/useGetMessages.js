import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-hot-toast";

function useGetMessages() {
  let [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userSelectId } = useContext(AuthContext);
  const { usermessage, setUserMessage } = useContext(AuthContext);
  const [blank, setBlank] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/auth/message/recieve/${userSelectId}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error("Error fetching message");
        }

        const data = await res.json();
        if (data.blankmessage) setBlank(data.blankmessage);
        else {
          setBlank("");
          messageArray = data.message.message;
          setMessageArray(messageArray);
        }
        // console.log(messageArray);
      } catch (error) {
        toast.error("Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    if (userSelectId) {
      fetchData();
    }
  }, [userSelectId, usermessage]);

  return { loading, messageArray, blank };
}

export default useGetMessages;
