import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import ErrorPage from "./pages/ErrorPage";
import Loginmodel from "./pages/Loginmodel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Loginmodel/>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        loader: () => redirect("/"),
      },
    ],
  },
]);
export default router;
