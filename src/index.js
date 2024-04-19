import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./views/routes";
import { GlobalStyles } from "./views/theme/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(appRoutes);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
