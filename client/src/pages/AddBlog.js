import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [file,setFile] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/v1/get/catagories", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories");
      } 
    };
    fetchAllCategories();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  //creating a form data

  const formdata = new FormData();
  formdata.append("title",input.title);
  formdata.append("category",input.category);
  formdata.append("description",input.description);
  formdata.append("thumbnail",file);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/v1/add/blog",
        formdata,
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='container shadow'>
      <h2 className='text-center my-3'>Add a New Blog</h2>
      <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='text'
                name='title'
                value={input.title}
                onChange={handleChange}
                className='form-control'
                id='title'
                placeholder='Blog Title'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='category' className='form-label'>
                Category
              </label>
              <select
                className='form-control'
                name='category'
                onChange={handleChange}
              >
                <option disabled selected>
                  Select Category
                </option>
                {categories && categories.map((item) => {
                  return <option value={item._id}>{item.title}</option>
})}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                name='description'
                value={input.description}
                onChange={handleChange}
                placeholder='Blog Description'
                className='form-control'
                id='description'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='thumbnail' className='form-label'>
                Thumbnail
              </label>
              <input
                type='file'
                name='thumbnail'
                onChange={(e)=>setFile(e.target.files[0])}
                className='form-control'
                id='thumbnail'
                placeholder='Select Thumbnail'
              />
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-primary btn-block'>
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
