import { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-hot-toast";

const SearchInput = () => {
  const { getallusers } = useContext(AuthContext);
  const [searchitem, setSetsearchitem] = useState("");
  const { activelement, setActivelement } = useContext(AuthContext);

  const changeHandler = (e) => {
    setSetsearchitem(e.target.value.trimStart());
  };

  const clickHandler = (e) => {
    e.preventDefault();
    let searchstring = searchitem.trim().toLowerCase();
    // console.log(searchstring);
    const filteredUsers = getallusers.filter((user) =>
      user.fullname.toLowerCase().includes(searchstring)
    );

    // setActivelement(filteredUsers[0]._id);

    if (filteredUsers.length > 0) {
      console.log(filteredUsers[0].fullname);
      console.log(filteredUsers[0]._id);
      setActivelement(filteredUsers[0]._id);
    } else {
      toast.error("User not found");
    }

    setSetsearchitem("");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={(e) => clickHandler(e)}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={searchitem}
        onChange={(e) => changeHandler(e)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
