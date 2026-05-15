import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
        <Navbar />
      </div>
    </div>
  );
}

export default AdminLayout;
