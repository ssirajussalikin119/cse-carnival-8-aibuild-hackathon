import type { Event, CreateEventDTO, UpdateEventDTO, RegisterDTO } from '../types/event';
import { mockEventData } from '../mock/eventData';

let events: Event[] = [...mockEventData];

export const eventService = {
  // Get all events
  getAll: async (): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...events];
  },

  // Get event by ID
  getById: async (id: string): Promise<Event | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return events.find(e => e.id === id);
  },

  // Create new event
  create: async (data: CreateEventDTO): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newEvent: Event = {
      ...data,
      id: Date.now().toString(),
      registered: 0,
      registrations: [],
    };
    events.push(newEvent);
    return newEvent;
  },

  // Update event
  update: async (id: string, data: UpdateEventDTO): Promise<Event | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    
    const updatedEvent = {
      ...events[index],
      ...data,
    };
    events[index] = updatedEvent;
    return updatedEvent;
  },

  // Delete event
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    events.splice(index, 1);
    return true;
  },

  // Register for event
  register: async (data: RegisterDTO): Promise<Event | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const eventIndex = events.findIndex(e => e.id === data.event_id);
    if (eventIndex === -1) return undefined;

    const event = events[eventIndex];
    
    // Check if event is full
    if (event.registered >= event.capacity) {
      throw new Error('Event is full');
    }

    // Check if already registered
    if (event.registrations.some(r => r.student_id === data.student_id)) {
      throw new Error('Already registered for this event');
    }

    const newRegistration = {
      student_id: data.student_id,
      name: data.name,
    };

    event.registrations.push(newRegistration);
    event.registered = event.registrations.length;
    
    // Update status if full
    if (event.registered >= event.capacity) {
      event.status = 'full';
    }

    events[eventIndex] = event;
    return event;
  },

  // Cancel registration
  cancelRegistration: async (eventId: string, studentId: string): Promise<Event | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return undefined;

    const event = events[eventIndex];
    const registrationIndex = event.registrations.findIndex(
      r => r.student_id === studentId
    );
    if (registrationIndex === -1) return undefined;

    event.registrations.splice(registrationIndex, 1);
    event.registered = event.registrations.length;
    
    // Update status if no longer full
    if (event.status === 'full' && event.registered < event.capacity) {
      event.status = 'upcoming';
    }

    events[eventIndex] = event;
    return event;
  },
};