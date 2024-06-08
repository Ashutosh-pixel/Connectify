import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContextProvider";

const LogoutButton = () => {
  const { setAuthuser } = useContext(AuthContext);
  const { setNoChatSelected } = useContext(AuthContext);
  async function logout() {
    setNoChatSelected(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("user-chat");
      setAuthuser(null);
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div onClick={() => logout()} className="mt-auto">
      <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </div>
  );
};
export default LogoutButton;
