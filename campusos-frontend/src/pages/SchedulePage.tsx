import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSchedule } from '../hooks/useSchedule';
import ScheduleTable from '../components/schedule/ScheduleTable';
import ScheduleModal from '../components/schedule/ScheduleModal';
import DeleteConfirmModal from '../components/schedule/DeleteConfirmModal';
import PageHeader from '../components/common/PageHeader';
import type { Schedule } from '../types/schedule';

export default function SchedulePage() {
  const { schedules, loading, error, createSchedule, updateSchedule, deleteSchedule } = useSchedule();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingSchedule(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleSave = async (data: Omit<Schedule, 'id'>) => {
    if (editingSchedule) {
      await updateSchedule(editingSchedule.id, data);
    } else {
      await createSchedule(data);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteSchedule(deletingId);
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
        title="Schedule" 
        subtitle="Manage your class schedule"
        icon="📅"
        action={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-custom text-white rounded-xl font-medium text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
          >
            <Plus size={18} />
            Add Schedule
          </motion.button>
        }
      />

      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        {loading && schedules.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Loading schedules...</div>
          </div>
        ) : (
          <ScheduleTable 
            schedules={schedules} 
            onEdit={handleEdit}
            onDelete={(id: string) => setDeletingId(id)}
          />
        )}
      </motion.div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingSchedule}
      />

      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}