import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Leftbar() {

  const location = useLocation();

  return (
    <div className="Leftbar shadow">
      <div className="navbar-brand-box">
        <Link className="d-block h-100 text-center" to="/">
          <h2 className="mb-0 mt-3">AccuPin</h2>
        </Link>
      </div>
      <div className="sidebar-menu-scroll">
        <ul className="nav-list">
          {/* <li className={location.pathname.includes('/dashboard') ? "nav-item active" : "nav-item"}>
            <Link to={'/dashboard'} onClick={() => {setOpenedMenu('');}}>Dashboard</Link>
          </li> */}
          <li className={(location.pathname.includes('/golf-clubs') || location.pathname === "/") ? "nav-item active" : "nav-item"}>
            <Link to={'/golf-clubs'}>Golf Clubs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
