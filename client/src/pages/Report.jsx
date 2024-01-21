import { Navbar, ExpenseReport } from '@components'
import { TbReportAnalytics } from "react-icons/tb";
import { Select, MenuItem } from '@mui/material'

const Report = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                {/* Header */}
                <div className="d-flex align-items-center">
                    <p className='text-center fs-5'> <TbReportAnalytics size={24} /> Your Expense Report</p>
                    
                    <p className='my-0 ms-auto fs-5 me-2'>View </p>
                    <Select sx={{  backgroundColor: "#646cff" }} value={"month"}>
                        <MenuItem value={"month"}>Monthly View</MenuItem>
                        <MenuItem value={"year"}>Yearly View</MenuItem>
                    </Select>
                </div>

                {/* Table */}
                <ExpenseReport />
            </div>
        </>
    )
}

export default Report