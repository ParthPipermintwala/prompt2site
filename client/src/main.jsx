import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-[#120f17]">
    <RouterProvider router={router} />
  </div>,
);
