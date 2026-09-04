import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, DoorOpen, CalendarDays, Megaphone, ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuickAction {
  label: string;
  icon: LucideIcon;
  route: string;
  color: string;
}

export default function QuickActions() {
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    { label: 'Add Schedule', icon: Calendar, route: '/schedule', color: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
    { label: 'Add Room', icon: DoorOpen, route: '/rooms', color: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' },
    { label: 'Add Event', icon: CalendarDays, route: '/events', color: 'bg-green-500/10 text-green-400 hover:bg-green-500/20' },
    { label: 'Add Announcement', icon: Megaphone, route: '/announcements', color: 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20' },
    { label: 'Add Assignment', icon: ClipboardList, route: '/assignments', color: 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' },
  ];

  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5">
      <h3 className="text-sm font-medium text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.route)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${action.color}`}
          >
            <action.icon size={16} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}