import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <>
      <main className='my-5'>
        <div className='container shadow-lg'>
          <section className='text-center'>
            <h2 className='mb-5 my-3'>
              <strong>Latest Post</strong>
            </h2>
            <div className='row'>
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className='col-lg-4 col-md-6 mb-4' key={item.id}>
                    <div className='bg-image hover-overlay ripple' data-mdb-ripple-color='light'>
                                    <img
                  src={`http://localhost:9000/upload/${item.thumbnail}`} 
                  className='img-fluid'
                  style={{ height: '250px', objectFit: 'cover' }}
                  alt={item.title}
                />

                      <a href='#!'>
                        <div className='mask' style={{ backgroundColor: 'rgba(251,251,251,0.15)' }}></div>
                      </a>
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title mt-2 mb-2'>{item.title}</h5>
                      <p className='card-text mb-2 mt-2'>{item.description}</p>
                      
                      <Link to={`/blog/${item._id}`} className='btn btn-primary'>
                        Read More
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Loading..</h2>
              )}
            </div>
          </section>
        </div>
      </main>
      <footer className='bg-primary text-lg-start'>
        <div className='text-center p-3 text-white' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          &copy; 2024{' '}
          <a className='text-white mx-2' href='https://bhavy.netlify.app/'>
            Bhavy Zala
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
