import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import ReportIncident from "./pages/ReportIncident";
import TrackRelief from "./pages/TrackRelief";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

export default function App() {
  const navLinks = [
    { to: "/report", label: "Report Incident" },
    { to: "/track", label: "Track Relief" },
    { to: "/resources", label: "Resources" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="nav">
        <div className="container row">
          <Link className="brand" to="/">Disaster Management System</Link>
          <div>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                style={{ marginLeft: index > 0 ? 14 : 0 }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/track" element={<TrackRelief />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="*" element={<h2 className="text-center">404 - Page Not Found</h2>} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        © 2025 Disaster Management System. All rights reserved.
      </footer>
    </>
  );
}
