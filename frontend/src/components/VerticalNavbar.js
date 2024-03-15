// VerticalNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  return (
    <div>
      <h1>Vertical Navbar</h1>
      <ul>
        <li>
          <Link to="/">List Modals</Link>
        </li>
        <li>
          <Link to="/tars">Tars</Link>
        </li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;
