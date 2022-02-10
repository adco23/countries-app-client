import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCountries, postActivity } from '../redux/action';

import style from './CreateActivity.module.css';
import { BiTrashAlt } from 'react-icons/bi'

const validate = input => {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.search(/\d/) >= 0){
    errors.name = "Name is required and only letters"
  }
  if (!input.difficulty) {
    errors.difficulty = "Difficulty is required";
  };
  if (!input.season) {
    errors.season = "Season is required"
  };
  if (input.countries.length === 0) {
    errors.countries = "Select at least 1 country"
  };

  return errors;
};

const CreateActivity = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCountries = useSelector(state => state.allCountries);
  allCountries.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0
  });
  

  const lvlsDiff = [1, 2, 3, 4 , 5];

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
  });
  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    season: "",
    countries: []
  });

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  };

  const handleCheck = e => {
    if (e.target.checked) {
      setInput({
        ...input,
        [e.target.name] : e.target.value
      });
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }))
    }
  };

  const handleSelect = e => {
    if(e.target.value){
      setInput({
        ...input,
        countries: [...input.countries, e.target.value]
      });
      setErrors(validate({
        ...input,
        countries: [...input.countries, e.target.value]
      }));
    }
  };

  const handleDelete = (e, country) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter(elto => elto !== country)
    });
    setErrors(validate({
      ...input,
      countries: input.countries.filter(elto => elto !== country)
    }))
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Actividad creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: []
    });
    history.push("/home")
  };

  return (
    <div className={style.containerCreate}>
    <form onSubmit={e => handleSubmit(e)} className={style.formCreate}>
      <div>
        <button type="submit" disabled={!errors.name && !errors.countries && !errors.difficulty && !errors.season ? false : true} className={style.btnSubmit}>Create</button>
      </div>
      <div className={style.labelInput}>
        <label>Name:</label>
        <input
          type="text"
          value={input.name}
          name="name"
          autoComplete='off'
          onChange={e => handleChange(e)}
        />
        { errors.name && (<p className={style.error_msj}>{errors.name}</p>) }
      </div>
      <div className={style.labelInput}>
        <label>Difficulty:</label>
        <div className={style.inputRadio}>
        { lvlsDiff.map( lvl =>
          <label key={lvl}><input type="radio" name="difficulty" value={lvl} onChange={e => handleCheck(e)}/>{lvl}</label>
        )}
        </div>
        { errors.difficulty && (<p className={style.error_msj}>{errors.difficulty}</p>) }
      </div>
      <div className={style.labelInput}>
        <label>Duration:</label>
        <input
          type="text"
          value={input.duration}
          name="duration"
          autoComplete='off'
          onChange={e => handleChange(e)}
        />
      </div>
      <div className={style.labelInput}>
        <label>Season:</label>
        <div className={style.inputRadio}>
        <label><input type="radio" name="season" value="summer" onChange={e => handleCheck(e)}/>Summer</label>
        <label><input type="radio" name="season" value="autumn" onChange={e => handleCheck(e)}/>Autumn</label>
        <label><input type="radio" name="season" value="winter" onChange={e => handleCheck(e)}/>Winter</label>
        <label><input type="radio" name="season" value="spring" onChange={e => handleCheck(e)}/>Spring</label>
        </div>
        { errors.season && (<p className={style.error_msj}>{errors.season}</p>) }
      </div>
      <div className={style.labelInput}>
        <label>Countries:</label>
        <div className={style.selectCountries}>
        <select onChange={e => handleSelect(e)}>
          <option value="">Select country</option>
        { allCountries.map(country => 
            <option value={country.id} key={country.id}>{country.name}</option>
        )}
        </select>
        </div>
        { errors.countries && (<p className={style.error_msj}>{errors.countries}</p>) }
        <div className={style.labelInput}>
        <p>Selected countries: </p>
        <ul>
          {input.countries?.map(c =>
            <div key={c}>
              <li>{c}</li>
              <button onClick={(e) => handleDelete(e, c)}><BiTrashAlt/></button>
            </div>
          )}
        </ul>
        </div>
      </div>
      
    </form>
    </div>
  )
}

export default CreateActivity
