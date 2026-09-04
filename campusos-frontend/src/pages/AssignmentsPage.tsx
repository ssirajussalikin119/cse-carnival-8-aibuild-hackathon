import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAssignments } from '../hooks/useAssignments';
import AssignmentCard from '../components/assignments/AssignmentCard';
import AssignmentModal from '../components/assignments/AssignmentModal';
import DeleteConfirmModal from '../components/assignments/DeleteConfirmModal';
import PageHeader from '../components/common/PageHeader';
import type { Assignment, CreateAssignmentDTO } from '../types/assignment';

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

  const handleSave = async (data: CreateAssignmentDTO) => {
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
      <PageHeader 
        title="Assignments" 
        subtitle="Track your assignments"
        icon="📝"
        action={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-custom text-white rounded-xl font-medium text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
          >
            <Plus size={18} />
            Add Assignment
          </motion.button>
        }
      />

      {loading && assignments.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading assignments...</div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AssignmentCard
                assignment={assignment}
                onEdit={handleEdit}
                onDelete={(id: string) => setDeletingId(id)}
              />
            </motion.div>
          ))}
          {assignments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No assignments found. Add one to get started.
            </div>
          )}
        </motion.div>
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