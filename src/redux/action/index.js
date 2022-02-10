import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_NAME_COUNTRY = "GET_NAME_COUNTRY";
export const GET_ACTIVITIES =  "GET_ACTIVITIES";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const ALPHAB_ORDER =  "ALPHAB_ORDER";
export const POPULATION_ORDER =  "POPULATION_ORDER";
export const POST_ACTIVITY =  "POST_ACTIVITY";
export const FILTER_ACTIVITY =  "FILTER_ACTIVITY";

export const getAllCountries = () => dispatch => {
  return fetch('http://localhost:3001/countries') // fetch devuelve una promesa
    .then(res => res.json()) // json() toma response y la lee hasta el final, devolviendo una promesa que se resuelve con el resultado del texto del cuerpo como json
    .then(countries => dispatch({ // Se gestiona la info que proviene de la promesa anterior
      type: GET_ALL_COUNTRIES,
      payload: countries
    }))
    .catch(err => console.log("Error getAllCountries: ", err)); // Se encarga de captar todos los errores
};

export const filterContinent = (value) => {
  return {
    type: FILTER_CONTINENT,
    payload: value
  }
}

export const getActivities = () => dispatch => {
  return fetch('http://localhost:3001/activity')
    .then(res => res.json())
    .then(activities => dispatch({
      type: GET_ACTIVITIES,
      payload: activities
    }))
}

export const alphabOrder = (order) => {
  return {
    type: ALPHAB_ORDER,
    payload: order
  }
};

export const populationOrder = (order) => {
  return {
    type: POPULATION_ORDER,
    payload: order
  }
};

export const getNameCountry = (name) => dispatch => {
  return fetch(`http://localhost:3001/countries?name=${name}`)
    .then(res => res.json())
    .then(countries => dispatch({
      type: GET_NAME_COUNTRY,
      payload: countries
    }))
    .catch(err => console.log("Error getNameCountry: ", err))
}

export const postActivity = (newActivity) => async dispatch => {
  try {
    const resp = await axios.post("http://localhost:3001/activity", newActivity);
    console.log(resp.data)
  } catch (error) {
    console.log("postActivity: ", error)
  }
};

export const getDetail = (id) => dispatch => {
  return fetch(`http://localhost:3001/countries/${id}`)
    .then(res => res.json())
    .then(country => dispatch({
      type: GET_DETAIL,
      payload: country
    }))
    .catch(err => console.log("Error getCountry: ", err));
}

export const filterActivity = (activity) => {
  return {
    type: FILTER_ACTIVITY,
    payload: activity
  }
};