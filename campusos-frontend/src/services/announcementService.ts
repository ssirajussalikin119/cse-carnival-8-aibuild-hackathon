import type { Announcement, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../types/announcement';
import { mockAnnouncementData } from '../mock/announcementData';

let announcements: Announcement[] = [...mockAnnouncementData];

export const announcementService = {
  // Get all announcements
  getAll: async (): Promise<Announcement[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...announcements];
  },

  // Get announcement by ID
  getById: async (id: string): Promise<Announcement | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return announcements.find(a => a.id === id);
  },

  // Create new announcement
  create: async (data: CreateAnnouncementDTO): Promise<Announcement> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newAnnouncement: Announcement = {
      ...data,
      id: Date.now().toString(),
    };
    announcements.push(newAnnouncement);
    return newAnnouncement;
  },

  // Update announcement
  update: async (id: string, data: UpdateAnnouncementDTO): Promise<Announcement | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    const updatedAnnouncement = {
      ...announcements[index],
      ...data,
    };
    announcements[index] = updatedAnnouncement;
    return updatedAnnouncement;
  },

  // Delete announcement
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    announcements.splice(index, 1);
    return true;
  },
};