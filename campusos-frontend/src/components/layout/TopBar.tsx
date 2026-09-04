import { Menu, Sparkles, Activity } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const routeNames: Record<string, { label: string; icon?: string }> = {
  '/': { label: 'Overview', icon: '📊' },
  '/schedule': { label: 'Schedule', icon: '📅' },
  '/rooms': { label: 'Rooms', icon: '🚪' },
  '/events': { label: 'Events', icon: '🎯' },
  '/announcements': { label: 'Announcements', icon: '📢' },
  '/assignments': { label: 'Assignments', icon: '📝' },
  '/ai': { label: 'AI Assistant', icon: '🤖' },
};

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const currentRoute = routeNames[location.pathname] || { label: 'Overview', icon: '📊' };

  return (
    <header className="h-[72px] px-6 flex items-center justify-between glass border-b border-white/10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentRoute.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{currentRoute.label}</h1>
            <p className="text-xs text-gray-500">CampusOS Command Center</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5">
          <Activity size={12} className="text-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">All systems operational</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-custom flex items-center justify-center glow-accent-sm">
          <span className="text-xs font-bold text-white">OS</span>
        </div>
      </div>
    </header>
  );
}