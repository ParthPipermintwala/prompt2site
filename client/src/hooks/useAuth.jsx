import { setUserData } from "@/features/user/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async (credential) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/auth/google`,
        { idToken: credential },
        { withCredentials: true },
      );
      if (data.user) {
        dispatch(setUserData(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during authentication:- ", error);
    }
  };
  return {
    handleGoogleAuth,
  };
};
export default useAuth;
