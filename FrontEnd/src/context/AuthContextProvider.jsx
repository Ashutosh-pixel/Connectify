import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authuser, setAuthuser] = useState(
    JSON.parse(localStorage.getItem("user-chat") || null)
  );
  const [getallusers, setallusers] = useState([]);
  const [noChatSelected, setNoChatSelected] = useState(true);

  const [chatSelect, setChatSelect] = useState({});
  const [userSelectId, setuserSelectId] = useState("");
  const [usermessage, setUserMessage] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authuser,
        setAuthuser,
        getallusers,
        setallusers,
        noChatSelected,
        setNoChatSelected,
        chatSelect,
        setChatSelect,
        userSelectId,
        setuserSelectId,
        usermessage,
        setUserMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
