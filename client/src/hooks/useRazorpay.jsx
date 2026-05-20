import { setUserData } from "@/features/user/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function useRazorpay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initializePayment = async ({ amount, planName, credits }) => {
   const user= JSON.parse(localStorage.getItem("user"))||null;
    try {
      const loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );

      if (!loaded) {
        alert("Razorpay SDK Failed");
        return;
      }

      const { data: order } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/createOrder`,
        {
          amount,
        },
        {
          withCredentials: true,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: `prompt2site ${planName}`,
        description: `${planName} Purchase`,
        prefill: {
          name: user?.name ?? "prompt2siteuser",
          email: user?.email ?? "prompt2site@gmail.com",
          contact: user?.phone ?? "9696969696",
        },

        hidden: {
          contact: true,
          email: true,
        },

        readonly: {
          contact: true,
          email: true,
        },
        handler: async function (response) {
          const verify = await axios.post(
            ` ${import.meta.env.VITE_BACKEND_URL}/api/payment/verifyPayment`,
            {
              ...response,
              plan: planName,
              planCredits: credits,
            },
            {
              withCredentials: true,
            },
          );

          if (verify.data.success) {
            console.log("in");
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...user,
                plan: verify?.data?.plan,
                credits: verify?.data?.credits,
              }),
            );
            dispatch(
              setUserData({
                ...user,
                plan: verify?.data?.plan,
                credits: verify?.data?.credits,
              }),
            );
            navigate("/");
          } else {
            alert("Payment Verification Failed");
          }
        },

        theme: {
          color: "#6366f1",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (e) {
      alert("Payment Failed ", e.message);
    }
  };

  return { initializePayment };
}
