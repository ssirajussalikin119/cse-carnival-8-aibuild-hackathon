import { Calendar, BookOpen, FileText, Pencil, Trash2 } from 'lucide-react';
import type { Assignment } from '../../types/assignment';

interface AssignmentCardProps {
  assignment: Assignment;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

export default function AssignmentCard({ assignment, onEdit, onDelete }: AssignmentCardProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'submitted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'graded': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'late': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const today = new Date();
  const deadlineDate = new Date(assignment.deadline);
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(assignment.status)}`}>
              {getStatusLabel(assignment.status)}
            </span>
          </div>
          <p className="text-sm text-gray-400">{assignment.course} - {assignment.course_title}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(assignment)}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(assignment.id)}
            className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-300 mt-2 text-sm leading-relaxed">{assignment.description}</p>

      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/5 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>Assigned: {assignment.assigned_date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>Deadline: {assignment.deadline}</span>
          {assignment.status === 'pending' && (
            <span className={`text-xs ${daysUntilDeadline <= 3 ? 'text-red-400' : 'text-gray-500'}`}>
              ({daysUntilDeadline} days left)
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <FileText size={14} />
          <span>{assignment.submission_platform}</span>
        </div>
        {assignment.marks !== undefined && (
          <div className="flex items-center gap-1.5 text-green-400">
            <span>Marks: {assignment.marks}</span>
          </div>
        )}
      </div>
    </div>
  );
}