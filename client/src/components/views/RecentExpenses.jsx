import React, { useState, useContext, useEffect } from 'react'
import {format} from 'date-fns'
import { Select, MenuItem, Fab } from '@mui/material';
import { IoTimerOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { Spinner } from 'react-bootstrap'
import { ExpenseContext } from '@src/context/ExpenseContext'


const COLUMNS = ["Date", "Title", "Category", "Amount"];

const RecentExpenses = () => {

    const [ columns, setColumns ] = useState(COLUMNS);
    const [ data, setData ] = useState([]);
    const [ nRecent, setNrecent ] = useState(3);

    const { expense, expenseLoading, setRefetch } = useContext(ExpenseContext);

    useEffect(() => {
        setRefetch(refetch => (!refetch));
    }, [])

    return (
        <>
            <Header nRecent={nRecent} setNrecent={setNrecent} expense={expense} />
            {
                expenseLoading ? <div className="d-flex justify-content-center"><Spinner /></div> : 
            <>
                {
                    expense?.length > 0 ?
                    <div className="table-responsive align-middle">
                        <table className="table table-secondary">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {
                                        columns.map(e => {
                                            return <th>{e}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expense?.slice(0, nRecent).map((row, index) => {
                                        return (<TableRow row={row} index={index} key={index} />)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='fs-5 text-center'>You've got no recent expenses. Create Your expenses by clicking on 
                            <button data-bs-toggle="modal" data-bs-target="#expenseModal" className='btn'>{<Fab><IoIosAdd size={24} /></Fab>}</button> icon
                    </p>
                }
            </>
            }
        </>
    )
}

function Header({nRecent, setNrecent, expense}){
    return (
        <div className="d-flex align-items-center">
            <p className='fs-5 my-0'><IoTimerOutline size={24} /> Your Recent Expenses</p>
            
            {
            expense?.length > 0 &&
            <div className="ms-auto">
                <Select value={nRecent}  sx={{ m: 1, backgroundColor: "#646cff" }} onChange={(event) => {setNrecent(event.target.value)}}>
                    <MenuItem value={3}>Recent 3 Expenses</MenuItem>
                    <MenuItem value={5}>Recent 5 Expenses</MenuItem>
                    <MenuItem value={10}>Recent 10 Expenses</MenuItem>
                </Select>
            </div>
            }
        </div>
    )
}

function TableRow({row, index}){
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{format(row?.date, "dd-MMM-yy hh:mm aaa")}</td>
            <td>{row?.title}</td>
            <td>
                {row?.category && JSON.parse(row?.category)?.map(e => (<CategoryTags category={e} />))}
            </td>
            <td>{row?.amount}</td>
        </tr>
    )
}

function CategoryTags({category}){
    return (
        <>
            <div className="badge text-bg-primary p-2 mx-1">{category}</div>
        </>
    )
}

export default RecentExpenses