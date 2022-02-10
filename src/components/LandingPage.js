import React from "react";
import { Link } from "react-router-dom";

import imageEarth from "../assets/logoEarth.png";

import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.landing}>
      <div className={style.icon_title}>
        <img src={imageEarth} alt="No found" width="70px" className={style.icon}/>
        <h5 className={style.title}>Adriana Coronel</h5>
      </div>
      <div className={style.text_coutries}>
        <Link to='/home' className={style.btn_Countries}>
          COUNTRIES
        </Link>
        <p className={style.text}>Project</p>
      </div>
      <p className={style.date}>January 2022</p>
    </div>
  )
};

export default LandingPage;