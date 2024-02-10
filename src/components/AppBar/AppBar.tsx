import React from 'react';
import {NavLink} from 'react-router-dom';

const AppBar: React.FC = () => {
  return (

    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a href='#' className='main-title-text text-decoration-none text-black fw-bold text-uppercase'>Quotes Central</a>
          <ul className="navbar-nav flex-row gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">
                Quotes |
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-quote" className="nav-link active">
                Submit new quote
              </NavLink>
            </li>
          </ul>
      </div>
    </nav>

);
};

export default AppBar;
