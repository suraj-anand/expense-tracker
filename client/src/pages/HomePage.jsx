import { 
    Navbar, 
    RecentExpenses,
    AddExpense,
    ExpenseReportButton,
} from "@components"


const HomePage = () => {

    return (
        <div className="text-white">
            <Navbar />
            <div className="container-fluid">
                <RecentExpenses />
                <ExpenseReportButton />
                <AddExpense />
            </div>
        </div>
    )
}

export default HomePage