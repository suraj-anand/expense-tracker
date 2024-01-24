import { Navbar, ExpenseReport } from '@components'
import { TbReportAnalytics } from "react-icons/tb";
import { Select, MenuItem } from '@mui/material'
import { useState } from 'react';
import { VIEWS } from '@src/constants'
const Report = () => {

    const [ currentView, setCurrentView ] = useState(VIEWS.MONTHLY_VIEW)
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                {/* Header */}
                <div className="d-flex align-items-center">
                    <p className='text-center fs-5'> <TbReportAnalytics size={24} /> Your Expense Report</p>
                    
                    <p className='my-0 ms-auto fs-5 me-2'>View </p>
                    <Select sx={{  backgroundColor: "#646cff" }} value={currentView} onChange={(e) => {setCurrentView(e.target.value)}}>
                        <MenuItem value={VIEWS.MONTHLY_VIEW}>{VIEWS.MONTHLY_VIEW}</MenuItem>
                        <MenuItem value={VIEWS.YEARLY_VIEW}>{VIEWS.YEARLY_VIEW}</MenuItem>
                    </Select>
                </div>

                {/* Table */}
                <ExpenseReport currentView={currentView} />
            </div>
        </>
    )
}

export default Report