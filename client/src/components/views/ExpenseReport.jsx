import { VIEWS } from '@src/constants'
import MonthlyView from './monthly_view/MonthlyView'

const ExpenseReport = ({currentView}) => {
    return (
        <>
            {
                (currentView === VIEWS.MONTHLY_VIEW) && <MonthlyView />
            }
        </>
    )
}

export default ExpenseReport

