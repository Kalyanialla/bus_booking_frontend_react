// import React from 'react'
// import RegisterForm from './Components/RegisterForm'
// import LoginForm from './Components/LoginForm'
// import { Route,Routes } from 'react-router-dom'
// import { useState } from 'react'
// import  Home  from './Home/Home'
// import BusList from './Components/BusList'
// import BusSeats from './Components/BusSeats'
// import UserBookings from './Components/UserBookings'
// import Wrapper from './Components/Wrapper'
// import Nav from './Nav/Nav'
// export const App = () => {
//    const [token, setToken] = useState(localStorage.getItem('token'))
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));

//   const handleLogin = (token, userId)=>{
//     localStorage.setItem('token', token)
//     localStorage.setItem('userId', userId)
//     setToken(token)
//     setUserId(userId)
//   }
//   const handleLogout = ()=>{
//   localStorage.removeItem('token')
//   localStorage.removeItem('userId')
//   setToken(null)
//   setUserId(null)
//   setSelectedBusId(null)
// }
//   return (
//     <div>
//      <Nav></Nav>
//        <Wrapper token={token} handleLogout={handleLogout}>
    
//       <Routes>
//         <Route path='/' element={<Home></Home>}></Route>
//         <Route path='/register' element={<RegisterForm></RegisterForm>}></Route>
// <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
//  <Route path='/buslist' element={<BusList onSelectBus={(id)=>setSelectedBusId(id)} token={token}/>} />
//     <Route path='/bus/:busId' element={<BusSeats token={token}/>} />
//       <Route path='/my-bookings' element={<UserBookings token={token} userId={userId} />} />
//       </Routes>
//       </Wrapper>
    
//     </div>
//   )
// }



// code

// import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import RegisterForm from './Components/RegisterForm';
// import LoginForm from './Components/LoginForm';
// import BusList from './Components/BusList';
// import BusSeats from './Components/BusSeats';
// import UserBookings from './Components/UserBookings';
// import { Routes, Route } from 'react-router-dom';
// import Wrapper from './Components/Wrapper';
// import Home from './Home/Home';
// import Nav from './Nav/Nav';
// import { useNavigate } from 'react-router-dom';


// export const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));
//   const [selectedBusId, setSelectedBusId] = useState(null);

//   const navigate_login=useNavigate()
//   const handleLogin = (token, userId) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userId', userId);
//     setToken(token);
//     setUserId(userId);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     setToken(null);
//     setUserId(null);
//     setSelectedBusId(null);
//     navigate_login('/login')
//   };

//   return (
  
//       <div>
//         {/* Add Navbar at the top level */}
//         <Nav token={token} handleLogout={handleLogout} />
        
//         {/* Add padding to content to account for fixed navbar */}
//         <div style={{ paddingTop: '80px' }}>
//           <Routes>
              
            
//             <Route path='/' element={<Home />} />
//             <Route path='/register' element={<RegisterForm />} />
//             <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
//             {/* <Route path='/buslist' element={
//               <Wrapper token={token} handleLogout={handleLogout}>
//                 <BusList onSelectBus={(id) => setSelectedBusId(id)} token={token} />
//               </Wrapper>
//             } /> */}
//             <Route path='/buslist' element={<BusList></BusList>}></Route>
//             <Route path='/bus/:busId' element={
//               <Wrapper token={token} handleLogout={handleLogout}>
//                 <BusSeats token={token} />
//               </Wrapper>
//             } />
//             <Route path='/my-bookings' element={
//               <Wrapper token={token} handleLogout={handleLogout}>
//                 <UserBookings token={token} userId={userId} />
//               </Wrapper>
//             } />
          
//           </Routes>
//         </div>
//       </div>
    
//   );
// };



// role based

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import BusList from './Components/BusList';
import BusSeats from './Components/BusSeats';
import UserBookings from './Components/UserBookings';
import Wrapper from './Components/Wrapper';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import Admin from './Components/Admin'; // import your admin dashboard

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();

  // ---------------- Safe parsing of stored user ----------------
 // ---------------- Safe parsing of stored user ----------------
let user = null;
const storedUser = localStorage.getItem('user');
if (storedUser && storedUser !== "undefined") {
  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.removeItem('user'); // remove invalid data
  }
} else {
  localStorage.removeItem('user'); // clean up if "undefined"
}


  // ---------------- Login ----------------
  const handleLogin = (token, userId, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', JSON.stringify(userData)); // save user info including is_superuser
    setToken(token);
    setUserId(userId);
  };

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    setToken(null);
    setUserId(null);
    navigate('/login');
  };

  return (
    <div>
      <Nav token={token} handleLogout={handleLogout} />

      <div style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path='/buslist'
            element={token ? <BusList /> : <Navigate to="/login" />}
          />

          <Route
            path='/bus/:busId'
            element={
              <Wrapper token={token} handleLogout={handleLogout}>
                <BusSeats token={token} />
              </Wrapper>
            }
          />

          <Route
            path='/my-bookings'
            element={
              <Wrapper token={token} handleLogout={handleLogout}>
                <UserBookings token={token} userId={userId} />
              </Wrapper>
            }
          />

          {/* Admin Dashboard (only for superuser) */}
          <Route
            path='/admin-dashboard'
            element={user?.is_superuser ? <Admin /> : <Navigate to="/buslist" />}
          />

          {/* Catch-all redirect */}
          <Route
            path='*'
            element={<Navigate to={token ? "/buslist" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
};
