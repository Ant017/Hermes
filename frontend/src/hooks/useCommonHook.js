import { useEffect, useState } from "react";
import { GetAllUsersApi } from "../apiEndpoints/user";
import useDebounce from "./useDebounceHook";

const useCommonHook = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await GetAllUsersApi(debouncedQuery || "");
        if (response) {
          setUsers(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return { users, handleSearch, searchQuery, isLoading };
};

export default useCommonHook;
