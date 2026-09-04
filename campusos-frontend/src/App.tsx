import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import OverviewPage from './pages/OverviewPage';
import SchedulePage from './pages/SchedulePage';
import RoomsPage from './pages/RoomsPage';
import EventsPage from './pages/EventsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AIPage from './pages/AIPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="ai" element={<AIPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;