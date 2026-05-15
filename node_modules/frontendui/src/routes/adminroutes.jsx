import Dashboard from "../admin/pages/Dashboard.jsx";
import Users from "../admin/pages/Users.jsx";
import Settings from "../admin/pages/Settings.jsx";
import Reports from "../admin/pages/Reports.jsx";

import AdminLayout from "../admin/layouts/AdminLayout.jsx";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
];
