// import React, {use, useState} from 'react'
// import axios from 'axios'

// const RegisterForm = () => {
//     const [form, setForm] = useState({
//         username:'', email:'', password:''
//     })
//     const[ message, setMessage] = useState('')

//     const handleChange =(e)=>{
//         setForm({...form, [e.target.name]: e.target.value})
//     }

//     const handleSubmit =async(e)=>{
//         e.preventDefault()
//         try {
//             await axios.post('http://localhost:8000/api/register/', form);
//             setMessage('Registration successful')
//         } catch (error) {
//             setMessage("Regestration failed", + (error.response?.data?.username || error.message))
//         }
//     }

//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Username</label>
//                 <input type="text" name='username' value={form.username} onChange={handleChange}/><br/>
//                 <label>Email</label>
//                 <input type="email" name='email' value={form.email} onChange={handleChange}/><br/>
//                 <label>Password</label>
//                 <input type="password" name='password' value={form.password} onChange={handleChange}/><br/>
//                 <button type = 'submit'>Register</button>
//             {message && <p>{message}</p>}
//             </div>
//         </form>
      
//     </div>
//   )
// }

// export default RegisterForm







// tostly
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '', 
    email: '', 
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('https://fullstack-backend-project-2.onrender.com/api/register/', form);

      // Success toast
      toast.success('Registration successful! Redirecting to login...', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to login after short delay
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      const errorMsg = error.response?.data?.username || 
                       error.response?.data?.email || 
                       error.response?.data?.password || 
                       error.message;

      // Error toast
      toast.error(`Registration failed: ${errorMsg}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-card">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join BusBooker today and start your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              name="username" 
              value={form.username} 
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={form.email} 
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={form.password} 
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : 'Create Account'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
