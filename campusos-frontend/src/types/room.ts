export interface Booking {
  booking_id: string;
  booked_by: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  purpose: string;
}

export interface Room {
  id: string;
  room_number: string;
  type: 'classroom' | 'lab' | 'seminar';
  capacity: number;
  equipment: string[];
  floor: number;
  status: 'available' | 'unavailable';
  bookings: Booking[];
}

export type CreateRoomDTO = Omit<Room, 'id' | 'bookings'>;
export type UpdateRoomDTO = Partial<CreateRoomDTO>;

export interface CreateBookingDTO {
  room_id: string;
  booked_by: string;
  date: string;
  start_time: string;
  end_time: string;
  purpose: string;
}