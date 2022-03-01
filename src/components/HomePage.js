import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabOrder,
  filterActivity,
  filterContinent,
  getActivities,
  getAllCountries,
  populationOrder,
} from "../redux/action";
import { Link } from "react-router-dom";

// Componentes ----------------------
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

// Styles ---------------------------
import style from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch(); // Usar action
  const countries = useSelector((state) => state.countries); // usar el estado
  const activities = useSelector((state) => state.activities);

  const [, setOrder] = useState("");

  // Paginado - Inicio -------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  const lastPage =
    Math.ceil((countries.length - 9) / (countriesPerPage + 1)) + 1;
  // Diferencia entre indices
  let FirstCountry = 0;
  let LastCountry = 0;

  if (currentPage === 1) {
    FirstCountry = 0;
    LastCountry = 0;
  } else {
    FirstCountry = currentPage - 2;
    LastCountry = currentPage - 1;
  }
  // indices
  const indexLastCountry = currentPage * countriesPerPage;
  const indexFisrtCountry = indexLastCountry - countriesPerPage;

  const currentCountries = countries.slice(
    indexFisrtCountry + FirstCountry,
    indexLastCountry + LastCountry
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFLPN = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "first":
        pagination(1);
        break;
      case "last":
        pagination(lastPage);
        break;
      case "prev":
        if (currentPage - 1 !== 0) {
          pagination(currentPage - 1);
        }
        break;
      case "next":
        if (currentPage !== lastPage) {
          pagination(currentPage + 1);
        }
        break;
      default:
        break;
    }
  };
  // Paginado - fin ----------------------------------------------

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const handleFilterContinent = (e) => {
    dispatch(filterContinent(e.target.value)); // Envio el valor del filtro
    pagination(1); // Rotorno a la 1ra página
  };

  const handleFilterActivity = (e) => {
    dispatch(filterActivity(e.target.value));
    pagination(1);
  };

  const handleAlphOrder = (e) => {
    e.preventDefault();
    dispatch(alphabOrder(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const handlePopOrder = (e) => {
    e.preventDefault();
    dispatch(populationOrder(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  return (
    <div className={style.HomePage}>
      <div className={style.filters}>
        <p>Filters</p>
        <div className={style.select}>
          <select onChange={(e) => handleFilterContinent(e)}>
            <option value="All">Continents</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
          <div className={style.select_arrow}></div>
        </div>
        <div className={style.select}>
          <select onChange={(e) => handleFilterActivity(e)}>
            <option value="All">Activities</option>
            {activities?.map((act) => (
              <option key={act.name} value={act.name}>
                {act.name}
              </option>
            ))}
          </select>
          <div className={style.select_arrow}></div>
        </div>
        <p>Order</p>
        <div className={style.select}>
          <select onChange={(e) => handleAlphOrder(e)}>
            <option value="defaultValue">By name</option>
            <option value="A-Z">By name (A-Z)</option>
            <option value="Z-A">By name (Z-A)</option>
          </select>
          <div className={style.select_arrow}></div>
        </div>
        <div className={style.select}>
          <select onChange={(e) => handlePopOrder(e)}>
            <option value="defaultValue">By population</option>
            <option value="less">Less</option>
            <option value="more">More</option>
          </select>
          <div className={style.select_arrow}></div>
        </div>
        <SearchBar className={style.filterSearch} pagination={pagination} />
      </div>

      <div className={style.pagination}>
        <p>
          <strong>Page: </strong>
          {`${currentPage} / ${lastPage}`}
        </p>
        <p>
          <strong>Countries: </strong>
          {countries.length}
        </p>
        <Pagination
          countriesPerPage={countriesPerPage}
          countries={countries.length}
          pagination={pagination}
          handleFLPN={handleFLPN}
          currentPage={currentPage}
        />
      </div>

      <div className={style.cards_container}>
        {
          currentCountries?.map((country) => (
            <Link
              to={`home/country/${country.id}`}
              key={country.id}
              className={style.Link}
            >
              <Card
                name={country.name}
                flag={country.flag}
                continent={country.continent}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
