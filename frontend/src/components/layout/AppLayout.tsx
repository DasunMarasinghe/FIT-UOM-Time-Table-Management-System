import { NavLink, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>UOM FIT</h2>
        <p>Timetable Management System</p>

        <nav aria-label="Main navigation">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/timetable">Timetable</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}