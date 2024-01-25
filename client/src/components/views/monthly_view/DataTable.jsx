import { useContext } from "react"
import { Spinner } from 'react-bootstrap'
import { ExpenseContext } from "@src/context/ExpenseContext"
import { AiFillDelete } from "react-icons/ai";
import { format } from 'date-fns';
import axios from "axios";
import Badges from "@src/components/generic/Badges"
import _ from "lodash"

const DataTable = ({ activeMonth, activeYear }) => {

    const { expenseLoading, parsedExpense, setRefetch } = useContext(ExpenseContext);
    let total_amount = 0;

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
            ( !_.isEmpty(parsedExpense) && activeYear && activeMonth) && parsedExpense[activeYear][activeMonth] && 
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
                    <tbody className="align-middle">
                        {
                            parsedExpense[activeYear][activeMonth].map((exp, index) => {
                                total_amount += exp.amount;
                                return (
                                    <tr class="">
                                        <td>{index + 1}</td>
                                        <td>{format(new Date(exp.date), "dd-MMM-yy")}</td>
                                        <td>{exp.title}</td>
                                        <td>{exp.description}</td>
                                        <td>{exp.category && JSON.parse(exp.category).map(e => <Badges text={e} />)}</td>
                                        <td>{exp.tags && JSON.parse(exp.tags).map(e => <Badges text={e} />)}</td>
                                        <td>{exp.amount}</td>
                                        <td><button className="btn btn-danger" onClick={(e) => {handleDelete(e, exp.id)}}><AiFillDelete size={24} /></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                    <tfoot>
                        <tr className="table-primary">
                            <td colSpan={6}></td>
                            <td>
                                <span className="fs-5">Total: {total_amount}</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        }
    </>
  )
}


export default DataTable

