import { useState, useEffect, useCallback } from 'react';
import type { Announcement, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../types/announcement';
import { announcementService } from '../services/announcementService';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await announcementService.getAll();
      // Sort by date (newest first)
      const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAnnouncements(sorted);
    } catch (err) {
      setError('Failed to load announcements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAnnouncement = useCallback(async (data: CreateAnnouncementDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newAnnouncement = await announcementService.create(data);
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      return newAnnouncement;
    } catch (err) {
      setError('Failed to create announcement');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAnnouncement = useCallback(async (id: string, data: UpdateAnnouncementDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await announcementService.update(id, data);
      if (updated) {
        setAnnouncements(prev => prev.map(a => a.id === id ? updated : a));
      }
      return updated;
    } catch (err) {
      setError('Failed to update announcement');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAnnouncement = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await announcementService.delete(id);
      if (success) {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete announcement');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return {
    announcements,
    loading,
    error,
    loadAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  };
}