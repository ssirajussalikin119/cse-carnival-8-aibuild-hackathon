import { Calendar, Clock, MapPin, User, Users, X } from 'lucide-react';
import type { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onRegister: (event: Event) => void;
  onCancelRegistration: (eventId: string, studentId: string) => void;
}

export default function EventCard({ 
  event, 
  onEdit, 
  onDelete, 
  onRegister, 
  onCancelRegistration 
}: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'text-blue-400 bg-blue-500/10';
      case 'ongoing': return 'text-green-400 bg-green-500/10';
      case 'completed': return 'text-gray-400 bg-gray-500/10';
      case 'cancelled': return 'text-red-400 bg-red-500/10';
      case 'full': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const isFullyBooked = event.registered >= event.capacity;

  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-white">{event.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{event.description}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0 ml-2">
          <button
            onClick={() => onEdit(event)}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Edit"
          >
            <Calendar size={16} />
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5 text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{event.date}</span>
          {event.end_date && <span>→ {event.end_date}</span>}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{event.start_time} - {event.end_time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{event.organizer}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>{event.registered} / {event.capacity} registered</span>
        </div>
      </div>

      {event.registrations.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">Registered Students:</div>
          <div className="flex flex-wrap gap-1">
            {event.registrations.slice(0, 3).map((reg) => (
              <span key={reg.student_id} className="text-xs bg-white/5 px-2 py-0.5 rounded text-gray-300">
                {reg.name}
              </span>
            ))}
            {event.registrations.length > 3 && (
              <span className="text-xs text-gray-500">+{event.registrations.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      {event.status !== 'completed' && event.status !== 'cancelled' && (
        <button
          onClick={() => onRegister(event)}
          disabled={isFullyBooked}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            isFullyBooked
              ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
              : 'bg-accent/10 hover:bg-accent/20 text-accent'
          }`}
        >
          {isFullyBooked ? 'Fully Booked' : 'Register'}
        </button>
      )}
    </div>
  );
}