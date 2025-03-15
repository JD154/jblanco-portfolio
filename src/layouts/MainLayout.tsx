import { Outlet, Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

export const MainLayout = () => {
  return (
    <div className="layout">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/showcase">Showcase</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <ThemeToggle />
      <Outlet />
    </div>
  )
}
