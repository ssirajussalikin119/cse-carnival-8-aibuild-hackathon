import { Calendar, Clock, MapPin, BookOpen, Megaphone, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface UpcomingItemProps {
  type: 'schedule' | 'event' | 'assignment' | 'announcement';
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  id: string;
}

const iconMap = {
  schedule: { icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  event: { icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/10' },
  assignment: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  announcement: { icon: Megaphone, color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
};

export default function UpcomingItem({ 
  type, 
  title, 
  subtitle, 
  date, 
  time, 
  location, 
  priority,
  id 
}: UpcomingItemProps) {
  const navigate = useNavigate();
  const { icon: Icon, color, bg } = iconMap[type];

  const getRoute = () => {
    switch(type) {
      case 'schedule': return '/schedule';
      case 'event': return '/events';
      case 'assignment': return '/assignments';
      case 'announcement': return '/announcements';
    }
  };

  return (
    <motion.div 
      onClick={() => navigate(getRoute())}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.15 }
      }}
      className="flex items-center gap-3 p-3 rounded-xl glass hover:glass-hover transition-all cursor-pointer group border border-transparent hover:border-white/5"
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
        <Icon size={16} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          {priority && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${priorityColors[priority]}`}>
              {priority}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{subtitle}</p>
        <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-500">
          <span>{date}</span>
          {time && <span>• {time}</span>}
          {location && <span>• {location}</span>}
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}