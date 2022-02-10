import React from "react";
import style from './Card.module.css'

const Card = ({name, flag, continent}) => {
  return (
    <div className={style.card}>
      <div className={style.flag_container}>
        <img src={flag} alt='flag not found'/>
      </div>
      <div className={style.text_container}>
        <p className={style.name}>{name}</p>
        <p className={style.continent}>{continent}</p>
      </div>
    </div>
  )
};

export default Card;