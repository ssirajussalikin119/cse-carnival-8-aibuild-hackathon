import { useState, useEffect, useCallback } from 'react';
import type { Event, CreateEventDTO, UpdateEventDTO, RegisterDTO } from '../types/event';
import { eventService } from '../services/eventService';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getAll();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (data: CreateEventDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newEvent = await eventService.create(data);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, data: UpdateEventDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await eventService.update(id, data);
      if (updated) {
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
      }
      return updated;
    } catch (err) {
      setError('Failed to update event');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await eventService.delete(id);
      if (success) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForEvent = useCallback(async (data: RegisterDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEvent = await eventService.register(data);
      if (updatedEvent) {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
      }
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register for event');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelRegistration = useCallback(async (eventId: string, studentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEvent = await eventService.cancelRegistration(eventId, studentId);
      if (updatedEvent) {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
      }
      return updatedEvent;
    } catch (err) {
      setError('Failed to cancel registration');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
  };
}