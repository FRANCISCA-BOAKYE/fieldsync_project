'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
  FileText,
  Building2,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group?: string;
}

const ADMIN_NAV: NavItem[] = [
  { key: 'nav-dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, group: 'Operations' },
  { key: 'nav-jobs', label: 'All Jobs', href: '/admin-dashboard', icon: ClipboardList, badge: 4, group: 'Operations' },
  { key: 'nav-technicians', label: 'Technicians', href: '/admin-dashboard', icon: Wrench, group: 'Operations' },
  { key: 'nav-clients', label: 'Clients', href: '/admin-dashboard', icon: Users, group: 'Operations' },
  { key: 'nav-sites', label: 'Sites & Locations', href: '/admin-dashboard', icon: MapPin, group: 'Operations' },
  { key: 'nav-analytics', label: 'Analytics', href: '/admin-dashboard', icon: BarChart3, group: 'Insights' },
  { key: 'nav-reports', label: 'Reports', href: '/admin-dashboard', icon: FileText, group: 'Insights' },
  { key: 'nav-notifications', label: 'Notifications', href: '/admin-dashboard', icon: Bell, badge: 3, group: 'System' },
  { key: 'nav-settings', label: 'Settings', href: '/admin-dashboard', icon: Settings, group: 'System' },
];

const TECH_NAV: NavItem[] = [
  { key: 'nav-tech-dashboard', label: 'My Jobs', href: '/technician-dashboard', icon: LayoutDashboard, group: 'Work' },
  { key: 'nav-tech-schedule', label: 'Schedule', href: '/technician-dashboard', icon: ClipboardList, group: 'Work' },
  { key: 'nav-tech-notifications', label: 'Notifications', href: '/technician-dashboard', icon: Bell, badge: 2, group: 'System' },
  { key: 'nav-tech-settings', label: 'Settings', href: '/technician-dashboard', icon: Settings, group: 'System' },
];

const CLIENT_NAV: NavItem[] = [
  { key: 'nav-client-dashboard', label: 'My Requests', href: '/client-dashboard', icon: LayoutDashboard, group: 'Services' },
  { key: 'nav-client-jobs', label: 'Job History', href: '/client-dashboard', icon: ClipboardList, group: 'Services' },
  { key: 'nav-client-sites', label: 'My Sites', href: '/client-dashboard', icon: Building2, group: 'Services' },
  { key: 'nav-client-notifications', label: 'Notifications', href: '/client-dashboard', icon: Bell, badge: 2, group: 'System' },
  { key: 'nav-client-settings', label: 'Settings', href: '/client-dashboard', icon: Settings, group: 'System' },
];

interface SidebarProps {
  role?: 'Admin' | 'Technician' | 'Client';
  userName?: string;
  userEmail?: string;
}

const ROLE_COLORS: Record<string, string> = {
  Admin: 'rgba(14,165,160,0.2)',
  Technician: 'rgba(99,102,241,0.2)',
  Client: 'rgba(139,92,246,0.2)',
};

const ROLE_TEXT_COLORS: Record<string, string> = {
  Admin: '#0EA5A0',
  Technician: '#818CF8',
  Client: '#A78BFA',
};

export default function Sidebar({ role = 'Admin', userName = 'Adjoa Mensah', userEmail = 'adjoa.mensah@swiftfix.gh' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = role === 'Admin' ? ADMIN_NAV : role === 'Technician' ? TECH_NAV : CLIENT_NAV;

  const groups = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group || 'Other';
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  const isActive = (href: string, key: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href) && key.includes('jobs')) return true;
    if (pathname === href && href !== '/') return true;
    return false;
  };

  return (
    <aside
      className="sidebar-bg flex flex-col h-screen sticky top-0 transition-all duration-300 ease-smooth shrink-0"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-bold text-white text-base tracking-tight whitespace-nowrap">
              FieldSync
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md sidebar-item-hover transition-colors text-sidebar hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: ROLE_COLORS[role] || ROLE_COLORS.Admin, color: ROLE_TEXT_COLORS[role] || ROLE_TEXT_COLORS.Admin }}>
            <Shield size={10} />
            {role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={`group-${groupName}`} className="mb-1">
            {!collapsed && (
              <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest sidebar-text opacity-50">
                {groupName}
              </p>
            )}
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.key);
              return (
                <div key={item.key} className="tooltip-container px-2">
                  {collapsed && <span className="tooltip-label">{item.label}</span>}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 relative group
                      ${active
                        ? 'sidebar-item-active sidebar-text-active font-semibold' :'sidebar-text sidebar-item-hover hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ backgroundColor: 'var(--accent)' }} />
                    )}
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && (
                      <span className="text-sm truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && item.badge > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && item.badge > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--accent)' }} />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className={`border-t border-white/10 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <div className="tooltip-container">
            <span className="tooltip-label">{userName}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--accent)' }}>
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}>
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-[11px] sidebar-text truncate">{userEmail}</p>
            </div>
            <Link href="/sign-up-login" className="tooltip-container">
              <span className="tooltip-label">Sign out</span>
              <LogOut size={16} className="sidebar-text hover:text-white transition-colors cursor-pointer" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}