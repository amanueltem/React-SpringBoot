// Navigation.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuth } from './AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor:'#dddddd'}}>
      <nav>
        <NavLink exact to="/" activeClassName="active">
          <button>Home</button>
        </NavLink>
        <NavLink to="/register_student" activeClassName="active">
          <button>RegisterStudent</button>
        </NavLink>
        <NavLink to="/search_student" activeClassName="active">
          <button>Search Student</button>
        </NavLink>
        <NavLink  to="/see_students" activeClassName="active">
        <button>See Students</button>
        </NavLink>
      </nav>

      <Avatar />

      <div style={{ marginLeft: '10px' }}>
        {user ? (
          <div>
            Signned as Adminstrator
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
    </div>
  );
};

export default Navigation;

