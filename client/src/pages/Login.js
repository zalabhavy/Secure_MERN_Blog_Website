import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    otp: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isOtpExpired, setOtpExpired] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setOtpExpired(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Request Payload:', {
      email: input.email,
      password: input.password,
      username: input.username 
    });

    if (isRegistered) {
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/register', {
          username: input.username,
          email: input.email,
          password: input.password
        });
        setOtpMessage(res.data.message);
        setIsRegistered(false); 
      } catch (error) {
        console.error('Registration Error:', error.response); 
        setOtpMessage(error.response.data.message || "Error during registration.");
      }
    } else {
    
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/login', {
          email: input.email,
          password: input.password
        });
        setOtpSent(true); 
        setOtpExpired(false);
        setOtpTimer(60);
        setOtpMessage("OTP sent. Please enter the OTP below.");
      } catch (error) {
        console.error('Login Error:', error.response);
        setOtpMessage(error.response.data.message || "Error during login.");
      }
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (isOtpExpired) {
      alert("OTP has expired. Please request a new one.");
      return;
    }
  
    if (!input.email || !input.otp) {
      setOtpMessage("Please enter your email and OTP.");
      return;
    }
  
    try {
      console.log("Verifying OTP for email:", input.email, "and OTP:", input.otp);
      const res = await axios.post('http://localhost:9000/api/v1/user/verify-otp', {
        email: input.email,
        otp: input.otp
      });
  
      console.log("OTP verification response:", res);
  
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
        navigate('/'); 
      } else {
        setOtpMessage("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
  
      if (error.response && error.response.data) {
        setOtpMessage(error.response.data.message || "Error during OTP verification.");
      } else {
        setOtpMessage("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="container shadow my-5">
      <h2 className="text-center my-3">{isRegistered ? 'Register' : 'Login'}</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <form onSubmit={otpSent ? handleOtpVerification : handleSubmit}>
            {isRegistered && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="email"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="password"
                placeholder="Enter Password"
                required
              />
            </div>

            {/* Show OTP input if OTP was sent */}
            {otpSent && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={input.otp}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                />
                <div className="mt-2">
                  <span>{otpTimer > 0 ? `OTP valid for ${otpTimer} seconds` : 'OTP expired. Request a new one.'}</span>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={otpSent && otpTimer === 0}>
              {otpSent ? 'Verify OTP' : isRegistered ? 'Register' : 'Login'}
            </button>
            <div className="mt-3">
              {otpMessage && <div className="alert alert-info">{otpMessage}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;