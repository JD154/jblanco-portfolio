import { Link, Routes, Route } from 'react-router-dom'
import './App.css'

// Route components
const Home = () => <h2>Welcome to My Portfolio</h2>
const Work = () => <h2>Professional Work</h2>
const Projects = () => <h2>Personal Projects</h2>
const Contact = () => <h2>Contact Me</h2>

function App() {
  return (
    <>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/work">Work</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
