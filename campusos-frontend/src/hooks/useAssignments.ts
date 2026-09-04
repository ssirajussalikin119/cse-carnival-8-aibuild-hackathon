import { useState, useEffect, useCallback } from 'react';
import type { Assignment, CreateAssignmentDTO, UpdateAssignmentDTO } from '../types/assignment';
import { assignmentService } from '../services/assignmentService';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assignmentService.getAll();
      // Sort by deadline (soonest first)
      const sorted = [...data].sort((a, b) => 
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
      setAssignments(sorted);
    } catch (err) {
      setError('Failed to load assignments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAssignment = useCallback(async (data: CreateAssignmentDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newAssignment = await assignmentService.create(data);
      setAssignments(prev => {
        const updated = [newAssignment, ...prev];
        return updated.sort((a, b) => 
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
      });
      return newAssignment;
    } catch (err) {
      setError('Failed to create assignment');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAssignment = useCallback(async (id: string, data: UpdateAssignmentDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await assignmentService.update(id, data);
      if (updated) {
        setAssignments(prev => {
          const updatedList = prev.map(a => a.id === id ? updated : a);
          return updatedList.sort((a, b) => 
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        });
      }
      return updated;
    } catch (err) {
      setError('Failed to update assignment');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAssignment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await assignmentService.delete(id);
      if (success) {
        setAssignments(prev => prev.filter(a => a.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete assignment');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  return {
    assignments,
    loading,
    error,
    loadAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}