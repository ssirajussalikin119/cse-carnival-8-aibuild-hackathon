import type { Schedule, CreateScheduleDTO, UpdateScheduleDTO } from '../types/schedule';
import { mockScheduleData } from '../mock/scheduleData';

// This is a mock service. Will be replaced with real API calls later.
let schedules: Schedule[] = [...mockScheduleData];

export const scheduleService = {
  // Get all schedules
  getAll: async (): Promise<Schedule[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...schedules];
  },

  // Get schedule by ID
  getById: async (id: string): Promise<Schedule | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return schedules.find(s => s.id === id);
  },

  // Create new schedule
  create: async (data: CreateScheduleDTO): Promise<Schedule> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newSchedule: Schedule = {
      ...data,
      id: Date.now().toString(),
    };
    schedules.push(newSchedule);
    return newSchedule;
  },

  // Update schedule
  update: async (id: string, data: UpdateScheduleDTO): Promise<Schedule | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = schedules.findIndex(s => s.id === id);
    if (index === -1) return undefined;
    
    const updatedSchedule = {
      ...schedules[index],
      ...data,
    };
    schedules[index] = updatedSchedule;
    return updatedSchedule;
  },

  // Delete schedule
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = schedules.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    schedules.splice(index, 1);
    return true;
  },
};