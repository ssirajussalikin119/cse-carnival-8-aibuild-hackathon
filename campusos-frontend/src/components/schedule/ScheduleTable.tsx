import { Pencil, Trash2 } from 'lucide-react';
import type { Schedule } from '../../types/schedule';

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
}

export default function ScheduleTable({ schedules, onEdit, onDelete }: ScheduleTableProps) {
  const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  
  const sortedSchedules = [...schedules].sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.start_time.localeCompare(b.start_time);
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Day</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Course</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Room</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Instructor</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Section</th>
            <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchedules.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-500">
                No schedules found. Add one to get started.
              </td>
            </tr>
          ) : (
            sortedSchedules.map((schedule) => (
              <tr 
                key={schedule.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4 text-white">{schedule.day}</td>
                <td className="py-3 px-4 text-gray-300">
                  {schedule.start_time} - {schedule.end_time}
                </td>
                <td className="py-3 px-4 text-white font-medium">{schedule.course}</td>
                <td className="py-3 px-4 text-gray-300">{schedule.title}</td>
                <td className="py-3 px-4 text-gray-300">{schedule.room}</td>
                <td className="py-3 px-4 text-gray-300">{schedule.instructor}</td>
                <td className="py-3 px-4 text-gray-300">{schedule.section}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(schedule)}
                      className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(schedule.id)}
                      className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}