import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContextProvider";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getallusers, setallusers } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }
        const data = await res.json();
        setUsers(data);
        setallusers(data.allUsersData);
        // console.log(data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
