import axios from "axios";
import { useEffect } from "react";
import { setUserData } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";

export default function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const {data} = await axios.get(`${baseUrl}/api/user/profile`, {
          withCredentials: true,
        });
        dispatch(setUserData(data));
      } catch (error) {
        console.error("Error fetching current user:- ", error);
      }
    };
    getCurrentUser();
  }, []);
}