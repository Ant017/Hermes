import { useEffect, useState } from "react";
import { GetAllUsersApi } from "../apiEndpoints/user";
import useDebounce from "./useDebounceHook";

const useCommonHook = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsersApi(debouncedQuery || "");
        if (response) {
          setUsers(response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return { users, handleSearch, searchQuery };
};

export default useCommonHook;
