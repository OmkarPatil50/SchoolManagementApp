import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <section>
        <h2 className="app-heading">Schooler</h2>
      </section>
      <section>
        <nav>
          <NavLink to="/" activeclassname="active" className="nav-item link">
            Dashboard
          </NavLink>
          <NavLink
            to="/classes"
            activeclassname="active"
            className="nav-item link"
          >
            Classes
          </NavLink>
          <NavLink
            to="/students"
            activeclassname="active"
            className="nav-item link"
          >
            Students
          </NavLink>
          <NavLink
            to="/teachers"
            activeclassname="active"
            className="nav-item link"
          >
            Teachers
          </NavLink>
        </nav>
      </section>
    </div>
  );
};
