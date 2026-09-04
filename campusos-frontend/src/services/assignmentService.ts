import type { Assignment, CreateAssignmentDTO, UpdateAssignmentDTO } from '../types/assignment';
import { mockAssignmentData } from '../mock/assignmentData';

let assignments: Assignment[] = [...mockAssignmentData];

export const assignmentService = {
  // Get all assignments
  getAll: async (): Promise<Assignment[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...assignments];
  },

  // Get assignment by ID
  getById: async (id: string): Promise<Assignment | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return assignments.find(a => a.id === id);
  },

  // Create new assignment
  create: async (data: CreateAssignmentDTO): Promise<Assignment> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newAssignment: Assignment = {
      ...data,
      id: Date.now().toString(),
    };
    assignments.push(newAssignment);
    return newAssignment;
  },

  // Update assignment
  update: async (id: string, data: UpdateAssignmentDTO): Promise<Assignment | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = assignments.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    const updatedAssignment = {
      ...assignments[index],
      ...data,
    };
    assignments[index] = updatedAssignment;
    return updatedAssignment;
  },

  // Delete assignment
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = assignments.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    assignments.splice(index, 1);
    return true;
  },
};