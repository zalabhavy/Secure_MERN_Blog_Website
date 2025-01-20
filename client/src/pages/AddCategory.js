import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

  const navigate = useNavigate();
  const [input,setInput] = useState({
    title:"",
  })

  const handleCategory = async (e) =>
  {
    e.preventDefault();
    try {
       const res = await axios.post("http://localhost:9000/api/v1/add/catagory",input,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
       );
       alert(res.data.message);
       navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className='container shadow'>
      <h2 className='text-center my-3'>Add a New Category</h2>
      <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleCategory}>
            <div className='mb-3'>
              <label htmlFor='categoryName' className='form-label'>
                Category Name
              </label>
              <input
                type='text'
                name='title'
                value={input.title}
                onChange={(e)=>setInput({...input,[e.target.name] : e.target.value})}
                className='form-control'
                id='categoryName'
                placeholder='Category Name'
              />
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-primary btn-block'>
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
