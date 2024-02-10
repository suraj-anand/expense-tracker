import { VIEWS } from '@src/constants'
import MonthlyView from './monthly_view/MonthlyView'
import YearlyView from './yearly_view/YearlyView'

const ExpenseReport = ({currentView}) => {
    return (
        <>
            {
                (currentView === VIEWS.MONTHLY_VIEW) && <MonthlyView />
            }
            {
                (currentView === VIEWS.YEARLY_VIEW) && <YearlyView /> 
            }
        </>
    )
}

export default ExpenseReport

