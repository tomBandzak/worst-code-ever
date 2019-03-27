import React from 'react';
import { Link } from 'react-router-dom'

const SideNav = ({ favourites, closeNav, open }: any) => (
    <div id="mySidenav" className="sidenav" style={{ display: (open ? 'flex' : 'none'), width: '250px' }}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
      <ul>
      <li><Link to="/">All</Link></li>
      <li><Link to="/favourites">Favourites</Link></li>
      </ul>
    </div>
);

export default SideNav;
