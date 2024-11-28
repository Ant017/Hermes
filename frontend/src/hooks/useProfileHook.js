import { useEffect, useState } from "react";
import { ProfilePicApi } from "../apiEndpoints/user";
import { ProfileApi } from "../apiEndpoints/user";

const useProfileHook = () => {
  const [profilePic, setProfilePic] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await ProfileApi();
      setProfile(response);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      const response = await ProfilePicApi();
      setProfilePic(response?.imageUrl);
    };

    fetchProfilePic();
  }, []);

  return { profilePic, profile };
};

export default useProfileHook;
