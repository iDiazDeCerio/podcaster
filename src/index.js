import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./views/routes";
import { GlobalStyles } from "./views/theme/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
