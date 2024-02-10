import { useForm } from 'react-hook-form'
import { useContext, useRef, useState } from 'react';
import { Fab } from '@mui/material'
import { IoIosAdd } from "react-icons/io";
import { format } from 'date-fns'
import Select from 'react-select/creatable'
import axios from 'axios'
import { ExpenseContext } from '../../context/ExpenseContext'
import { IoIosCloseCircleOutline } from "react-icons/io";

function AddExpense (){


  return (
    <>
      <div className="" style={{position: "absolute", bottom: 20, right: 20}} >
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#expenseModal">
          <Fab> 
            <IoIosAdd size={32}  />
          </Fab>
        </button>
      </div>
      <ExpenseFormModal  />
    </>
  )
}

export function ExpenseFormModal(){

  const { setRefetch, aggregatedTags, aggregatedCategories } = useContext(ExpenseContext);
  const closeBtn = useRef();

  const _date = new Date();
  const { register, getValues } = useForm();
  const [ selectedTags, setSelectedTags ] = useState([]);
  const [ selectedCategories, setSelectedCategories ] = useState([])
  const [ date, setDate ] = useState(`${format(_date, "yyyy-MM-dd")}`);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategories(event?.map(e => e?.value));
  }

  const handleTagsChange = (event) => {
    setSelectedTags(event?.map(e => e?.value));
  }

  const handleSaveExpense = async (event) => {
    const payload = {
      "amount": getValues()?.amount,
      "title" : getValues()?.title,
      "description" : getValues()?.description,
      "date" : date,
      "tags" : JSON.stringify(selectedTags),
      "category" : JSON.stringify(selectedCategories),
    }

    if( !payload.amount || !payload.title || !date ) {
      alert("please fill all the required fields");
      return 
    }

    const response = await axios.post("/api/expense/", payload);
    if([200, 201].includes(response.status)){
      closeBtn.current.click();
      setRefetch(refetch => (!refetch));
    } else {
      alert("failed to create expense :(")
    }
  }

  return (
    <div className="modal bg-dark" id="expenseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="1">
          
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Expense</h1>
            <button type="button" className="btn btn-outline-secondary me-3" data-dismiss="modal" data-bs-dismiss="modal" ref={closeBtn} >
              <IoIosCloseCircleOutline size={24} />
            </button>
          </div>

        <div className="modal-dialog">
          <div className="modal-body modal-container mt-3 px-2">
              <label htmlFor="amount">Enter Amount <span className='text-danger fs-5'>*</span></label>
              <input type="number" name="amount" 
                      id="amount" 
                      className='form-control input-dark' 
                      {...register("amount")}  />

              <label htmlFor="amount" className='mt-4'>Select Date <span className='text-danger fs-5'>*</span></label>
              <input type="date" name="datetime" 
                    id="datetime" className='form-control input-dark'
                    value={date} onChange={handleDateChange} />

              <label htmlFor="amount" className='mt-4'>Enter Title <span className='text-danger fs-5'>*</span></label>
              <input type="text" name="title" 
                      id="title" className='form-control input-dark'
                      autoComplete='off'
                      {...register("title")} />

              <label htmlFor="amount" className='mt-4'>Enter Description</label>
              <input type="text" name="title" id="title"  
                      className='form-control input-dark'
                      autoComplete='off'
                      {...register("description")} />

                <label htmlFor="amount" className='mt-4'>Select Category</label>
                <Select 
                  options={aggregatedCategories.map(e => ({"label": e, "value": e}))}
                  isClearable={true}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  onChange={handleCategoryChange}
                  theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        dangerLight: "black",
                        neutral0: "black",
                        neutral10: "green",
                        neutral20: "white",
                        neutral50: "white",
                        neutral80: "white",
                        primary25: "darkgray",
                      }
                    })}
                  />

                <label htmlFor="amount" className='mt-4'>Select Tags</label>
                <Select 
                  isMulti={true}
                  isClearable={true}
                  options={aggregatedTags.map(e =>  ({"label": e, "value": e}))}
                  closeMenuOnSelect={false}
                  onChange={handleTagsChange}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      dangerLight: "black",
                      neutral0: "black",
                      neutral20: "white",
                      neutral50: "white",
                      neutral80: "white",
                      primary25: "darkgray",
                      neutral10: "blue",
                    }
                  })}
                  />

              <div className="d-flex p-2 mx-auto mt-3 mb-5 justify-content-center">
                <button className="btn btn-outline-light px-4 mb-4" onClick={handleSaveExpense}>Save</button>
              </div>

          </div>
        </div>
      </div>
  )
}


export default AddExpense