export interface Schedule {
  id: string;
  course: string;
  title: string;
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  room: string;
  instructor: string;
  section: string;
}

export type CreateScheduleDTO = Omit<Schedule, 'id'>;
export type UpdateScheduleDTO = Partial<CreateScheduleDTO>;