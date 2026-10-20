import { Navigate, Route, Routes } from 'react-router'
import AppLayout from '../components/layout/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import TimetablePage from '../pages/TimetablePage'
import LoginPage from '../pages/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/timetable" element={<TimetablePage />} />

        <Route
          path="*"
          element={
            <section>
              <h1>Page not found</h1>
              <p>Please choose a page from the navigation.</p>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}