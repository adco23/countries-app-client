import React from "react";
import style from './Pagination.module.css';

const Pagination = ({countriesPerPage, countries, pagination, handleFLPN, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((countries - 9) / (countriesPerPage + 1)) + 1; i++) {
    pageNumbers.push(i);
  }

  const pageShow = pageNumbers.filter( n => n === (currentPage - 1) || n === (currentPage + 1) || n === currentPage)

  return <div className={style.containerPag}>
    <button name="first"
            className={style.btnPag}
            disabled={(currentPage === 1 || currentPage === 2) ? true : false}
            onClick={(e) => handleFLPN(e)}
    >{'<<'}</button>

    <button name="prev"
            className={style.btnPag}
            disabled={currentPage === 1 ? true : false}
            onClick={(e) => handleFLPN(e)}
    >Prev</button>

    { pageShow?.map(num => 
      <button key={num}
              className={num === currentPage ? style.btnActive : style.btnPag}
              onClick={() => pagination(num)} 
      >{num}</button>
    )}
    
    {/* { pageNumbers?.map(num => 
      <button onClick={() => pagination(num)}  key={num}>{num}</button>
    )} */}

    <button name="next"
            className={style.btnPag}
            disabled={(currentPage === pageNumbers.length) ? true : false}
            onClick={(e) => handleFLPN(e)}
    >Next</button>

    <button name="last"
            className={style.btnPag}
            disabled={(currentPage === (pageNumbers.length - 1) || (currentPage === pageNumbers.length)) ? true : false}
            onClick={(e) => handleFLPN(e)}
    >{'>>'}</button>
  </div>
}

export default Pagination;