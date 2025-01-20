import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handlelogout = () =>
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout..");
    navigate("/login");

  }

  return (
    <nav className='navbar navbar-expand-lg bg-primary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Blog Website
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/add-blog'>
                Add Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/add-category'>
                Add Category
              </Link>
            </li>
          </ul>
          <div className='d-flex'>
            {token ? (
              <>
                <button className='btn btn-light mx-3'>Welcome: {username}</button>
                <button className='btn btn-light' onClick={handlelogout}>LogOut</button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <button className='btn btn-light mx-2'>Login</button>
                </Link>
                <Link to='/register'>
                  <button className='btn btn-light mx-2'>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
