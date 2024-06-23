import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const Conversation = ({ userdetail, id }) => {
  const { noChatSelected, setNoChatSelected } = useContext(AuthContext);
  const { setChatSelect } = useContext(AuthContext);
  const { setuserSelectId } = useContext(AuthContext);
  const { activelement, setActivelement } = useContext(AuthContext);

  console.log("noChatSelected ", noChatSelected);
  return (
    <div
      onClick={() => {
        setuserSelectId(userdetail._id);
        setActivelement(id);
        // console.log(userSelectId);
      }}
    >
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        style={{
          backgroundColor:
            id == activelement ? "rgb(14 ,165 ,233)" : "transparent",
        }}
        onClick={() => {
          setNoChatSelected(false);
          setChatSelect(userdetail);
        }}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={userdetail.profile} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{userdetail.fullname}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </div>
  );
};
export default Conversation;
