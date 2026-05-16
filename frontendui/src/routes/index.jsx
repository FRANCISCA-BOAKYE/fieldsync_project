import { useRoutes, Navigate } from "react-router-dom";

import { adminRoutes } from "./adminRoutes";
import { clientRoutes } from "./clientRoutes";
import { technicianRoutes } from "./technicianRoutes";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/admin/dashboard" />,
    },

    ...adminRoutes,
    ...clientRoutes,
    ...technicianRoutes,
  ]);

  return routes;
};

export default AppRoutes;
