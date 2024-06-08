import { useContext } from "react";
import Conversation from "./Conversation";
import { AuthContext } from "../../context/AuthContextProvider";

const Conversations = () => {
  const { getallusers } = useContext(AuthContext);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation /> */}
      {getallusers.map((userdetail, index) => {
        return (
          <Conversation key={index} userdetail={userdetail}></Conversation>
        );
      })}
    </div>
  );
};
export default Conversations;
