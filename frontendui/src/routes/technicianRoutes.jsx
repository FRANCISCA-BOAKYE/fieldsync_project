import Jobs from "../technician/pages/Jobs";
import Profile from "../technician/pages/Profile";
import Earnings from "../technician/pages/Earnings";
import Availability from "../technician/pages/Availability";

export const technicianRoutes = [
  { path: "/technician", element: <Jobs /> },
  { path: "/technician/profile", element: <Profile /> },
  { path: "/technician/earnings", element: <Earnings /> },
  { path: "/technician/availability", element: <Availability /> },
];
