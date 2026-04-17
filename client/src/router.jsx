import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import ErrorPage from "./pages/ErrorPage";

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
        element: <Signin />,
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
