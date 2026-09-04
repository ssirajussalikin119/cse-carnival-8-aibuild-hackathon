import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/events/EventCard';
import EventModal from '../components/events/EventModal';
import RegistrationModal from '../components/events/RegistrationModal';
import DeleteConfirmModal from '../components/events/DeleteConfirmModal';
import type { Event } from '../types/event';

export default function EventsPage() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent, registerForEvent, cancelRegistration } = useEvents();
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [registeringEvent, setRegisteringEvent] = useState<Event | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Use the first mock student ID for demo purposes
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Events</h1>
          <p className="text-gray-400 text-sm">Discover and register for campus events</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {loading && events.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading events...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onDelete={(id) => setDeletingId(id)}
              onRegister={handleRegister}
              onCancelRegistration={handleCancelRegistration}
            />
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No events found. Add one to get started.
            </div>
          )}
        </div>
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