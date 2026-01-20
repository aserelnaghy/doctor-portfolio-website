import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n"

import LayoutShell from "./layouts/LayoutShell";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Stories from "./pages/Stories";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    element: <LayoutShell />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/stories", element: <Stories /> },
      { path: "/blog", element: <Blog /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
