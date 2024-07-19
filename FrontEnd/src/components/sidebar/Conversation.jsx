import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { SocketContext } from "./../../context/SocketContext";
import Badge from "../badge/Badge";

const Conversation = ({ userdetail, id, unreadmessagecount }) => {
  const { noChatSelected, setNoChatSelected } = useContext(AuthContext);
  const { setChatSelect } = useContext(AuthContext);
  const { userSelectId, setuserSelectId } = useContext(AuthContext);
  const { activelement, setActivelement } = useContext(AuthContext);
  const { onlineusers, setOnlineusers } = useContext(SocketContext);
  const [unreadcount, setunreadmessagecount] = useState(null);

  let isonline = false;

  if (id in onlineusers) {
    isonline = true;
  }
  // if (unreadmessagecount) {
  //   console.log("unreadmessagecount =", unreadmessagecount);
  // }

  useEffect(() => {
    setunreadmessagecount(unreadmessagecount);
  }, [unreadmessagecount]);

  // console.log("noChatSelected ", noChatSelected);
  return (
    <div>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        style={{
          backgroundColor:
            id == activelement ? "rgb(14 ,165 ,233)" : "transparent",
        }}
        onClick={() => {
          setNoChatSelected(false);
          setChatSelect(userdetail);
          setuserSelectId(id);
          setActivelement(id);
          console.log("userSelectId == ", userSelectId);
        }}
      >
        <div className={`avatar ${isonline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={userdetail.profile} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{userdetail.fullname}</p>
            {/* <div className="">{unreadmessagecount[id]}</div> */}
            {unreadmessagecount[id] ? (
              <div className="flex flex-col items-center justify-center">
                <Badge value={unreadmessagecount[id]} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </div>
  );
};
export default Conversation;
