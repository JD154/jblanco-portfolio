import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="layout">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/showcase">Showcase</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </div>
  )
}
