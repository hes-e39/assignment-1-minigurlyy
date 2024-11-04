import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
import TimersView from "./views/TimersView";
import DocumentationView from "./views/DocumentationView";

const PageIndex = () => {
  return (
    <div>
      <h1 className="main-heading">Assignment 01</h1>
      <ul className="link-list">
        <li>
          <Link to="/" className="nav-link">Timers</Link>
        </li>
        <li>
          <Link to="/docs" className="nav-link">Documentation</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    children: [
      {
        index: true,
        element: <TimersView />,
      },
      {
        path: "/docs",
        element: <DocumentationView />,
      },
    ],
  },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
