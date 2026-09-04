import type { Announcement } from '../types/announcement';

export const mockAnnouncementData: Announcement[] = [
  {
    id: '1',
    title: 'Midterm Exam Schedule Released',
    body: 'The midterm exam schedule for Fall 2026 semester has been released. Please check the academic calendar for your specific exam dates and times.',
    date: '2026-09-01',
    priority: 'high',
    posted_by: 'Office of the Registrar',
    expires: '2026-09-30',
  },
  {
    id: '2',
    title: 'Library Extended Hours During Finals',
    body: 'The university library will remain open 24/7 during the final examination period starting September 20th.',
    date: '2026-09-03',
    priority: 'medium',
    posted_by: 'Library Administration',
    expires: '2026-10-05',
  },
  {
    id: '3',
    title: 'New Student Orientation Week',
    body: 'Welcome to all new students! Orientation week will run from September 25-30 with various activities and workshops planned.',
    date: '2026-09-05',
    priority: 'high',
    posted_by: 'Student Affairs Office',
    expires: '2026-10-01',
  },
  {
    id: '4',
    title: 'Campus Food Court Menu Update',
    body: 'The campus food court has introduced new healthy meal options. Check the menu boards for daily specials.',
    date: '2026-09-06',
    priority: 'low',
    posted_by: 'Campus Services',
  },
];