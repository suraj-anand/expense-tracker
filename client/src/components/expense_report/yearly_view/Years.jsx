import React, { useContext } from 'react'
import _ from 'lodash'
import {ExpenseContext}  from '@src/context/ExpenseContext';

const Years = ({ setActiveYear }) => {
  
  const { parsedExpense } = useContext(ExpenseContext);
  
  function handleYearClick(event, year){
    document.querySelectorAll(".btn-year").forEach(e => e.classList.remove("active"));
    event.target.classList.toggle("active");
    setActiveYear(year);
  }

  return (
    <div className='d-flex gap-3 my-3 align-items-center justify-content-center w-100 flex-wrap'>
    {
        (!_.isEmpty(parsedExpense)) && Object.keys(parsedExpense).map(year => (
          <button className="btn btn-outline-secondary btn-year" id={`btn-${year}`}  onClick={(e) => (handleYearClick(e, year))} >
            {year}
          </button>
        ))
      }
    </div>
  )
}

export default Years