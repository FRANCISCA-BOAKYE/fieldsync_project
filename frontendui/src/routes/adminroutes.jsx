import Dashboard from "../admin/pages/Dashboard.jsx";
import Users from "../admin/pages/Users.jsx";
import Settings from "../admin/pages/Settings.jsx";
import Reports from "../admin/pages/Reports.jsx";

export const adminRoutes = [
  { path: "/admin", element: Dashboard },
  { path: "/admin/users", element: Users },
  { path: "/admin/settings", element: Settings },
  { path: "/admin/reports", element: Reports },
];
