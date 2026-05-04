import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./components/common/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Genrate from "./pages/Genrate";
import { store } from "./app/store";

function requireAuth() {
  const user =
    JSON.parse(localStorage.getItem("user")) || store.getState().user.userData;
  if (!user) {
    console.log("here");
    return redirect("/");
  }
  return null;
}

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
        loader: requireAuth,
        element: <Dashboard />,
      },
      {
        path: "/generate",
        loader: requireAuth,
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
