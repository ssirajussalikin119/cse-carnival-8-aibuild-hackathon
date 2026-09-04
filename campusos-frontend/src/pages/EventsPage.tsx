import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/events/EventCard';
import EventModal from '../components/events/EventModal';
import RegistrationModal from '../components/events/RegistrationModal';
import DeleteConfirmModal from '../components/events/DeleteConfirmModal';
import PageHeader from '../components/common/PageHeader';
import type { Event } from '../types/event';

export default function EventsPage() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent, registerForEvent, cancelRegistration } = useEvents();
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [registeringEvent, setRegisteringEvent] = useState<Event | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const DEMO_STUDENT_ID = '2024-1-60-001';

  const handleAddEvent = () => {
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (data: any) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, data);
    } else {
      await createEvent(data);
    }
  };

  const handleRegister = (event: Event) => {
    setRegisteringEvent(event);
    setIsRegistrationModalOpen(true);
  };

  const handleSaveRegistration = async (data: any) => {
    await registerForEvent(data);
  };

  const handleCancelRegistration = async (eventId: string, studentId: string) => {
    await cancelRegistration(eventId, studentId);
  };

  const handleDeleteEvent = async () => {
    if (deletingId) {
      await deleteEvent(deletingId);
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
        title="Events" 
        subtitle="Discover and register for campus events"
        icon="🎯"
        action={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-custom text-white rounded-xl font-medium text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
          >
            <Plus size={18} />
            Add Event
          </motion.button>
        }
      />

      {loading && events.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading events...</div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <EventCard
                event={event}
                onEdit={handleEditEvent}
                onDelete={(id) => setDeletingId(id)}
                onRegister={handleRegister}
                onCancelRegistration={handleCancelRegistration}
              />
            </motion.div>
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No events found. Add one to get started.
            </div>
          )}
        </motion.div>
      )}

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        initialData={editingEvent}
      />

      {registeringEvent && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => {
            setIsRegistrationModalOpen(false);
            setRegisteringEvent(undefined);
          }}
          onRegister={handleSaveRegistration}
          event={registeringEvent}
        />
      )}

      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteEvent}
      />
    </div>
  );
}