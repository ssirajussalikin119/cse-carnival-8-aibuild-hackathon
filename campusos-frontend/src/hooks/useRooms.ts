import { useState, useEffect, useCallback } from 'react';
import type { Room, CreateRoomDTO, UpdateRoomDTO, CreateBookingDTO } from '../types/room';
import { roomService } from '../services/roomService';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roomService.getAll();
      setRooms(data);
    } catch (err) {
      setError('Failed to load rooms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoom = useCallback(async (data: CreateRoomDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newRoom = await roomService.create(data);
      setRooms(prev => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError('Failed to create room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRoom = useCallback(async (id: string, data: UpdateRoomDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await roomService.update(id, data);
      if (updated) {
        setRooms(prev => prev.map(r => r.id === id ? updated : r));
      }
      return updated;
    } catch (err) {
      setError('Failed to update room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRoom = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await roomService.delete(id);
      if (success) {
        setRooms(prev => prev.filter(r => r.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bookRoom = useCallback(async (data: CreateBookingDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updatedRoom = await roomService.book(data);
      if (updatedRoom) {
        setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
      }
      return updatedRoom;
    } catch (err) {
      setError('Failed to book room');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (roomId: string, bookingId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedRoom = await roomService.cancelBooking(roomId, bookingId);
      if (updatedRoom) {
        setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
      }
      return updatedRoom;
    } catch (err) {
      setError('Failed to cancel booking');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return {
    rooms,
    loading,
    error,
    loadRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    bookRoom,
    cancelBooking,
  };
}