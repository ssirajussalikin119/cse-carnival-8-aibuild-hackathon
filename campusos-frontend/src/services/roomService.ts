import type { Room, CreateRoomDTO, UpdateRoomDTO, CreateBookingDTO, Booking } from '../types/room';
import { mockRoomData } from '../mock/roomData';

let rooms: Room[] = [...mockRoomData];

export const roomService = {
  // Get all rooms
  getAll: async (): Promise<Room[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...rooms];
  },

  // Get room by ID
  getById: async (id: string): Promise<Room | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return rooms.find(r => r.id === id);
  },

  // Create new room
  create: async (data: CreateRoomDTO): Promise<Room> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRoom: Room = {
      ...data,
      id: Date.now().toString(),
      bookings: [],
    };
    rooms.push(newRoom);
    return newRoom;
  },

  // Update room
  update: async (id: string, data: UpdateRoomDTO): Promise<Room | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    
    const updatedRoom = {
      ...rooms[index],
      ...data,
    };
    rooms[index] = updatedRoom;
    return updatedRoom;
  },

  // Delete room
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    rooms.splice(index, 1);
    return true;
  },

  // Book a room
  book: async (data: CreateBookingDTO): Promise<Room | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const roomIndex = rooms.findIndex(r => r.id === data.room_id);
    if (roomIndex === -1) return undefined;

    const newBooking: Booking = {
      booking_id: Date.now().toString(),
      booked_by: data.booked_by,
      date: data.date,
      start_time: data.start_time,
      end_time: data.end_time,
      purpose: data.purpose,
    };

    rooms[roomIndex].bookings.push(newBooking);
    return rooms[roomIndex];
  },

  // Cancel a booking
  cancelBooking: async (roomId: string, bookingId: string): Promise<Room | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const roomIndex = rooms.findIndex(r => r.id === roomId);
    if (roomIndex === -1) return undefined;

    const bookingIndex = rooms[roomIndex].bookings.findIndex(
      b => b.booking_id === bookingId
    );
    if (bookingIndex === -1) return undefined;

    rooms[roomIndex].bookings.splice(bookingIndex, 1);
    return rooms[roomIndex];
  },
};