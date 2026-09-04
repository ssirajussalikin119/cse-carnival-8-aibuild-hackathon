import { Calendar, Clock, MapPin, BookOpen, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const getIcon = () => {
    switch(type) {
      case 'schedule': return <BookOpen size={14} className="text-blue-400" />;
      case 'event': return <Calendar size={14} className="text-purple-400" />;
      case 'assignment': return <Clock size={14} className="text-yellow-400" />;
      case 'announcement': return <Megaphone size={14} className="text-orange-400" />;
    }
  };

  const getRoute = () => {
    switch(type) {
      case 'schedule': return '/schedule';
      case 'event': return '/events';
      case 'assignment': return '/assignments';
      case 'announcement': return '/announcements';
    }
  };

  const getPriorityColor = () => {
    if (!priority) return '';
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div 
      onClick={() => navigate(getRoute())}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          {priority && (
            <span className={`text-xs px-1.5 py-0.5 rounded ${getPriorityColor()}`}>
              {priority}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{subtitle}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span>{date}</span>
          {time && <span>• {time}</span>}
          {location && <span>• {location}</span>}
        </div>
      </div>
    </div>
  );
}