import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <h1 className="logo">📍 BarFlow</h1>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end aria-label="Home - Map view">
          <span className="nav-icon" aria-hidden>🗺️</span>
          <span className="nav-label">Home</span>
        </NavLink>
        <NavLink to="/friends" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Friends">
          <span className="nav-icon" aria-hidden>👥</span>
          <span className="nav-label">Friends</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Profile">
          <span className="nav-icon" aria-hidden>👤</span>
          <span className="nav-label">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
