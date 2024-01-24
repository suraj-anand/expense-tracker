import { useState } from 'react'
import Months from './Months'
import DataTable from './DataTable';

const MonthlyView = () => {
    const [ activeMonth, setActiveMonth ] = useState();
  
    return (
        <>
            <Months setActiveMonth={setActiveMonth} key={"months"} />
            <DataTable activeMonth={activeMonth} />
        </>
    )
}

export default MonthlyView