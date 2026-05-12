import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ErrorPage from "./components/common/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Editor from "./pages/Editor";

function requireAuth() {
  const user =JSON.parse(localStorage.getItem("user"));
  if (user) {
    return;
  }
  return redirect("/");
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
        element: <Generate />,
      },
      {
        path: "/editor",
        loader: requireAuth,
        element: <Editor />,
      },
      {
        path: "*",
        loader: () => redirect("/"),
      },
    ],
  },
]);
export default router;
