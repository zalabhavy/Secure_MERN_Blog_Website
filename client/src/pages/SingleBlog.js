import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
   

    const fetchSingleBlog = async () => {
     
      try {
        const res = await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
        setBlog(res.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchSingleBlog();
    // console.log("this",blog);
  }, []);

  return (
    <>
      <div className='container shadow my-3'>
        <div className='col-md-12 d-flex items-center justify-content-center bg-light'>
          <div className='row'>
            <h1 className='my-3'>{blog.title}</h1>

            <img
              src={`http://localhost:9000/upload/${blog.thumbnail}`}
              className='img img-responsive img-rounded my-3'
              alt={blog?.title}
            />
            <p className='my-3'>{blog.description}</p>
          </div>
        </div>
        <button onClick={() => navigate("/")} className='btn btn-primary'>
          Back To Posts
        </button>
      </div>
    </>
  );
};

export default SingleBlog;
