import { useState, useEffect, useCallback } from 'react';
import type { Schedule, CreateScheduleDTO, UpdateScheduleDTO } from '../types/schedule';
import { scheduleService } from '../services/scheduleService';

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all schedules
  const loadSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scheduleService.getAll();
      setSchedules(data);
    } catch (err) {
      setError('Failed to load schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new schedule
  const createSchedule = useCallback(async (data: CreateScheduleDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newSchedule = await scheduleService.create(data);
      setSchedules(prev => [...prev, newSchedule]);
      return newSchedule;
    } catch (err) {
      setError('Failed to create schedule');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update schedule
  const updateSchedule = useCallback(async (id: string, data: UpdateScheduleDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await scheduleService.update(id, data);
      if (updated) {
        setSchedules(prev => prev.map(s => s.id === id ? updated : s));
      }
      return updated;
    } catch (err) {
      setError('Failed to update schedule');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete schedule
  const deleteSchedule = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await scheduleService.delete(id);
      if (success) {
        setSchedules(prev => prev.filter(s => s.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete schedule');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load schedules on mount
  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  return {
    schedules,
    loading,
    error,
    loadSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}