import { DoorOpen, Users, Wrench, Calendar, X, Plus } from 'lucide-react';
import type { Room, Booking } from '../../types/room';

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
  onBook: (room: Room) => void;
  onCancelBooking: (roomId: string, bookingId: string) => void;
}

export default function RoomCard({ 
  room, 
  onEdit, 
  onDelete, 
  onBook, 
  onCancelBooking 
}: RoomCardProps) {
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'classroom': return 'text-blue-400';
      case 'lab': return 'text-purple-400';
      case 'seminar': return 'text-emerald-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'available' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{room.room_number}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(room.type)} bg-white/5`}>
              {room.type}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(room.status)} bg-white/5`}>
              {room.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">Floor {room.floor}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(room)}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Edit"
          >
            <DoorOpen size={16} />
          </button>
          <button
            onClick={() => onDelete(room.id)}
            className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-1.5">
          <Users size={16} />
          <span>{room.capacity} seats</span>
        </div>
        {room.equipment.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Wrench size={16} />
            <span>{room.equipment.join(', ')}</span>
          </div>
        )}
      </div>

      {room.bookings.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
            <Calendar size={14} />
            <span>Bookings</span>
          </div>
          <div className="space-y-1">
            {room.bookings.map((booking) => (
              <div key={booking.booking_id} className="flex items-center justify-between text-xs bg-white/5 rounded px-2 py-1">
                <span className="text-gray-300">
                  {booking.date} {booking.start_time}-{booking.end_time}
                </span>
                <span className="text-gray-400 truncate max-w-[120px]">{booking.booked_by}</span>
                <button
                  onClick={() => onCancelBooking(room.id, booking.booking_id)}
                  className="text-red-400 hover:text-red-500 transition-colors text-xs"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onBook(room)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors text-sm font-medium"
      >
        <Plus size={16} />
        Book Room
      </button>
    </div>
  );
}