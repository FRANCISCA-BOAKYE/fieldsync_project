import Dashboard from "../admin/pages/Dashboard";
import Users from "../admin/pages/Users";
import Settings from "../admin/pages/Settings";
import Reports from "../admin/pages/Reports";
import AdminLayout from "../admin/layouts/AdminLayout";

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
