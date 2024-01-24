import React from 'react'
import { MONTHS } from '@src/constants'

const Months = ({ setActiveMonth }) => {
  
  function handleMonthClick(event, month){
    document.querySelectorAll(".btn-month").forEach(e => e.classList.remove("active"));
    event.target.classList.toggle("active");
    setActiveMonth(month);
  }

  return (
    <div className='d-flex gap-3 my-3 align-items-center justify-content-center w-100 flex-wrap'>
      {
        MONTHS.map(month => (
          <button className="btn btn-outline-secondary btn-month" id={`btn-${month}`}  onClick={(e) => (handleMonthClick(e, month))} >
            {month}
          </button>
        ))
      }
    </div>
  )
}

export default Months