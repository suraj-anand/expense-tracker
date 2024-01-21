import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
    

    const [ expense, setExpense ] = useState([]);
    const [ expenseLoading, setExpenseLoading ] = useState(false);
    const [ refetch, setRefetch ] = useState(false);

    async function fetchExpenses(){
        setExpenseLoading(true);
        try{
            const response = await axios.get("/api/expense/");
            if([200, 201].includes(response.status)){
                setExpense(response.data?.result);
            } else {
                console.log(`failed to retrieve expenses, status_code: ${response.status}`)
            }
        } catch(error){
            console.log("error on fetching expenses: ",error);
        } finally {
            setExpenseLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, [refetch])
    
    return (
        <ExpenseContext.Provider value={{
                    expense, setExpense,
                    expenseLoading, setExpenseLoading,
                    refetch, setRefetch
                }}>
            {children}
        </ExpenseContext.Provider>
    )
}