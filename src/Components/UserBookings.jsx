// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import './UserBookings.css'

// const UserBookings = ({token, userId}) => {
//     const [bookings, setBookings] = useState([])
//     const [bookingError, setBookingError] = useState(null)

// useEffect(()=>{
//     const fetchBookings = async()=>{
//         if(!token || !userId){
//             return
//         }
//         try {
//             const response = await axios.get(`http://localhost:8000/api/user/${userId}/bookings/`,
//                 {
//                     headers:{
//                         Authorization : `Token ${token}`
//                     }
//                 }
//             )
//             console.log("Booking data = ", response.data)
//             setBookings(response.data)
//             console.log("checking for user bookings =", response.data)

//         } catch (error) {
//             console.log("fetching details failed", error)
//             setBookingError(
//                 error.response?.data?.message
//             )
//         }
//     }
//     fetchBookings()
// }, [userId, token])
    
//   return (
//     <div>
//       {bookings.map((item)=>{
//         return(
//       <div className="booking-container">
//     {bookings.map((item) => (
//       <div key={item.id} className="booking-card">
//         <h3>🚌 {item.bus?.bus_name}</h3>
//         <p><strong>Bus Number:</strong> {item.bus?.number}</p>
//         <p><strong>From:</strong> {item.bus?.origin}</p>
//         <p><strong>To:</strong> {item.bus?.destination}</p>
//         <p><strong>Features:</strong> {item.bus?.features?.toUpperCase()}</p>
//         <p><strong>Start Time:</strong> {item.bus?.start_time}</p>
//         <p><strong>Reach Time:</strong> {item.bus?.reach_time}</p>
//         <p><strong>Total Seats:</strong> {item.bus?.no_of_seats}</p>
//         <p><strong>Price:</strong> ₹{item.bus?.price}</p>
//         <p><strong>Booked At:</strong> {new Date(item.booking_time).toLocaleString()}</p>
//       </div>
//     ))}
//   </div>

//         )
//       })}
//     </div>
//   )
// }

// export default UserBookings



// tostly

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './UserBookings.css'

const UserBookings = ({ token, userId }) => {
    const [bookings, setBookings] = useState([])
    const [bookingError, setBookingError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userName, setUserName] = useState('') // Store user's name

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token || !userId) {
                setIsLoading(false)
                return
            }
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:8000/api/user/${userId}/bookings/`, {
                    headers: { Authorization: `Token ${token}` }
                })
                setBookings(response.data.bookings || response.data)
                setUserName(response.data.user_name || 'User')
                setIsLoading(false)
            } catch (error) {
                setBookingError(error.response?.data?.message || "Failed to load bookings")
                setIsLoading(false)
            }
        }
        fetchBookings()
    }, [userId, token])

    const formatDateTime = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const handleDownloadTicket = (booking) => {
        const doc = new jsPDF();
        doc.setFontSize(16)
        doc.text("Bus Ticket", 20, 20)
        doc.setFontSize(12)
        // doc.text(`User: ${username}`, 20, 30)
        doc.text(`Bus Name: ${booking.bus?.bus_name || 'N/A'}`, 20, 40)
        doc.text(`Bus Number: ${booking.bus?.number || 'N/A'}`, 20, 50)
        doc.text(`Features: ${booking.bus?.features || 'N/A'}`, 20, 60)
        doc.text(`From: ${booking.bus?.origin || 'N/A'} - ${formatTime(booking.bus?.start_time)}`, 20, 70)
        doc.text(`To: ${booking.bus?.destination || 'N/A'} - ${formatTime(booking.bus?.reach_time)}`, 20, 80)
        doc.text(`Seats: ${booking.no_of_seats ? booking.no_of_seats.join(', ') : 'N/A'}`, 20, 90)
        doc.text(`Total Amount: ₹${booking.total_amount || booking.bus?.price || 'N/A'}`, 20, 100)
        doc.text(`Booking Time: ${formatDateTime(booking.booking_time)}`, 20, 110)
        doc.text(`Status: ${booking.status || 'CONFIRMED'}`, 20, 120)
        doc.save(`Ticket_${booking.id}.pdf`)

        toast.success(`Ticket for booking #${booking.id} downloaded!`)
    }

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/booking/${bookingId}/`, {
                headers: { Authorization: `Token ${token}` },
            });

            // Remove the deleted booking from state
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));

            toast.success("Booking cancelled successfully")
        } catch (error) {
            console.error(error.response || error.message);
            toast.error(error.response?.data?.detail || "Failed to cancel booking")
        }
    }

    if (isLoading) {
        return (
            <div className="bookings-container">
                <div className="bookings-header">
                    <h1>My Bookings</h1>
                    <p>Loading your travel history and upcoming journeys...</p>
                </div>
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            </div>
        )
    }

    if (bookingError) {
        return (
            <div className="bookings-container">
                <div className="bookings-header">
                    <h1>My Bookings</h1>
                    <p>Unable to load your bookings</p>
                </div>
                <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    <h3>Error</h3>
                    <p>{bookingError}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </div>
        )
    }
   
    

    return (
        <div className="bookings-container">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="bookings-header">
                <h1>My Bookings</h1>
                <p>Welcome, <strong>{userName}</strong>! Here is your travel history and upcoming journeys.</p>
            </div>

            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <i className="fas fa-ticket-alt"></i>
                    <h3>No bookings yet</h3>
                    <p>You haven't made any bookings yet. Start exploring buses to plan your journey.</p>
                    <button className="explore-btn">Explore Buses</button>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((item) => (
                        <div key={item.id} className="booking-card">
                            <div className="booking-card-header">
                                <h3>{item.bus?.bus_name || 'Unknown Bus'}</h3>
                                <span className={`booking-status ${item.status || 'confirmed'}`}>
                                    {item.status || 'CONFIRMED'}
                                </span>
                            </div>

                            <div className="route-info">
                                <div className="route-details">
                                    <div className="location">
                                        <span className="city">{item.bus?.origin || 'Unknown'}</span>
                                        <span className="time">{formatTime(item.bus?.start_time)}</span>
                                    </div>

                                    <div className="journey-details">
                                        <div className="duration">
                                            {item.bus?.start_time && item.bus?.reach_time ? (
                                                (() => {
                                                    const start = new Date(`2000-01-01T${item.bus.start_time}`);
                                                    const end = new Date(`2000-01-01T${item.bus.reach_time}`);
                                                    const diff = end - start;
                                                    const hours = Math.floor(diff / 3600000);
                                                    const minutes = Math.floor((diff % 3600000) / 60000);
                                                    return `${hours}h ${minutes}m`;
                                                })()
                                            ) : 'N/A'}
                                        </div>
                                        <div className="route-line">
                                            <div className="line"></div>
                                            <div className="bus-icon">
                                                <i className="fas fa-bus"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="location">
                                        <span className="city">{item.bus?.destination || 'Unknown'}</span>
                                        <span className="time">{formatTime(item.bus?.reach_time)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-details">
                                <div className="detail-item">
                                    <span className="label">Bus Number:</span>
                                    <span className="value">{item.bus?.number || 'N/A'}</span>
                                </div>

                                <div className="detail-item">
                                    <span className="label">Features:</span>
                                    <span className="value">{item.bus?.features ? item.bus.features.toUpperCase() : 'N/A'}</span>
                                </div>

                               <div className="detail-item">
    <span className="label">Seats:</span>
    <span className="value">{item.bus?.no_of_seats || 'N/A'}</span>
</div>


                                <div className="detail-item">
                                    <span className="label">Total Amount:</span>
                                    <span className="value price">₹{item.total_amount || item.bus?.price || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="booking-footer">
                                <div className="booking-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span>Booked on {formatDateTime(item.booking_time)}</span>
                                </div>

                                <div className="booking-actions">
                                    <button className="action-btn download" onClick={() => handleDownloadTicket(item)}>
                                        <i className="fas fa-download"></i> Ticket
                                    </button>
                                    <button className="action-btn cancel" onClick={() => handleCancelBooking(item.id)}>
                                        <i className="fas fa-times"></i> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserBookings
