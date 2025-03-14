import { Outlet, Link } from 'react-router-dom'

export const MainLayout = () => {
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
