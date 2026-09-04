import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';
import AssignmentCard from '../components/assignments/AssignmentCard';
import AssignmentModal from '../components/assignments/AssignmentModal';
import DeleteConfirmModal from '../components/assignments/DeleteConfirmModal';
import type { Assignment } from '../types/assignment';

export default function AssignmentsPage() {
  const { assignments, loading, error, createAssignment, updateAssignment, deleteAssignment } = useAssignments();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingAssignment(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editingAssignment) {
      await updateAssignment(editingAssignment.id, data);
    } else {
      await createAssignment(data);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteAssignment(deletingId);
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Assignments</h1>
          <p className="text-gray-400 text-sm">Track your assignments</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Assignment
        </button>
      </div>

      {loading && assignments.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading assignments...</div>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={handleEdit}
              onDelete={(id) => setDeletingId(id)}
            />
          ))}
          {assignments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No assignments found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAssignment}
      />

      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}