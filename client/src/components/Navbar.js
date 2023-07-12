import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import Logout from './Logout';

function Navbar() {
  const { currentUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div>
          <p><strong>{currentUser.username}</strong></p>
        </div>
      </div>
      <div className="navbar-right">
        <br/>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Menu
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/cards">Cards</Link>
              </li>
              {currentUser ? null : (
                <li>
                  <Link to="/users/new">Sign Up</Link>
                </li>
              )}
              {currentUser ? (
                <li>
                  <Logout />
                </li>
              ) : (
                <li>
                  <Link to="/auth">Login</Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
