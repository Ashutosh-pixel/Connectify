import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export default function useMarkAsRead() {
  const { userSelectId } = useContext(AuthContext);
  const [markAsReadStatus, setMarkAsReadStatus] = useState("");

  useEffect(() => {
    if (!userSelectId) return;

    const markAsRead = async () => {
      try {
        const res = await fetch("/auth/message/markasread", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userSelectId }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error marking as read");
        }

        const data = await res.json();
        setMarkAsReadStatus(data.respond);
      } catch (error) {
        console.log(error.message);
      }
    };

    markAsRead();
  }, [userSelectId]);

  return markAsReadStatus;
}
