import { useState, useRef, useContext } from "react";
import { format } from 'date-fns';
import { ExpenseContext } from '../../context/ExpenseContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Select from 'react-select'
import axios from 'axios'

const UpdateForm = ( { expense, modalId } ) => {
  
  // Prop
  const { 
    id, amount, 
    title, description, 
    tags, category,
    date
  } = expense;

  // context
  const { setRefetch, aggregatedCategories, aggregatedTags } = useContext(ExpenseContext)
  
  // States
  const [ _title, setTitle ] = useState(title);
  const [ _description, setDescription ] = useState(description);
  const [ _amount, setAmount] = useState(amount);
  const [ _tags, setTags ] = useState(JSON.parse(tags));
  const [ _categories, setCategories ] = useState(JSON.parse(category))
  const [ _date, setDate ] = useState(format(date, "yyyy-MM-dd"));
  
  // refs
  const closeBtn = useRef();


  // Event Handlers
  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setCategories(event?.map(e => e?.value));
  }

  const handleTagsChange = (event) => {
    setTags(event?.map(e => e?.value));
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  }

  const handleUpdate = async (event) => {
    
    const payload = {
      "expenseId": id,
      "amount": _amount,
      "title" : _title,
      "description" : _description,
      "date" : _date,
      "tags" : JSON.stringify(_tags),
      "category" : JSON.stringify(_categories),
    }

    if( !payload.amount || !payload.title || !date ) {
      alert("please fill all the required fields");
      return 
    }

    const response = await axios.put("/api/expense/", payload);
    if([200, 201].includes(response.status)){
      setRefetch(refetch => (!refetch));
      closeBtn.current.click();
    } else {
      alert("failed on updating expense :(")
    }
  }

  return (
    <div className="modal bg-dark" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="1">
          
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Update Expense</h1>
            <button type="button" className="btn btn-outline-secondary me-3" data-dismiss="modal" data-bs-dismiss="modal" ref={closeBtn} >
              <IoIosCloseCircleOutline size={24} />
            </button>
          </div>

        <div className="modal-dialog text-white">
          <div className="modal-body modal-container mt-3 px-2">
              <label htmlFor="amount">Enter Amount <span className='text-danger fs-5'>*</span></label>
              <input type="number" name="amount" 
                      id="amount" 
                      className='form-control input-dark' 
                      value={_amount} onChange={handleAmountChange} />

              <label htmlFor="date" className='mt-4'>Select Date <span className='text-danger fs-5'>*</span></label>
              <input type="date" name="date" 
                    id="date" className='form-control input-dark'
                    value={_date} onChange={handleDateChange} />

              <label htmlFor="title" className='mt-4'>Enter Title <span className='text-danger fs-5'>*</span></label>
              <input type="text" name="title" 
                      id="title" className='form-control input-dark'
                      autoComplete='off'
                      value={_title} onChange={handleTitleChange} />

              <label htmlFor="description" className='mt-4'>Enter Description</label>
              <input type="text" name="title" id="title"  
                      className='form-control input-dark'
                      autoComplete='off'
                      value={_description} onChange={handleDescChange} />

                <label htmlFor="category" className='mt-4'>Select Category</label>
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
                    value={_categories.map( e => ( {"label": e, "value": e} ) )}
                  />

                <label htmlFor="tags" className='mt-4'>Select Tags</label>
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
                  value={_tags.map( e => ( {"label": e, "value": e} ) )}
                  />

              <div className="d-flex p-2 mx-auto mt-3 mb-5 justify-content-center">
                <button className="btn btn-outline-light px-4 mb-4" onClick={handleUpdate}>Update</button>
              </div>

          </div>
        </div>
      </div>
  )
}

export default UpdateForm