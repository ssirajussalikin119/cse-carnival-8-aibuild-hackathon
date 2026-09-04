export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string; // YYYY-MM-DD
  priority: 'high' | 'medium' | 'low';
  posted_by: string;
  expires?: string; // YYYY-MM-DD (optional)
}

export type CreateAnnouncementDTO = Omit<Announcement, 'id'>;
export type UpdateAnnouncementDTO = Partial<CreateAnnouncementDTO>;