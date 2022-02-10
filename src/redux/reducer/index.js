import { ALPHAB_ORDER, FILTER_ACTIVITY, FILTER_CONTINENT, GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_DETAIL, GET_NAME_COUNTRY, POPULATION_ORDER, POST_ACTIVITY } from "../action";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  detail: {},
  countriesByContinent: [],
  countriesByActivity: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,  // Todos los países
        countries: payload,     // Países que se renderizarán
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload
      };
    case GET_NAME_COUNTRY:
      return {
        ...state,
        countries: payload
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: payload
      };
    case ALPHAB_ORDER:
      let sortAlph = payload === "A-Z" ?
        state.countries.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0
        }) :
        payload === "Z-A" ?
        state.countries.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        }) :
        state.countries

      return {
        ...state,
        countries: sortAlph
      };
    case POPULATION_ORDER:
      let sortPop = payload === "more" ?
      state.countries.sort((a, b) => {
        if (a.population > b.population) return -1;
        if (b.population > a.population) return 1;
        return 0
      }) :
      state.countries.sort((a, b) => {
        if (a.population > b.population) return 1;
        if (b.population > a.population) return -1;
        return 0;
      });
      return {
        ...state,
        countries: sortPop
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case FILTER_ACTIVITY:
      
      let toFilterActivity = [];
      state.countriesByContinent.length > 0 ?
      toFilterActivity = [...state.countriesByContinent] :
      toFilterActivity = [...state.allCountries];

      let resultActivity = [];
      payload === "All" ?
      resultActivity = [...state.allCountries] :
      resultActivity = toFilterActivity.filter(country => country.tourisms?.map(a => a.name).includes(payload));
      console.log(resultActivity)

      return {
        ...state,
        countries: resultActivity,
        countriesByActivity: resultActivity
      };
    case FILTER_CONTINENT:
      let toFilterContinent = [];
      state.countriesByActivity.length > 0 ?
      toFilterContinent = [...state.countriesByActivity] :
      toFilterContinent = [...state.allCountries];

      let resultContinent = [];
      payload === "All" ?
      resultContinent = [...state.allCountries] :
      resultContinent = toFilterContinent.filter(c => c.continent === payload)

      return {
        ...state,
        countries: resultContinent,
        countriesByContinent: resultContinent
      };
    default:
      return {...state}
  }
}

export default rootReducer;