// // import React, {use, useState} from 'react'
// // import axios from 'axios'

// // const LoginForm = ({onLogin}) => {
// //     const [form, setForm] = useState({
// //         username:'', password:''
// //     })
// //     const[ message, setMessage] = useState('')

// //     const handleChange =(e)=>{
// //         setForm({...form, [e.target.name]: e.target.value})
// //     }

// // const handleSubmit =async(e)=>{
// //     e.preventDefault()
// //     try {
// //         const response = await axios.post('http://localhost:8000/api/login/', form)
// //         setMessage('Login Success')

// //         if(onLogin){
// //             onLogin(response.data.token, response.data.user_id)
// //         }

// //     } catch (error) {
// //             setMessage("login Failed")
// //     }
// // }


// //   return (
// //     <div>
// //         <form onSubmit={handleSubmit}>
// //             <div>
// //                 <label>Username</label>
// //                 <input type="text" name='username' value={form.username} onChange={handleChange}/><br/>
               
// //                 <label>Password</label>
// //                 <input type="password" name='password' value={form.password} onChange={handleChange}/><br/>
// //                 <button type = 'submit'>Login</button>
// //             {message && <p>{message}</p>}
// //             </div>
// //         </form>
      
// //     </div>
// //   )
// // }

// // export default LoginForm







// // tostyly

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './LoginForm.css';

// // const LoginForm = ({ onLogin }) => {
// //   const [form, setForm] = useState({ username: '', password: '' });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       const response = await axios.post('http://localhost:8000/api/login/', form);

// //       const { token, user_id } = response.data;

// //       // Call parent callback to save token/userId
// //       if (onLogin) onLogin(token, user_id);

// //       // Show success toast
// //       toast.success('Login Successful!', {
// //         position: "top-right",
// //         autoClose: 3000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //       });

// //       // Navigate to bus list after short delay
// //       setTimeout(() => navigate('/buslist'), 1000);

// //     } catch (error) {
// //       // Show error toast
// //       toast.error(
// //         error.response?.data?.message || 'Login Failed. Check your credentials.',
// //         {
// //           position: "top-right",
// //           autoClose: 3000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //         }
// //       );
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <ToastContainer />
// //       <div className="login-card">
// //         <div className="login-header">
// //           <h2>Welcome Back</h2>
// //           <p>Sign in to your BusBooker account</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="login-form">
// //           <div className="input-group">
// //             <label htmlFor="username">Username</label>
// //             <input
// //               type="text"
// //               id="username"
// //               name="username"
// //               value={form.username}
// //               onChange={handleChange}
// //               placeholder="Enter your username"
// //               required
// //             />
// //           </div>

// //           <div className="input-group">
// //             <label htmlFor="password">Password</label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               value={form.password}
// //               onChange={handleChange}
// //               placeholder="Enter your password"
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className={`login-button ${isLoading ? 'loading' : ''}`}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? <div className="spinner"></div> : 'Login'}
// //           </button>
// //         </form>

// //         <div className="login-footer">
// //           <p>
// //             Don't have an account? <a href="/register">Sign up</a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;


// // role based

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './LoginForm.css';

// const LoginForm = ({ onLogin }) => {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Send login request
//       const response = await axios.post('http://localhost:8000/api/login/', form);
//       const userData = response.data;

//       // Save user info in localStorage
//       localStorage.setItem('user', JSON.stringify(userData));

//       // Call parent callback if exists
//       // if (onLogin) onLogin(userData);
//       // After successful login
// if (onLogin) onLogin(userData.token, userData.user_id, userData);


//       // Show success toast
//       toast.success('Login Successful!', { position: "top-right", autoClose: 3000 });

//       // Redirect based on superuser status
//       if (userData.is_superuser) {
//         navigate('/admin-dashboard'); // Superuser route
//       } else {
//         navigate('/buslist'); // Normal user route
//       }

//     } catch (err) {
//       toast.error(
//         err.response?.data?.error || 'Login Failed. Check your credentials.',
//         { position: "top-right", autoClose: 3000 }
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <ToastContainer />
//       <div className="login-card">
//         <h2>Welcome Back</h2>
//         <p>Sign in to your BusBooker account</p>

//         <form onSubmit={handleSubmit} className="login-form">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             autoComplete="username"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             autoComplete="current-password"
//             required
//           />

//           <button type="submit" disabled={isLoading} className="login-button">
//             {isLoading ? 'Loading...' : 'Login'}
//           </button>
//         </form>

//         <p className="login-footer">
//           Don't have an account? 
//           <button
//             type="button"
//             onClick={() => navigate('/register')}
//             className="link-button"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



// last code
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login/', form);
      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));

      if (onLogin) onLogin(userData.token, userData.user_id, userData);

      toast.success('Login Successful!', {
        position: 'top-right',
        autoClose: 3000,
      });

      if (userData.is_superuser) {
        navigate('/admin-dashboard');
      } else {
        navigate('/buslist');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || 'Login Failed. Check your credentials.',
        { position: 'top-right', autoClose: 3000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your BusBooker account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? <div className="spinner"></div> : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
  <p>
    Don’t have an account?{' '}
    <a onClick={() => navigate('/register')}>Sign up</a>
  </p>
</div>

      </div>
    </div>
  );
};

export default LoginForm;
