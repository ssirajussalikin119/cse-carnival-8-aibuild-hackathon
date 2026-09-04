import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementModal from '../components/announcements/AnnouncementModal';
import DeleteConfirmModal from '../components/announcements/DeleteConfirmModal';
import type { Announcement } from '../types/announcement';

export default function AnnouncementsPage() {
  const { announcements, loading, error, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingAnnouncement(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editingAnnouncement) {
      await updateAnnouncement(editingAnnouncement.id, data);
    } else {
      await createAnnouncement(data);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteAnnouncement(deletingId);
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
          <h1 className="text-2xl font-semibold text-white">Announcements</h1>
          <p className="text-gray-400 text-sm">View campus announcements</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add Announcement
        </button>
      </div>

      {loading && announcements.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading announcements...</div>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEdit}
              onDelete={(id) => setDeletingId(id)}
            />
          ))}
          {announcements.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No announcements found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAnnouncement}
      />

      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}