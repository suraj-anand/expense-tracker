import { useContext } from "react"
import { Spinner } from 'react-bootstrap'
import { ExpenseContext } from "@src/context/ExpenseContext"
import { MONTHS } from "@src/constants"
import { AiFillDelete } from "react-icons/ai";
import { format } from 'date-fns';
import { BS_TEXT_COLORS } from '@src/constants'
import axios from "axios";

const DataTable = ({activeMonth}) => {

    const { expense, expenseLoading, setRefetch } = useContext(ExpenseContext)
    let parsed_expense = {};
    
    expense?.forEach( e => {
        const date = new Date(e.date);
        const month = MONTHS[date.getMonth()];

        if(Object.keys(parsed_expense).includes(month)){
            parsed_expense = {
                ...parsed_expense,
                [month]:  [...parsed_expense[month], e]
            }
        } else {
            parsed_expense = {
                ...parsed_expense,
                [month]: [e],
            }
        }
    })

    async function handleDelete(event, id){
        console.log(`deleting, ${id}`)
        const response = await axios.delete(`/api/expense/?expenseId=${id}`)
        if([200, 201, 202, 204].includes(response.status)){
            setRefetch(refetch => (!refetch))
        }
    }

    if(expenseLoading) {
        return (
            <div className="d-flex p-5">
                <Spinner />
            </div>
        )
    }

    return (
    <>
        {
            parsed_expense[activeMonth] && 
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Amount</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parsed_expense[activeMonth].map((exp, index) => {
                                return (
                                    <tr class="">
                                        <td>{index + 1}</td>
                                        <td>{format(new Date(exp.date), "dd-MMM-yy")}</td>
                                        <td>{exp.title}</td>
                                        <td>{exp.description}</td>
                                        <td>{exp.category && JSON.parse(exp.category).map(e => <Tags text={e} />)}</td>
                                        <td>{exp.tags && JSON.parse(exp.tags).map(e => <Tags text={e} />)}</td>
                                        <td>{exp.amount}</td>
                                        <td><button className="btn btn-danger" onClick={(e) => {handleDelete(e, exp.id)}}><AiFillDelete size={24} /></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        }
    </>
  )
}

export function Tags({text}){
    const randIndex = Math.floor(Math.random() * BS_TEXT_COLORS.length)
    return (
        <>
            <div className={`badge mx-1 ${BS_TEXT_COLORS[randIndex]} p-2`}>{text}</div>
        </>
    )
}


export default DataTable

