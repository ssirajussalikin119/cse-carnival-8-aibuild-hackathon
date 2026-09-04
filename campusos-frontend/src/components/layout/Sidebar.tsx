import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  DoorOpen, 
  CalendarDays, 
  Megaphone, 
  ClipboardList, 
  Bot,
  Sparkles,
  Activity
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
      <div className="flex items-center gap-3 px-5 py-7 border-b border-white/5">
        <motion.div 
          className="w-10 h-10 rounded-xl bg-gradient-custom flex items-center justify-center glow-accent-sm"
          whileHover={{ scale: 1.05, rotate: -3 }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles size={20} className="text-white" />
        </motion.div>
        <div>
          <span className="text-lg font-bold text-white">Campus<span className="text-accent">OS</span></span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Activity size={10} className="text-green-400 animate-pulse" />
            <span className="text-[10px] text-gray-500 tracking-wider uppercase">Command Center</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent-light shadow-lg shadow-accent/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-8 rounded-r-full bg-gradient-custom glow-accent-sm"
                    transition={{ duration: 0.25, type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon size={18} className={isActive ? 'text-accent' : 'opacity-60'} />
                <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>System Online</span>
          <span className="mx-1">•</span>
          <span>v2.0</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-[280px] flex-col fixed inset-y-0 left-0 glass border-r border-white/10">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isMobileOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-[280px] h-full glass border-r border-white/10 z-50 md:hidden"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}