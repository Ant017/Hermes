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
        const response = debouncedQuery.trim()
          ? await GetAllUsersApi(debouncedQuery)
          : await GetAllUsersApi("");

        setUsers(response);
        console.log("Fetched users:", response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return { users, handleSearch };
};

export default useCommonHook;
