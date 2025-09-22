// // import React, {useState, useEffect} from 'react'
// // import axios from 'axios'
// // import { useNavigate } from 'react-router-dom'

// // const BusList = () => {
// //     const [buses, setBuses] = useState([])

// //     const navigate = useNavigate()

// // useEffect(()=>{
// //     const fetchBuses = async()=>{
// //         try {
// //             const response = await axios.get("http://localhost:8000/api/buses/")
// //             setBuses(response.data)
// //         } catch (error) {
// //             console.log('error in fetching buses', error)
// //         }
// //     }
// //     fetchBuses()
// // }, [])

// // const handleViewSeats=(id)=>{
// //     navigate(`/bus/${id}`)
// // }

// //   return (
// //     <div>
// //       {buses.map((item)=>{
// //         return(
// //             <div key={item.id}>
// //                 <div>Bus name{item.bus_name}</div>
// //                 <div>Bus number{item.number}</div>
// //                 <div>Origin{item.origin}</div>
// //                 <div>Destination{item.destination}</div>
// //                 <div>Start Time{item.start_time}</div>
// //                 <div>Reach Time{item.reach_time}</div>
// //                 <button onClick={()=>handleViewSeats(item.id)}>View Seats</button>
// //                 <hr />
// //             </div>
// //         )
// //       })}
// //     </div>
// //   )
// // }

// // export default BusList



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './BusList.css';

// const BusList = () => {
//   const [buses, setBuses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/buses/');
//         setBuses(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching buses:', error);
//         setIsLoading(false);
//       }
//     };
    
//     // Simulate loading for better UX
//     setTimeout(() => {
//       fetchBuses();
//     }, 800);
//   }, []);

//   const handleViewSeats = (id) => {
//     navigate(`/bus/${id}`);
//   };

//   const filteredBuses = buses.filter(bus =>
//     bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     bus.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     bus.destination.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="buslist-container">
//       <h1 className="buslist-title">🚌 Available Buses</h1>
      
//       <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
//         <div className="search-icon">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
//                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </div>
//         <input
//           type="text"
//           placeholder="Search by name, number, origin, destination..."
//           className="buslist-search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onFocus={() => setIsSearchFocused(true)}
//           onBlur={() => setIsSearchFocused(false)}
//         />
//         {searchTerm && (
//           <button className="clear-search" onClick={() => setSearchTerm('')}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         )}
//       </div>
      
//       {isLoading ? (
//         <div className="loading-container">
//           <div className="bus-loader">
//             <div className="bus-wheels"></div>
//           </div>
//           <p>Loading buses...</p>
//         </div>
//       ) : (
//         <>
//           <div className="buslist-grid">
//             {filteredBuses.map((bus, index) => (
//               <div 
//                 key={bus.id} 
//                 className="bus-card"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="bus-card-header">
//                   <h2>{bus.bus_name}</h2>
//                   <span className="bus-number">{bus.number}</span>
//                 </div>
                
//                 <div className="bus-details">
//                   <div className="bus-type">{bus.type || "AC Sleeper"}</div>
//                   <div className="bus-amenities">
//                     {bus.amenities && bus.amenities.split(',').map((amenity, i) => (
//                       <span key={i} className="amenity-tag">{amenity.trim()}</span>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="bus-route">
//                   <div className="route-point">
//                     <span className="city">{bus.origin}</span>
//                     <span className="time">{bus.start_time}</span>
//                   </div>
                  
//                   <div className="route-divider">
//                     <div className="divider-line"></div>
//                     <div className="duration">{bus.duration || "5h 30m"}</div>
//                     <div className="bus-icon">➔</div>
//                   </div>
                  
//                   <div className="route-point">
//                     <span className="city">{bus.destination}</span>
//                     <span className="time">{bus.reach_time}</span>
//                   </div>
//                 </div>
                
//                 <div className="bus-card-footer">
//                   <div className="price">₹{bus.fare || "999"}</div>
//                   <div className="seats-available">{bus.no_of_seats || "24"} seats left</div>
//                   <button onClick={() => handleViewSeats(bus.id)} className="view-button">
//                     View Seats & Book
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {filteredBuses.length === 0 && !isLoading && (
//             <div className="no-results">
//               <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M14 14H10M10 10H14M10 18H14M5 10.5V16.8C5 17.9201 5 18.4802 5.21799 18.908C5.40973 19.2843 5.71569 19.5903 6.09202 19.782C6.51984 20 7.07989 20 8.2 20H15.8C16.9201 20 17.4802 20 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C19 18.4802 19 17.9201 19 16.8V10.5M5 10.5C5 9.11929 6.11929 8 7.5 8H16.5C17.8807 8 19 9.11929 19 10.5M5 10.5V8.2C5 7.0799 5 6.51984 5.21799 6.09202C5.40973 5.7157 5.71569 5.40973 6.09202 5.21799C6.51984 5 7.0799 5 8.2 5H10.2C10.48 5 10.62 5 10.726 5.0545C10.8178 5.10243 10.8976 5.1822 10.9455 5.274C11 5.37996 11 5.51995 11 5.8V7.2C11 7.48005 11 7.62007 11.0545 7.72601C11.1024 7.81781 11.1822 7.89757 11.274 7.9455C11.38 8 11.52 8 11.8 8H12.2C12.48 8 12.62 8 12.726 7.9455C12.8178 7.89757 12.8976 7.81781 12.9455 7.72601C13 7.62007 13 7.48005 13 7.2V5.8C13 5.51995 13 5.37996 13.0545 5.274C13.1024 5.1822 13.1822 5.10243 13.274 5.0545C13.38 5 13.52 5 13.8 5H15.8C16.9201 5 17.4802 5 17.908 5.21799C18.2843 5.40973 18.5903 5.7157 18.782 6.09202C19 6.51984 19 7.0799 19 8.2V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <p>No buses found for "{searchTerm}"</p>
//               <button onClick={() => setSearchTerm('')} className="clear-search-button">
//                 Clear Search
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default BusList; 


// role code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BusList.css';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isSuperUser = user?.is_superuser || false;
  const token = user?.token || null;

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('https://fullstack-backend-project-2.onrender.com/api/buses/', {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });
        setBuses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching buses:', error);
        setIsLoading(false);
      }
    };
    
    // Simulate loading for better UX
    setTimeout(() => {
      fetchBuses();
    }, 800);
  }, [token]);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };

  // Optional: Navigate to Admin Dashboard for superusers
  const handleAddBus = () => {
    navigate('/admin-dashboard');
  };

  const filteredBuses = buses.filter(bus =>
    bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="buslist-container">
      <h1 className="buslist-title">🚌 Available Buses</h1>

      {/* Superuser Add Bus Button */}
      {isSuperUser && (
        <div className="admin-actions">
          <button onClick={handleAddBus} className="add-bus-btn">
            ➕ Add New Bus
          </button>
        </div>
      )}

      {/* Search Box */}
      <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name, number, origin, destination..."
          className="buslist-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => setSearchTerm('')}>
            ✖
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="loading-container">
          <div className="bus-loader">
            <div className="bus-wheels"></div>
          </div>
          <p>Loading buses...</p>
        </div>
      ) : (
        <>
          {/* Bus Grid */}
          <div className="buslist-grid">
            {filteredBuses.map((bus, index) => (
              <div 
                key={bus.id} 
                className="bus-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bus-card-header">
                  <h2>{bus.bus_name}</h2>
                  <span className="bus-number">{bus.number}</span>
                </div>
                
                <div className="bus-details">
                  <div className="bus-type">{bus.type || "AC Sleeper"}</div>
                  <div className="bus-amenities">
                    {bus.amenities && bus.amenities.split(',').map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity.trim()}</span>
                    ))}
                  </div>
                </div>
                
                <div className="bus-route">
                  <div className="route-point">
                    <span className="city">{bus.origin}</span>
                    <span className="time">{bus.start_time}</span>
                  </div>
                  
                  <div className="route-divider">
                    <div className="divider-line"></div>
                    <div className="duration">{bus.duration || "5h 30m"}</div>
                    <div className="bus-icon">➔</div>
                  </div>
                  
                  <div className="route-point">
                    <span className="city">{bus.destination}</span>
                    <span className="time">{bus.reach_time}</span>
                  </div>
                </div>
                
                <div className="bus-card-footer">
                  <div className="price">₹{bus.fare || "999"}</div>
                  <div className="seats-available">{bus.no_of_seats || "24"} seats left</div>
                  <button onClick={() => handleViewSeats(bus.id)} className="view-button">
                    View Seats & Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredBuses.length === 0 && !isLoading && (
            <div className="no-results">
              <p>No buses found for "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-button">
                Clear Search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BusList;
