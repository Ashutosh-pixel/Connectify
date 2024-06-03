import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authuser, setAuthuser] = useState(
    JSON.parse(localStorage.getItem("user-chat") || null)
  );
  return (
    <AuthContext.Provider value={{ authuser, setAuthuser }}>
      {children}
    </AuthContext.Provider>
  );
}
