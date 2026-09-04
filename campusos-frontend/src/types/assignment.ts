export interface Assignment {
  id: string;
  course: string;
  course_title: string;
  title: string;
  description: string;
  assigned_date: string; // YYYY-MM-DD
  deadline: string; // YYYY-MM-DD
  submission_platform: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  marks?: number;
}

export type CreateAssignmentDTO = Omit<Assignment, 'id'>;
export type UpdateAssignmentDTO = Partial<CreateAssignmentDTO>;