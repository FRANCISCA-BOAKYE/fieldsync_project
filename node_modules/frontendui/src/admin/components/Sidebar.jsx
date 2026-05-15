// frontend/src/admin/components/Sidebar.jsx

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Users,
  Building2,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

// ─────────────────────────────────────────────
// NAV ITEMS
// Define your navigation links as data.
// Each item has a path, label, and icon component.
// Adding a new page = adding one object here.
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Overview",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "All Jobs",
    path: "/admin/jobs",
    icon: ClipboardList,
  },
  {
    label: "New Job",
    path: "/admin/jobs/new",
    icon: PlusCircle,
  },
  {
    label: "Technicians",
    path: "/admin/team",
    icon: Users,
  },
  {
    label: "Clients",
    path: "/admin/clients",
    icon: Building2,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart2,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

// ─────────────────────────────────────────────
// SIDEBAR COMPONENT
// ─────────────────────────────────────────────
export default function Sidebar() {
  // isCollapsed controls whether the sidebar shows
  // full labels (w-64) or just icons (w-16).
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  // Pull user from wherever you store auth state.
  // Replace this with your actual auth context/hook.
  // e.g. const { user, logout } = useAuth();
  const user = {
    name: "Akosua Mensah",
    role: "Administrator",
    initials: "AM",
  };

  function handleLogout() {
    // Call your logout function here, e.g. logout()
    // then redirect to login
    navigate("/login");
  }

  return (
    // The outer <aside> changes width based on isCollapsed.
    // transition-all + duration-300 gives the smooth slide animation.
    // overflow-hidden stops content peeking out during the transition.
    <aside
      className={`
        flex flex-col h-screen bg-[#0e1c36] text-white
        transition-all duration-300 overflow-hidden flex-shrink-0
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* ── LOGO / BRAND SECTION ── */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {/* Logo text — hidden when collapsed using opacity + width trick
            so the collapse animation is smooth instead of a jump cut */}
        <div
          className={`
            flex items-center gap-2 overflow-hidden transition-all duration-300
            ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}
          `}
        >
          {/* Logo mark — the small FS square */}
          <div className="flex-shrink-0 w-7 h-7 bg-[#2E86AB] rounded-md flex items-center justify-center">
            <span className="text-xs font-bold text-white">FS</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none tracking-tight">
              FieldSync
            </p>
            <p className="text-[10px] text-white/40 leading-none mt-0.5 uppercase tracking-widest">
              Operations
            </p>
          </div>
        </div>

        {/* Collapse toggle button.
            When collapsed, show the logo mark in its place. */}
        {isCollapsed && (
          <div className="w-7 h-7 bg-[#2E86AB] rounded-md flex items-center justify-center mx-auto">
            <span className="text-xs font-bold">FS</span>
          </div>
        )}

        {/* The toggle arrow — always visible */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            flex-shrink-0 p-1 rounded-md text-white/50 hover:text-white
            hover:bg-white/10 transition-colors
            ${isCollapsed ? "hidden" : "block"}
          `}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Collapsed state: show just the toggle arrow centered */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="mx-auto mt-3 p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* ── NAVIGATION ITEMS ── */}
      {/* flex-1 pushes the user profile section to the bottom */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            // NavLink from react-router-dom automatically adds an
            // 'active' class when the current URL matches item.path.
            // We use the render prop pattern to apply Tailwind classes.
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-sm font-medium transition-all duration-150 group
                  ${
                    isActive
                      ? // Active state: lighter background + left accent border
                        "bg-[#2E86AB]/25 text-white border-l-2 border-[#2E86AB] pl-[10px]"
                      : // Idle state: subtle hover
                        "text-white/55 hover:text-white hover:bg-white/10 border-l-2 border-transparent pl-[10px]"
                  }
                `
              }
              // end prop means /admin/dashboard only matches exactly,
              // not /admin/dashboard/something
              end={item.path === "/admin/dashboard"}
            >
              {/* Icon — always visible */}
              <Icon
                size={18}
                // The icon brightens on the active item too
                className="flex-shrink-0 transition-colors"
              />

              {/* Label — hidden when collapsed.
                  We use max-w and opacity so it fades out smoothly
                  rather than wrapping or jumping. */}
              <span
                className={`
                  whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"}
                `}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ── USER PROFILE SECTION ── */}
      <div className="border-t border-white/10 p-3">
        <div
          className={`
            flex items-center gap-3
            ${isCollapsed ? "justify-center" : "justify-between"}
          `}
        >
          {/* Avatar circle with initials */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2E86AB] flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {user.initials}
              </span>
            </div>

            {/* Name + role — hidden when collapsed */}
            <div
              className={`
                min-w-0 overflow-hidden transition-all duration-300
                ${isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"}
              `}
            >
              <p className="text-sm font-medium text-white truncate leading-none">
                {user.name}
              </p>
              <p className="text-[11px] text-white/40 mt-0.5 truncate leading-none">
                {user.role}
              </p>
            </div>
          </div>

          {/* Logout button — hidden when collapsed */}
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="flex-shrink-0 p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Collapsed logout — shown as centered icon */}
        {isCollapsed && (
          <button
            onClick={handleLogout}
            className="w-full flex justify-center mt-3 p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
