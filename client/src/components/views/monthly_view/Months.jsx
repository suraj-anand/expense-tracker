import React, { useContext, useEffect, useState } from 'react'
import { MONTHS } from '@src/constants'
import { Select, MenuItem } from '@mui/material'
import { ExpenseContext } from '@src/context/ExpenseContext'

const Months = ({ setActiveMonth, activeYear, setActiveYear }) => {

  const { parsedExpense } = useContext(ExpenseContext);

  // Event handlers
  
  function handleYearChange(event) {
    document.querySelectorAll(".btn-month").forEach(e => e.classList.remove("active"));
    setActiveYear(event.target.value);
    setActiveMonth(null);

    console.log(event.target.value)
  }

  function handleMonthClick(event, month){
    document.querySelectorAll(".btn-month").forEach(e => e.classList.remove("active"));
    event.target.classList.toggle("active");
    setActiveMonth(month);
  }

  console.log(parsedExpense)

  return (
    <>
    <p className='fs-5'>
        <span className='mx-3'>Select Year: </span>
        <Select value={activeYear} onChange={handleYearChange} sx={{backgroundColor: "#FFF", padding: "0px 10px"}}>
          {
            Object.keys(parsedExpense).map( year => (<MenuItem value={year}>{year}</MenuItem>) )
          }
        </Select>
    </p>
    <div className='d-flex gap-3 my-3 align-items-center justify-content-center w-100 flex-wrap'>
    {
        parsedExpense[activeYear] && Object.keys(parsedExpense[activeYear]).map(month => (
          <button className="btn btn-outline-secondary btn-month" id={`btn-${month}`}  onClick={(e) => (handleMonthClick(e, month))} >
            {month}
          </button>
        ))
      }
    </div>
    </>
  )
}

export default Months