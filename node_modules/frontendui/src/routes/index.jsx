import { useRoutes, Navigate } from "react-router-dom";

import { adminRoutes } from "./adminRoutes.jsx";
import { clientRoutes } from "./clientRoutes.jsx";
import { technicianRoutes } from "./technicianRoutes.jsx";

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
