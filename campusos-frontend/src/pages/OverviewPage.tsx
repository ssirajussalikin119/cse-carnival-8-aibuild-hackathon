import { useSchedule } from '../hooks/useSchedule';
import { useRooms } from '../hooks/useRooms';
import { useEvents } from '../hooks/useEvents';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { useAssignments } from '../hooks/useAssignments';
import StatsCard from '../components/overview/StatsCard';
import UpcomingItem from '../components/overview/UpcomingItem';
import QuickActions from '../components/overview/QuickActions';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DoorOpen, 
  CalendarDays, 
  Megaphone, 
  ClipboardList,
  Sparkles
} from 'lucide-react';

export default function OverviewPage() {
  const { schedules } = useSchedule();
  const { rooms } = useRooms();
  const { events } = useEvents();
  const { announcements } = useAnnouncements();
  const { assignments } = useAssignments();

  // Calculate stats
  const totalSchedules = schedules.length;
  const totalRooms = rooms.length;
  const totalEvents = events.length;
  const totalAnnouncements = announcements.length;
  const totalAssignments = assignments.length;
  
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
  const highPriorityAnnouncements = announcements.filter(a => a.priority === 'high').length;

  // Get upcoming items
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const upcomingSchedules = schedules
    .filter(s => s.day === today)
    .slice(0, 3);

  const upcomingEventsList = events
    .filter(e => e.status === 'upcoming')
    .slice(0, 3);

  const pendingAssignmentsList = assignments
    .filter(a => a.status === 'pending')
    .slice(0, 3);

  const recentAnnouncements = announcements
    .slice(0, 3);

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <div className="px-3 py-1 rounded-full glass border border-white/5 text-xs text-accent-light flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>Live</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-1">Welcome back to your CampusOS command center</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatsCard 
          title="Schedules" 
          value={totalSchedules} 
          icon={Calendar}
          color="blue"
          delay={0}
        />
        <StatsCard 
          title="Rooms" 
          value={`${availableRooms}/${totalRooms}`} 
          icon={DoorOpen}
          color="purple"
          subtitle={`${availableRooms} available`}
          delay={0.1}
        />
        <StatsCard 
          title="Events" 
          value={totalEvents} 
          icon={CalendarDays}
          color="green"
          subtitle={`${upcomingEvents} upcoming`}
          delay={0.2}
        />
        <StatsCard 
          title="Announcements" 
          value={totalAnnouncements} 
          icon={Megaphone}
          color="orange"
          subtitle={`${highPriorityAnnouncements} high priority`}
          delay={0.3}
        />
        <StatsCard 
          title="Assignments" 
          value={totalAssignments} 
          icon={ClipboardList}
          color="yellow"
          subtitle={`${pendingAssignments} pending`}
          delay={0.4}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Upcoming Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <Calendar size={16} className="text-blue-400" />
              Today's Schedule
            </h3>
            <button 
              onClick={() => window.location.href = '/schedule'}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              View all →
            </button>
          </div>
          {upcomingSchedules.length === 0 ? (
            <p className="text-sm text-gray-500">No classes today 🎉</p>
          ) : (
            <div className="space-y-2">
              {upcomingSchedules.map((schedule) => (
                <UpcomingItem
                  key={schedule.id}
                  type="schedule"
                  title={`${schedule.course}: ${schedule.title}`}
                  subtitle={`${schedule.instructor} • Section ${schedule.section}`}
                  date={schedule.day}
                  time={`${schedule.start_time} - ${schedule.end_time}`}
                  location={schedule.room}
                  id={schedule.id}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <CalendarDays size={16} className="text-green-400" />
              Upcoming Events
            </h3>
            <button 
              onClick={() => window.location.href = '/events'}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              View all →
            </button>
          </div>
          {upcomingEventsList.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming events</p>
          ) : (
            <div className="space-y-2">
              {upcomingEventsList.map((event) => (
                <UpcomingItem
                  key={event.id}
                  type="event"
                  title={event.name}
                  subtitle={event.organizer}
                  date={event.date}
                  time={`${event.start_time} - ${event.end_time}`}
                  location={event.venue}
                  id={event.id}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <ClipboardList size={16} className="text-yellow-400" />
              Pending Assignments
            </h3>
            <button 
              onClick={() => window.location.href = '/assignments'}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              View all →
            </button>
          </div>
          {pendingAssignmentsList.length === 0 ? (
            <p className="text-sm text-gray-500">No pending assignments 🎉</p>
          ) : (
            <div className="space-y-2">
              {pendingAssignmentsList.map((assignment) => (
                <UpcomingItem
                  key={assignment.id}
                  type="assignment"
                  title={assignment.title}
                  subtitle={`${assignment.course} • ${assignment.course_title}`}
                  date={`Due: ${assignment.deadline}`}
                  time={assignment.submission_platform}
                  id={assignment.id}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <Megaphone size={16} className="text-orange-400" />
              Recent Announcements
            </h3>
            <button 
              onClick={() => window.location.href = '/announcements'}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              View all →
            </button>
          </div>
          {recentAnnouncements.length === 0 ? (
            <p className="text-sm text-gray-500">No announcements</p>
          ) : (
            <div className="space-y-2">
              {recentAnnouncements.map((announcement) => (
                <UpcomingItem
                  key={announcement.id}
                  type="announcement"
                  title={announcement.title}
                  subtitle={announcement.posted_by}
                  date={announcement.date}
                  priority={announcement.priority}
                  id={announcement.id}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}