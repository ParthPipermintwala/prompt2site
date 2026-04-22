import axios from "axios";
import { useEffect } from "react";

export default function useGetCurrentUser() {
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const {data} = await axios.get(`${baseUrl}/api/user/profile`, {
          withCredentials: true,
        });
        return data;
      } catch (error) {
        console.error("Error fetching current user:- ", error);
      }
    };
    getCurrentUser();
  }, []);
}