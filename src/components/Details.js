import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail } from '../redux/action';

import style from './Details.module.css'

const Text = ({label, value}) => {
  return (
    <div className={style.text1}>
      <p className={style.textLabel}><strong>{label} </strong></p>
      <p>{value}</p>
    </div>
  )
};

const ActivityCard = ({name, season, difficulty, duration}) => {
  return (
    <div className={style.activityCard}>
      <p><strong>{name}</strong></p>
      <p>Season: {season.charAt(0).toUpperCase() + season.slice(1)}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Duration: {duration ? duration : "-"}</p>
    </div>
  )
};

const Details = (props) => {
  const dispatch = useDispatch();
  const country = useSelector(state => state.detail);
  const {countryId} = useParams();
  
  useEffect(() => {
    dispatch(getDetail(countryId))
  }, [dispatch, countryId]);

  return (
    <div className={style.containerDetails}>
      <div className={style.imgNameId}>
        <img src={country.flag} width="250px" alt='Flag'/>
        <div className={style.NameId}>
          <h2>{country.name}</h2>
          <h3>({country.id})</h3>
        </div>
      </div>
      <div className={style.textDetail}>
        <Text label="Continent: " value={country.continent}/>
        <Text label="Capital: " value={country.capital}/>
        <Text label="Subregion: " value={country.subregion}/>
        <div className={style.text1}>
          <p><strong>Area: </strong></p>
          <p>{`${parseInt(country.area).toLocaleString()} km`}<sup>2</sup></p>
        </div>
        <div className={style.text1}>
          <p><strong>Population: </strong></p>
          <p>{parseInt(country.population).toLocaleString()}</p>
        </div>
      </div>
      <div className={style.containerAct}>
      <h4>Tourist Activities:</h4>
      <div className={style.containerAct2}>
      {country.tourisms?.map(act => 
        <ActivityCard
          key={act.id}
          name={act.name}
          season={act.season}
          difficulty={act.difficulty}
          duration={act.duration}
        />
      )}
      </div>
      </div>
    </div>
  )
}

export default Details