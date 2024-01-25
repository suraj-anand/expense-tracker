import { useContext, useState } from 'react'
import { ExpenseContext } from '@src/context/ExpenseContext'
import Months from './Months'
import DataTable from './DataTable';

const MonthlyView = () => {
    
    const { parsedExpense } = useContext(ExpenseContext);

    const [ activeMonth, setActiveMonth ] = useState();
    const [ activeYear, setActiveYear ] = useState(() => {
        if(Object.keys(parsedExpense).length === 1) {
          return Object.keys(parsedExpense)[0]
        } else {
          return null;
        }
      });
  
    return (
        <>
            <Months {...{activeYear, setActiveYear, activeMonth, setActiveMonth}} key={"months"} />
            <DataTable {...{activeYear, activeMonth}} key="monthly-view-datatable" />
        </>
    )
}

export default MonthlyView