import { useSchedule } from '../hooks/useSchedule';
import { useRooms } from '../hooks/useRooms';
import { useEvents } from '../hooks/useEvents';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { useAssignments } from '../hooks/useAssignments';
import StatsCard from '../components/overview/StatsCard';
import UpcomingItem from '../components/overview/UpcomingItem';
import QuickActions from '../components/overview/QuickActions';
import { 
  Calendar, 
  DoorOpen, 
  CalendarDays, 
  Megaphone, 
  ClipboardList
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

  // Get upcoming items (next 3 in each category)
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="text-gray-400 text-sm">CampusOS command center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatsCard 
          title="Schedules" 
          value={totalSchedules} 
          icon={Calendar}
          color="bg-blue-500/20"
        />
        <StatsCard 
          title="Rooms" 
          value={`${availableRooms}/${totalRooms}`} 
          icon={DoorOpen}
          color="bg-purple-500/20"
          subtitle={`${availableRooms} available`}
        />
        <StatsCard 
          title="Events" 
          value={totalEvents} 
          icon={CalendarDays}
          color="bg-green-500/20"
          subtitle={`${upcomingEvents} upcoming`}
        />
        <StatsCard 
          title="Announcements" 
          value={totalAnnouncements} 
          icon={Megaphone}
          color="bg-orange-500/20"
          subtitle={`${highPriorityAnnouncements} high priority`}
        />
        <StatsCard 
          title="Assignments" 
          value={totalAssignments} 
          icon={ClipboardList}
          color="bg-yellow-500/20"
          subtitle={`${pendingAssignments} pending`}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Upcoming Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Today's Schedule</h3>
            <button 
              onClick={() => window.location.href = '/schedule'}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </button>
          </div>
          {upcomingSchedules.length === 0 ? (
            <p className="text-sm text-gray-500">No classes today</p>
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
        </div>

        <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Upcoming Events</h3>
            <button 
              onClick={() => window.location.href = '/events'}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              View all
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
        </div>

        <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Pending Assignments</h3>
            <button 
              onClick={() => window.location.href = '/assignments'}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </button>
          </div>
          {pendingAssignmentsList.length === 0 ? (
            <p className="text-sm text-gray-500">No pending assignments</p>
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
        </div>

        <div className="bg-[#0d0d14] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Recent Announcements</h3>
            <button 
              onClick={() => window.location.href = '/announcements'}
              className="text-xs text-accent hover:text-accent/80 transition-colors"
            >
              View all
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
        </div>
      </div>
    </div>
  );
}