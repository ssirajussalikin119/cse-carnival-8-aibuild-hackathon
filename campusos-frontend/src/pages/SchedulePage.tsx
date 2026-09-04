import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';
import ScheduleTable from '../components/schedule/ScheduleTable';
import ScheduleModal from '../components/schedule/ScheduleModal';
import DeleteConfirmModal from '../components/schedule/DeleteConfirmModal';
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

  const handleSave = async (data: any) => {
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Schedule</h1>
          <p className="text-gray-400 text-sm">Manage your class schedule</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Schedule
        </button>
      </div>

      {loading && schedules.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading schedules...</div>
        </div>
      ) : (
        <ScheduleTable 
          schedules={schedules} 
          onEdit={handleEdit}
          onDelete={(id) => setDeletingId(id)}
        />
      )}

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