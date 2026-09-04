import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnnouncements } from '../hooks/useAnnouncements';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementModal from '../components/announcements/AnnouncementModal';
import DeleteConfirmModal from '../components/announcements/DeleteConfirmModal';
import PageHeader from '../components/common/PageHeader';
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
      <PageHeader 
        title="Announcements" 
        subtitle="View campus announcements"
        icon="📢"
        action={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-custom text-white rounded-xl font-medium text-sm shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
          >
            <Plus size={18} />
            Add Announcement
          </motion.button>
        }
      />

      {loading && announcements.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading announcements...</div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnnouncementCard
                announcement={announcement}
                onEdit={handleEdit}
                onDelete={(id) => setDeletingId(id)}
              />
            </motion.div>
          ))}
          {announcements.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No announcements found. Add one to get started.
            </div>
          )}
        </motion.div>
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