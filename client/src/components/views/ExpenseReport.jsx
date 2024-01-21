import React from 'react'

const columns = [
    { field: 'id', headerName: '#', width: 70, sortable: true },
    { field: 'amount', headerName: 'Amount', sortable: true, width: 100 },
    { field: 'title', headerName: 'Title', width: 150, sortable: true },
    { field: 'description', headerName: 'Description', width: 300, sortable: true },
    { field: 'category', headerName: 'Category', width: 100, sortable: true },
    { field: 'tags', headerName: 'Tags', type: 'number', width: 100, sortable: true },
];

const rows = [
    { id: 1, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
    { id: 2, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
    { id: 3, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
    { id: 4, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
    { id: 5, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
    { id: 6, title: 'Snow', category: 'Jon', description: 35, tags: "", amount: 150 },
];

const ExpenseReport = () => {
    return (
        <div className='my-2'>
        </div>
    )
}

export default ExpenseReport

