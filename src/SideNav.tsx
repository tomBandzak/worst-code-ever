import React from 'react'

const SideNav = ({ closeNav, menuClickItem }: any) => (
  <div id="mySidenav" className="sidenav">
    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
    <a href="javascript:void(0)" onClick={() => menuClickItem('home')}>All</a>
    <a href="javascript:void(0)" onClick={() => menuClickItem('favourites')}>Favourites</a>
  </div>
)

export default SideNav;
