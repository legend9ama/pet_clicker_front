import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStore, faTractor, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="navbar" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faStore} />
        <span>Shop</span>
      </NavLink>
      <NavLink to="/farms" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faTractor} />
        <span>Farm</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}