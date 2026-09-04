export interface Registration {
  student_id: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  end_date?: string; // YYYY-MM-DD (optional for multi-day events)
  venue: string;
  organizer: string;
  capacity: number;
  registered: number;
  registrations: Registration[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'full';
}

export type CreateEventDTO = Omit<Event, 'id' | 'registered' | 'registrations'>;
export type UpdateEventDTO = Partial<CreateEventDTO>;

export interface RegisterDTO {
  event_id: string;
  student_id: string;
  name: string;
}