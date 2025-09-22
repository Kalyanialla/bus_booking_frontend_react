


// tostly

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Nav.css';

// const Nav = ({ token, handleLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const activeLink = document.querySelector('.nav a.active');
//     if (activeLink) {
//       setActiveIndicator({
//         width: activeLink.offsetWidth,
//         left: activeLink.offsetLeft
//       });
//     }
//   }, [location.pathname]);

//   const handleNavigate = (path) => {
//     navigate(path);
//     setIsMenuOpen(false);
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleLogoutClick = () => {
//     handleLogout(); // call parent logout function
//     toast.info("You have logged out successfully!", {
//       position: "top-right",
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <ToastContainer />
//       <div className="nav-container">
//         {/* Logo */}
//         <div className="logo" onClick={() => handleNavigate('/')}>
//           <div className="logo-icon">
//             <i className="fas fa-bus"></i>
//           </div>
//           <h1>Bus<span>Booker</span></h1>
//         </div>

//         {/* Navigation + Auth buttons */}
//         <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
//           <div className="active-indicator" style={{ width: `${activeIndicator.width}px`, left: `${activeIndicator.left}px` }}></div>
          
//           <a href="#features" className={location.pathname === '/' ? 'active' : ''}> <i className="fas fa-star"></i> Features </a>
//           <a href="#routes" className={location.pathname === '/' ? 'active' : ''}> <i className="fas fa-route"></i> PopularRoutes </a>
//           <a href="#app" className={location.pathname === '/' ? 'active' : ''}> <i className="fas fa-mobile-alt"></i> MobileApp </a>
//           <a href="#contact" className={location.pathname === '/' ? 'active' : ''}> <i className="fas fa-envelope"></i> Contact </a>

//           {token ? (
//             <>
//               <a href="#bookings" onClick={() => handleNavigate('/my-bookings')} className={location.pathname === '/my-bookings' ? 'active' : ''}>
//                 <i className="fas fa-calendar-check"></i> Bookings
//               </a>
//               <button className="btn-logout" onClick={handleLogoutClick}>
//                 <i className="fas fa-sign-out-alt"></i> Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button className="btn-login" onClick={() => handleNavigate('/login')}>
//                 <i className="fas fa-sign-in-alt"></i> Login
//               </button>
//               <button className="btn-signup" onClick={() => handleNavigate('/register')}>
//                 <i className="fas fa-user-plus"></i> SignUp
//               </button>
//             </>
//           )}
//         </nav>

//         {/* Mobile menu toggle */}
//         <button className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Nav;



// changes
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Nav.css';

const Nav = ({ token, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = document.querySelector('.nav a.active');
    if (activeLink) {
      setActiveIndicator({
        width: activeLink.offsetWidth,
        left: activeLink.offsetLeft
      });
    }
  }, [location.pathname]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoutClick = () => {
    handleLogout();
    toast.info("You have logged out successfully!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setIsMenuOpen(false);
  };

  // Scroll to section on Home page
  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      // Navigate to home first
      navigate('/', { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <ToastContainer />
      <div className="nav-container">
        {/* Logo */}
        <div className="logo" onClick={() => handleNavigate('/')}>
          <div className="logo-icon">
            <i className="fas fa-bus"></i>
          </div>
          <h1>Bus<span>Booker</span></h1>
        </div>

        {/* Navigation + Auth buttons */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="active-indicator" style={{ width: `${activeIndicator.width}px`, left: `${activeIndicator.left}px` }}></div>
          
          <a onClick={() => scrollToSection('features')} className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-star"></i> Features
          </a>
          <a onClick={() => scrollToSection('routes')} className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-route"></i> PopularRoutes
          </a>
          <a onClick={() => scrollToSection('app')} className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-mobile-alt"></i> MobileApp
          </a>
          <a onClick={() => scrollToSection('contact')} className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-envelope"></i> Contact
          </a>

          {token ? (
            <>
              <a href="#bookings" onClick={() => handleNavigate('/my-bookings')} className={location.pathname === '/my-bookings' ? 'active' : ''}>
                <i className="fas fa-calendar-check"></i> Bookings
              </a>
              <button className="btn-logout" onClick={handleLogoutClick}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn-login" onClick={() => handleNavigate('/login')}>
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
              <button className="btn-signup" onClick={() => handleNavigate('/register')}>
                <i className="fas fa-user-plus"></i> SignUp
              </button>
            </>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Nav;
