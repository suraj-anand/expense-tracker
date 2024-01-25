import React, { useContext, useEffect, useState } from 'react'
import { ExpenseContext } from "@src/context/ExpenseContext"
import Years from './Years';
import DataTable from './DataTable';

const YearlyView = () => {
  
  const { expense } = useContext(ExpenseContext);

  const [ activeYear, setActiveYear ] = useState(null);
  
  useEffect(() => {
    
  }, [])
  
  return (
    <>
      <Years {...{activeYear, setActiveYear}} />
      <DataTable {...{activeYear}} />
    </>
  )
}

export default YearlyView