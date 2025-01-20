import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Header from './components/Header.js';
import AddCategory from './pages/AddCategory.js';
import AddBlog from './pages/AddBlog.js';
import SingleBlog from './pages/SingleBlog.js';
import PrivateRoute from './services/Protected.js';



const App = () => {
  return (
    <>
   <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path='/' element={<PrivateRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        </Route>


      </Routes>
      </>
   
  );
};

export default App;
