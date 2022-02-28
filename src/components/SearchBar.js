import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountry } from '../redux/action';
import { BsSearch } from 'react-icons/bs';
import style from './SearchBar.module.css';

const SearchBar = ({pagination}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInputChange = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getNameCountry(input))
    setInput("");
    pagination(1);
  }

  return (
    <div className={style.srchContainer}>
    <form className={style.formSrch} onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        placeholder='Search...'
        value={input}
        className={style.inputSrch}
        onChange={e => handleInputChange(e)}/>
      <button type='submit' className={style.btnSrch}>
        <BsSearch size={23}/>
      </button>
    </form>
    </div>
  )
}

export default SearchBar;