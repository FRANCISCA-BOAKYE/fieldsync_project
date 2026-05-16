import Home from "../client/pages/Home";
import Bookings from "../client/pages/Bookings";
import Profile from "../client/pages/Profile";
import Payment from "../client/pages/Payment";

export const clientRoutes = [
  { path: "/", element: <Home /> },
  { path: "/bookings", element: <Bookings /> },
  { path: "/profile", element: <Profile /> },
  { path: "/payment", element: <Payment /> },
];
