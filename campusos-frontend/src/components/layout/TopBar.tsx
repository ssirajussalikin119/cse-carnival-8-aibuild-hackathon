import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const routeNames: Record<string, string> = {
  '/': 'Overview',
  '/schedule': 'Schedule',
  '/rooms': 'Rooms',
  '/events': 'Events',
  '/announcements': 'Announcements',
  '/assignments': 'Assignments',
  '/ai': 'AI Assistant',
};

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const currentPage = routeNames[location.pathname] || 'Overview';

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">CampusOS</span>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">{currentPage}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-300">OS</span>
        </div>
      </div>
    </header>
  );
}