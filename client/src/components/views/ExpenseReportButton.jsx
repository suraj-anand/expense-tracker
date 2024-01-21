import { TbReportAnalytics } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const ExpenseReportButton = () => {
  return (
    <>
      <div className="mt-5 d-flex mx-auto align-items-center justify-content-center" >
          <button className="btn text-white position-absolute fs-5" style={{top: "85%"}}>
            <NavLink to="/report">
                <TbReportAnalytics fontSize={32} /> <span>View Complete Expense Report</span>
            </NavLink>
          </button>
      </div>
    </>
  )
}

export default ExpenseReportButton