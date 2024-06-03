import toast from "react-hot-toast";

export default function LoginValidation(userInfo) {
  if (!userInfo.username || !userInfo.password) {
    toast.error("please fill all details");
    return false;
  }

  if (userInfo.password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  return true;
}
