import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./components/common/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Genrate from "./pages/Genrate";
import { store } from "./app/store";

const validateAuth = () => {
  const userData = store.getState().user.userData;
  if (!userData) redirect("/");
  return null;
};

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
        path: "/dashboard",
        loader: validateAuth,
        element: <Dashboard />,
      },
      {
        path: "/generate",
        loader: validateAuth,
        element: <Genrate />,
      },
      {
        path: "*",
        loader: () => redirect("/"),
      },
    ],
  },
]);
export default router;
