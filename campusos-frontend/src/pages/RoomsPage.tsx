import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRooms } from '../hooks/useRooms';
import RoomCard from '../components/rooms/RoomCard';
import RoomModal from '../components/rooms/RoomModal';
import BookingModal from '../components/rooms/BookingModal';
import DeleteConfirmModal from '../components/rooms/DeleteConfirmModal';
import PageHeader from '../components/common/PageHeader';
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
      <PageHeader 
        title="Rooms" 
        subtitle="Manage campus rooms and bookings"
        icon="🚪"
        action={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddRoom}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-custom text-white rounded-xl font-medium text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
          >
            <Plus size={18} />
            Add Room
          </motion.button>
        }
      />

      {loading && rooms.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading rooms...</div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RoomCard
                room={room}
                onEdit={handleEditRoom}
                onDelete={(id) => setDeletingId(id)}
                onBook={handleBookRoom}
                onCancelBooking={cancelBooking}
              />
            </motion.div>
          ))}
          {rooms.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No rooms found. Add one to get started.
            </div>
          )}
        </motion.div>
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