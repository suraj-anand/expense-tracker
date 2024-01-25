import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MONTHS } from '@src/constants'

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

    function parseExpense(){ 
        // aggregate months & years across all the expense
        
        // Function to convert date to desired format
        const getDateDetails = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = MONTHS[date.getMonth()];
            return { year, month };
        };

        // Organize data into the desired structure
        const parsedData = expense.reduce((result, item) => {
            const { year, month } = getDateDetails(item.date);

            if (!result[year]) {
                result[year] = {};
            }

            if (!result[year][month]) {
                result[year][month] = [];
            }

            result[year][month].push(item);

            return result;
        }, {});

        return parsedData;
    }

    useEffect(() => {
        fetchExpenses();
    }, [refetch])

    
    return (
        <ExpenseContext.Provider value={{
                    expense, parsedExpense: parseExpense(), setExpense,
                    expenseLoading, setExpenseLoading,
                    refetch, setRefetch
                }}>
            {children}
        </ExpenseContext.Provider>
    )
}