import { useForm } from 'react-hook-form'
import { DEFAULT_TAGS, DEFAULT_CATEGORIES } from '@src/constants'
import { useState } from 'react';
import { Fab } from '@mui/material'
import { IoIosAdd } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { format } from 'date-fns'
import Select from 'react-select/creatable'

function AddExpense (){


  return (
    <>
      <ExpenseFormModal  />

      <div className="" style={{position: "absolute", bottom: 20, right: 20}} >
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#expenseModal">
          <Fab> 
            <IoIosAdd size={32}  />
          </Fab>
        </button>
      </div>
    </>
  )
}

export function ExpenseFormModal(){

  const _date = new Date();
  const { register, getValues } = useForm();
  const [ selectedTags, setSelectedTags ] = useState([]);
  const [ selectedCategories, setSelectedCategories ] = useState([])
  const [ date, setDate ] = useState(`${format(_date, "yyyy-MM-dd")}T${format(_date, "hh:mm")}`);
  // const [ tags, setTags ] = useState(DEFAULT_TAGS); // will try to fetch and aggregate all the user created tags
  // const [ category, setCategory ] = useState([]); // will try to fetch and aggregate all the user created tags

  const handleDateChange = (event) => {
    console.log(event.target.value)
    setDate(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategories(event?.map(e => e?.value));
  }

  const handleTagsChange = (event) => {
    setSelectedTags(event?.map(e => e?.value));
  }

  const handleSaveExpense = (event) => {
    const payload = {
      "amount": getValues()?.amount,
      "title" : getValues()?.title,
      "description" : getValues()?.description,
      "date" : date,
      "tags" : JSON.stringify(selectedTags),
      "category" : JSON.stringify(selectedCategories),
    }
    console.log(payload);
  }
  console.log(`${format(_date, "yyyy-MM-dd")}`)

  return (
        <div className="modal modal-fullscreen bg-dark text-white"  tabindex="-1" id="expenseModal">
          
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Expense</h1>
              <button type="button" className="btn btn-light"  data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>

            <div className="modal-container modal-body d-flex flex-column mt-4">
              <label htmlFor="amount">Enter Amount <span className='text-danger fs-5'>*</span></label>
              <input type="number" name="amount" 
                      id="amount" 
                      className='form-control' 
                      {...register("amount")}  />

            <label htmlFor="amount" className='mt-4'>Select Date <span className='text-danger fs-5'>*</span></label>
            <input type="datetime-local" name="datetime" 
                  id="datetime" className='form-control'
                  value={date} onChange={handleDateChange} />

            <label htmlFor="amount" className='mt-4'>Enter Title <span className='text-danger fs-5'>*</span></label>
            <input type="text" name="title" 
                    id="title" className='form-control'
                    {...register("title")} />

            <label htmlFor="amount" className='mt-4'>Enter Description</label>
            <input type="text" name="title" id="title"  
                    className='form-control'
                    {...register("description")} />

            <label htmlFor="amount" className='mt-4'>Select Category</label>
            <Select 
              options={DEFAULT_CATEGORIES}
              isClearable={true}
              isMulti={true}
              closeMenuOnSelect={false}
              onChange={handleCategoryChange}
              />

            <label htmlFor="amount" className='mt-4'>Select Tags</label>
            <Select 
              isMulti={true}
              isClearable={true}
              options={DEFAULT_TAGS}
              closeMenuOnSelect={false}
              onChange={handleTagsChange}
              />

            <div className="d-flex p-2 mx-auto my-5 justify-content-center">
              <button className="btn btn-outline-light px-4" onClick={handleSaveExpense}>Save</button>
            </div>

          </div>
      </div>
  )
}


export default AddExpense