import { useEffect, useState } from "react";
import { GetAllUsersApi } from "../apiEndpoints/user";

const useCommonHook = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetAllUsersApi();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  return { users };
};

export default useCommonHook;
