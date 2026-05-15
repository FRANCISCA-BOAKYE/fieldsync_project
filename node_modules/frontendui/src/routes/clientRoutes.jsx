import Home from "../client/pages/Home.jsx";
import Bookings from "../client/pages/Bookings.jsx";
import Profile from "../client/pages/Profile.jsx";
import Payment from "../client/pages/Payment.jsx";

export const clientRoutes = [
  { path: "/", element: Home },
  { path: "/bookings", element: Bookings },
  { path: "/profile", element: Profile },
  { path: "/payment", element: Payment },
];
