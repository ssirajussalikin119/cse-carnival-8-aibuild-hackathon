import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  DoorOpen, 
  CalendarDays, 
  Megaphone, 
  ClipboardList, 
  Bot 
} from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { path: '/', icon: LayoutDashboard, label: 'Overview' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/rooms', icon: DoorOpen, label: 'Rooms' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
  { path: '/announcements', icon: Megaphone, label: 'Announcements' },
  { path: '/assignments', icon: ClipboardList, label: 'Assignments' },
  { path: '/ai', icon: Bot, label: 'AI Assistant' },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-4 py-6 border-b border-white/5">
        <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center">
          <span className="text-accent font-bold text-sm">C</span>
        </div>
        <span className="text-lg font-semibold text-white tracking-tight">CampusOS</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? 'text-accent' : ''} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-1 h-6 rounded-full bg-accent"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 left-0 bg-[#0d0d14] border-r border-white/5">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileOpen ? 0 : -280 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-72 h-full bg-[#0d0d14] border-r border-white/5 z-50 md:hidden"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}