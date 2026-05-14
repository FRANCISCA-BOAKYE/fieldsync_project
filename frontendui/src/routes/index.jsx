import { adminRoutes } from "./adminRoutes.jsx";
import { clientRoutes } from "./clientRoutes.jsx";
import { technicianRoutes } from "./technicianRoutes.jsx";

export const routes = [...adminRoutes, ...clientRoutes, ...technicianRoutes];

export default routes;
