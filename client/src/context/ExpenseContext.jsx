import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MONTHS,DEFAULT_TAGS, DEFAULT_CATEGORIES } from '@src/constants'

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
    

    const [ expense, setExpense ] = useState([]);
    const [ expenseLoading, setExpenseLoading ] = useState(false);
    const [ refetch, setRefetch ] = useState(false);

    // make api call and fetch all expenses
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

    
    function getParsedExpense(){

        // Aggregated tags & categories
        const _tags = new Set();
        const _categories = new Set();

        // aggregate months & years across all the expense & Organize data 
        const parsedData = expense.reduce((result, item) => {
            
            const { year, month } = getDateDetails(item.date);

            const { tags, category } = item; 
            
            if(tags){
                JSON.parse(tags).map(e => _tags.add(e))
            }
            if(category){
                JSON.parse(category).map(e => _categories.add(e))
            }

            if (!result[year]) {
                result[year] = {};
            }

            if (!result[year][month]) {
                result[year][month] = [];
            }

            result[year][month].push(item);

            return result;
        }, {});

        DEFAULT_TAGS.forEach(tag => {
            _tags.add(tag);
        })

        DEFAULT_CATEGORIES.forEach(category => {
            _categories.add(category);
        })

        return {parsedExpense: parsedData, aggregatedTags: Array.from(_tags), aggregatedCategories: Array.from(_categories)};
    }

    useEffect(() => {
        fetchExpenses();
    }, [refetch])

    
    return (
        <ExpenseContext.Provider value={{
                    expense, ...getParsedExpense(), setExpense,
                    expenseLoading, setExpenseLoading,
                    refetch, setRefetch
                }}>
            {children}
        </ExpenseContext.Provider>
    )
}

// Helpers
// Function to convert date to desired format
export const getDateDetails = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    return { year, month };
};