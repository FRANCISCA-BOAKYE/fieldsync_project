import Jobs from "../technician/pages/Jobs.jsx";
import Profile from "../technician/pages/Profile.jsx";
import Earnings from "../technician/pages/Earnings.jsx";
import Availability from "../technician/pages/Availability.jsx";

export const technicianRoutes = [
  { path: "/technician", element: Jobs },
  { path: "/technician/profile", element: Profile },
  { path: "/technician/earnings", element: Earnings },
  { path: "/technician/availability", element: Availability },
];
