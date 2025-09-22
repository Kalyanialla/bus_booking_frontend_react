

// import React, { useState, useEffect } from 'react';
// import './Home.css';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Animate page fade-in
//     setIsVisible(true);

//     // Auto-slide hero (3 slides)
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % 3);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`homepage ${isVisible ? 'visible' : ''}`}>
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <div className={`hero-text ${isVisible ? 'slide-in' : ''}`}>
//             <h2>Travel in Comfort, Arrive with Joy</h2>
//             <p>Experience the easiest way to book bus tickets across the country</p>
//             <button className="cta-button">Explore Destinations</button>
//           </div>

//           <div className="hero-visual">
//             <div className="animated-bus">
//               <div className="bus-body">
//                 <div className="bus-window"></div>
//                 <div className="bus-window"></div>
//                 <div className="bus-door"></div>
//               </div>
//               <div className="bus-wheels">
//                 <div className="wheel"></div>
//                 <div className="wheel"></div>
//               </div>
//             </div>

//             <div className="floating-elements">
//               <div className="floating-card card-1">🛣️</div>
//               <div className="floating-card card-2">🎫</div>
//               <div className="floating-card card-3">⏰</div>
//               <div className="floating-card card-4">💰</div>
//             </div>
//           </div>
//         </div>

//         <div className="scroll-indicator">
//           <span>Scroll down</span>
//           <div className="scroll-arrow"></div>
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="features">
//         <div className="container">
//           <h3>Why Choose BusBooker?</h3>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">🔒</div>
//               <h4>Secure Booking</h4>
//               <p>Your transactions are protected with bank-level security</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">📱</div>
//               <h4>Mobile App</h4>
//               <p>Book tickets on the go with our easy-to-use mobile application</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🔄</div>
//               <h4>Easy Cancellation</h4>
//               <p>Cancel your bookings with zero hassle and quick refunds</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">👥</div>
//               <h4>Group Discounts</h4>
//               <p>Special discounts for group bookings and frequent travelers</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Popular Routes */}
//       <section id="routes" className="popular-routes">
//         <div className="container">
//           <h3>Popular Routes</h3>
//           <div className="routes-container">
//             <div className="route-card">
//               <div className="route-info">
//                 <h4>New York to Boston</h4>
//                 <p>From $25 • 4h 30m</p>
//               </div>
//               <div className="route-actions">
//                 <span className="popular-tag">Popular</span>
//                 <button className="route-button">View Schedule</button>
//               </div>
//             </div>
//             <div className="route-card">
//               <div className="route-info">
//                 <h4>Los Angeles to San Francisco</h4>
//                 <p>From $35 • 6h 15m</p>
//               </div>
//               <div className="route-actions">
//                 <button className="route-button">View Schedule</button>
//               </div>
//             </div>
//             <div className="route-card">
//               <div className="route-info">
//                 <h4>Chicago to Detroit</h4>
//                 <p>From $30 • 4h 45m</p>
//               </div>
//               <div className="route-actions">
//                 <button className="route-button">View Schedule</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* App Section */}
//       <section id="app" className="app-section">
//         <div className="container">
//           <div className="app-content">
//             <div className="app-text">
//               <h3>Book on the Go with Our Mobile App</h3>
//               <p>Download our app for exclusive offers and easy booking</p>
//               <div className="app-badges">
//                 <div className="app-badge">
//                   <span>Available on the</span>
//                   <strong>App Store</strong>
//                 </div>
//                 <div className="app-badge">
//                   <span>Get it on</span>
//                   <strong>Google Play</strong>
//                 </div>
//               </div>
//             </div>
//             <div className="app-visual">
//               <div className="phone-mockup">
//                 <div className="phone-screen"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="stats-section">
//         <div className="container">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <h4>500+</h4>
//               <p>Destinations</p>
//             </div>
//             <div className="stat-item">
//               <h4>10,000+</h4>
//               <p>Daily Trips</p>
//             </div>
//             <div className="stat-item">
//               <h4>2M+</h4>
//               <p>Happy Travelers</p>
//             </div>
//             <div className="stat-item">
//               <h4>24/7</h4>
//               <p>Customer Support</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer" id="contact">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-section">
//               <h4>BusBooker</h4>
//               <p>Your trusted partner for comfortable and affordable bus travel.</p>
//             </div>
//             <div className="footer-section">
//               <h4>Quick Links</h4>
//               <a href="#features">Features</a>
//               <a href="#routes">Popular Routes</a>
//               <a href="#app">Mobile App</a>
//             </div>
//             <div className="footer-section">
//               <h4>Contact Us</h4>
//               <p>support@busbooker.com</p>
//               <p>+1 (800) 123-4567</p>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>&copy; 2025 BusBooker. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


// code

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Home.css';

// Fix Leaflet marker icons in React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    {
      id: 1,
      name: "New York to Boston",
      from: [40.7128, -74.0060],
      to: [42.3601, -71.0589],
      timings: "08:00 AM, 12:00 PM, 06:00 PM",
      days: "Mon, Wed, Fri, Sun",
      popular: true,
    },
    {
      id: 2,
      name: "Los Angeles to San Francisco",
      from: [34.0522, -118.2437],
      to: [37.7749, -122.4194],
      timings: "07:00 AM, 01:00 PM, 05:30 PM",
      days: "Tue, Thu, Sat",
      popular: false,
    },
    {
      id: 3,
      name: "Chicago to Detroit",
      from: [41.8781, -87.6298],
      to: [42.3314, -83.0458],
      timings: "09:00 AM, 02:00 PM, 07:00 PM",
      days: "Daily",
      popular: false,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // why choose section 
  const features = [
  {
    icon: "🔒",
    title: "Secure Booking",
    description: "Your transactions are protected with bank-level security",
  },
  {
    icon: "📱",
    title: "Mobile App",
    description: "Book tickets on the go with our easy-to-use mobile application",
  },
  {
    icon: "🔄",
    title: "Easy Cancellation",
    description: "Cancel your bookings with zero hassle and quick refunds",
  },
  {
    icon: "👥",
    title: "Group Discounts",
    description: "Special discounts for group bookings and frequent travelers",
  },
];

const [currentFeature, setCurrentFeature] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  }, 3000); // changes every 3 seconds
  return () => clearInterval(interval);
}, []);


  return (
    <div className={`homepage ${isVisible ? 'visible' : ''}`}>
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'slide-in' : ''}`}>
            <h2>Travel in Comfort, Arrive with Joy</h2>
            <p>Experience the easiest way to book bus tickets across the country</p>
            <button className="cta-button">Explore Destinations</button>
          </div>

          <div className="hero-visual">
            <div className="animated-busca">
              <div className="bus-body">
                <div className="bus-window"></div>
                <div className="bus-window"></div>
                <div className="bus-door"></div>
              </div>
              <div className="bus-wheels">
                <div className="wheel"></div>
                <div className="wheel"></div>
              </div>
            </div>

            <div className="floating-elements">
              <div className="floating-card card-1">🛣️</div>
              <div className="floating-card card-2">🎫</div>
              <div className="floating-card card-3">⏰</div>
              <div className="floating-card card-4">💰</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      {/* <section id="features" className="features">
        <div className="container">
          <h3>Why Choose BusBooker?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure Booking</h4>
              <p>Your transactions are protected with bank-level security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h4>Mobile App</h4>
              <p>Book tickets on the go with our easy-to-use mobile application</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4>Easy Cancellation</h4>
              <p>Cancel your bookings with zero hassle and quick refunds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Group Discounts</h4>
              <p>Special discounts for group bookings and frequent travelers</p>
            </div>
          </div>
        </div>
      </section> */}
      {/* ---------------- Features (Carousel) ---------------- */}
<section id="features" className="features">
  <div className="container">
    <h3>Why Choose BusBooker?</h3>
    
    <div className="feature-carousel">
      <div className="feature-card active">
        <div className="feature-icon">{features[currentFeature].icon}</div>
        <h4>{features[currentFeature].title}</h4>
        <p>{features[currentFeature].description}</p>
      </div>
    </div>

    {/* Optional Dots for Navigation */}
    <div className="carousel-dots">
      {features.map((_, idx) => (
        <span
          key={idx}
          className={`dot ${idx === currentFeature ? 'active' : ''}`}
          onClick={() => setCurrentFeature(idx)}
        ></span>
      ))}
    </div>
  </div>
</section>


      {/* ---------------- Popular Routes ---------------- */}
      <section id="routes" className="popular-routes">
        <div className="container">
          <h3>Popular Routes</h3>
          <div className="routes-container">
            {routes.map((route) => (
              <div key={route.id} className="route-card">
                <div className="route-info">
                  <h4>{route.name}</h4>
                  <p>From {route.timings} • {route.days}</p>
                </div>
                <div className="route-actions">
                  {route.popular && <span className="popular-tag">Popular</span>}
                  <button
                    className="route-button"
                    onClick={() => setSelectedRoute(route)}
                  >
                    View Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- App Section ---------------- */}
      <section id="app" className="app-section">
        <div className="container">
          <div className="app-content">
            <div className="app-text">
              <h3>Book on the Go with Our Mobile App</h3>
              <p>Download our app for exclusive offers and easy booking</p>
              <div className="app-badges">
                <div className="app-badge">
                  <span>Available on the</span>
                  <strong>App Store</strong>
                </div>
                <div className="app-badge">
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </div>
            </div>
            <div className="app-visual">
              <div className="phone-mockup">
                <div className="phone-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats Section ---------------- */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h4>500+</h4>
              <p>Destinations</p>
            </div>
            <div className="stat-item">
              <h4>10,000+</h4>
              <p>Daily Trips</p>
            </div>
            <div className="stat-item">
              <h4>2M+</h4>
              <p>Happy Travelers</p>
            </div>
            <div className="stat-item">
              <h4>24/7</h4>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>BusBooker</h4>
              <p>Your trusted partner for comfortable and affordable bus travel.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#features">Features</a>
              <a href="#routes">Popular Routes</a>
              <a href="#app">Mobile App</a>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>support@busbooker.com</p>
              <p>+1 (800) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 BusBooker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ---------------- Modal for Route Schedule ---------------- */}
      {selectedRoute && (
        <div className="route-modal">
          <div className="modal-content">
            <h3>{selectedRoute.name}</h3>
            <p><strong>Days:</strong> {selectedRoute.days}</p>
            <p><strong>Timings:</strong> {selectedRoute.timings}</p>

            <MapContainer
              center={selectedRoute.from}
              zoom={6}
              style={{ height: '300px', width: '100%', marginBottom: '10px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={selectedRoute.from}>
                <Popup>Start: {selectedRoute.name.split(" to ")[0]}</Popup>
              </Marker>
              <Marker position={selectedRoute.to}>
                <Popup>End: {selectedRoute.name.split(" to ")[1]}</Popup>
              </Marker>
              <Polyline positions={[selectedRoute.from, selectedRoute.to]} color="blue" />
            </MapContainer>

            <button className="close-modal" onClick={() => setSelectedRoute(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
