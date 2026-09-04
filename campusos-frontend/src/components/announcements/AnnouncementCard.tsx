import { Calendar, User, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import type { Announcement } from '../../types/announcement';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
}

export default function AnnouncementCard({ announcement, onEdit, onDelete }: AnnouncementCardProps) {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high': return <AlertCircle size={14} />;
      case 'medium': return <AlertCircle size={14} />;
      case 'low': return <AlertCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(announcement.priority)} flex items-center gap-1`}>
              {getPriorityIcon(announcement.priority)}
              {announcement.priority}
            </span>
          </div>
          <p className="text-gray-300 mt-2 text-sm leading-relaxed">{announcement.body}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(announcement)}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/5 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>{announcement.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User size={14} />
          <span>{announcement.posted_by}</span>
        </div>
        {announcement.expires && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Expires: {announcement.expires}</span>
          </div>
        )}
      </div>
    </div>
  );
}