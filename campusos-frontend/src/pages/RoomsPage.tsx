import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import RoomCard from '../components/rooms/RoomCard';
import RoomModal from '../components/rooms/RoomModal';
import BookingModal from '../components/rooms/BookingModal';
import DeleteConfirmModal from '../components/rooms/DeleteConfirmModal';
import type { Room } from '../types/room';

export default function RoomsPage() {
  const { rooms, loading, error, createRoom, updateRoom, deleteRoom, bookRoom, cancelBooking } = useRooms();
  
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | undefined>();
  const [bookingRoom, setBookingRoom] = useState<Room | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddRoom = () => {
    setEditingRoom(undefined);
    setIsRoomModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleSaveRoom = async (data: any) => {
    if (editingRoom) {
      await updateRoom(editingRoom.id, data);
    } else {
      await createRoom(data);
    }
  };

  const handleBookRoom = (room: Room) => {
    setBookingRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleSaveBooking = async (data: any) => {
    await bookRoom(data);
  };

  const handleDeleteRoom = async () => {
    if (deletingId) {
      await deleteRoom(deletingId);
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Rooms</h1>
          <p className="text-gray-400 text-sm">Manage campus rooms and bookings</p>
        </div>
        <button
          onClick={handleAddRoom}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Room
        </button>
      </div>

      {loading && rooms.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading rooms...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={handleEditRoom}
              onDelete={(id) => setDeletingId(id)}
              onBook={handleBookRoom}
              onCancelBooking={cancelBooking}
            />
          ))}
          {rooms.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No rooms found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <RoomModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        onSave={handleSaveRoom}
        initialData={editingRoom}
      />

      {bookingRoom && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setBookingRoom(undefined);
          }}
          onSave={handleSaveBooking}
          room={bookingRoom}
        />
      )}

      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteRoom}
      />
    </div>
  );
}