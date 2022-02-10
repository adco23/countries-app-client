import React from "react";
import { NavLink } from 'react-router-dom';
// import SearchBar from "./SearchBar";

import style from './Navbar.module.css';
import imageEarth from "../assets/logoEarth.png";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.nav_home}>
        <NavLink to='/' className={style.navLink}>
          <div className={style.LogoImg}>
            <img src={imageEarth} alt="No found" width="70px" className={style.imgLogo}/>
            <p className={`${style.p} ${style.navLink}`}>Countries</p>
          </div>
        </NavLink>
        <NavLink to="/home" className={`${style.navLink} ${style.homeLink}`}>
          <p>Home</p>
        </NavLink>
        <NavLink to="/home/createActivity" className={`${style.navLink} ${style.activityLink}`}>
          <p>Create Activity</p>
        </NavLink>
      </div>
    </div>
  )
};

export default Navbar;