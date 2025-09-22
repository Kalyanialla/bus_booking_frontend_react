// import axios from 'axios'
// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'


// const BusSeats = ({token}) => {
//     const [bus, setBus] = useState(null)
//     const [seats, setSeats] = useState([])

//     const { busId } = useParams()
//     const navigate = useNavigate()

//     console.log('Checking bus id number=', busId)

//     useEffect(()=>{
//         const fetchBusDetails = async()=>{
//             try {
//                 const response = await axios(`http://localhost:8000/api/buses/${busId}`)
//                 setBus(response.data)
//                 setSeats(response.data.seats || [])
//             } catch (error) {
//                 console.log('Error in fetching details', error)
//             }
//         }
//         fetchBusDetails()
//     }, [busId])

//     const handleBook = async(seatId)=>{
//         if(!token){
//             alert("Please login for booking a seat")
//             navigate('/login')
//             return;
//         }
//         try {
//             const response = await axios.post("http://localhost:8000/api/booking/",
//                 {seat:seatId},
//                 {
//                     headers:{
//                         Authorization: `Token ${token}`
//                     }
//                 }
//             )
//             alert("Booking Successful")
//             setSeats((prevSeats) => 
//                 prevSeats.map((seat) =>
//                   seat.id === seatId ? { ...seat, is_booked: true } : seat
//                 )
//               );
              
            
//         } catch (error) {
//             alert(error.response?.data?.error ||"Booking failed")
//         }
//     }

//   return (
//     <div>
//         {bus && (
//             <div>
//                 <div>{bus.bus_name}</div>
//                 <div>{bus.number}</div>
//                 <div>{bus.origin}</div>
//                 <div>{bus.destination}</div>
//                 <div>{bus.start_time}</div>
//                 <div>{bus.reach_time}</div>
//             </div>
//         )}
//       <div>
//         {seats.map((seat)=>{ 
//             return(
//                 <div key={seat.id}>
//                     <button onClick={()=>handleBook(seat.id)}
//                     style={{color:seat.is_booked? 'red':'green'}}
//                     >
//                         Seat Number {seat.seat_number}
//                     </button>
//                 </div>
//             )
//         })}
//       </div>

//     </div>
//   )
// }

// export default BusSeats






// tostyly
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './BusSeats.css'

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null)
  const [seats, setSeats] = useState([])

  const { busId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios(`https://fullstack-backend-project-2.onrender.com/api/buses/${busId}`)
        setBus(response.data)
        setSeats(response.data.seats || [])
      } catch (error) {
        console.log('Error in fetching details', error)
      }
    }
    fetchBusDetails()
  }, [busId])

  const handleBook = async (seatId) => {
    if (!token) {
      toast.warning("Please login to book a seat")
      navigate('/login')
      return
    }
    try {
      await axios.post(
        "https://fullstack-backend-project-2.onrender.com/api/booking/",
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      toast.success("Seat booked successfully!")

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      )
    } catch (error) {
      toast.error(error.response?.data?.error || "Booking failed")
    }
  }

  return (
    <div className="seats-container">
      <ToastContainer position="top-right" autoClose={2500} />
      {bus && (
        <div className="bus-info-card">
          <div className="bus-header">
            <h2>{bus.bus_name}</h2>
            <span className="bus-number">🚌 #{bus.number}</span>
          </div>
          <div className="bus-details">
            <div className="detail-row">
              <span className="label">📍 Origin:</span>
              <span className="value">{bus.origin}</span>
            </div>
            <div className="detail-row">
              <span className="label">🎯 Destination:</span>
              <span className="value">{bus.destination}</span>
            </div>
            <div className="detail-row">
              <span className="label">🕒 Start Time:</span>
              <span className="value">{bus.start_time}</span>
            </div>
            <div className="detail-row">
              <span className="label">⏰ Reach Time:</span>
              <span className="value">{bus.reach_time}</span>
            </div>
          </div>
        </div>
      )}

      <h3 className="seat-title">Choose Your Seat</h3>
      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat-button ${seat.is_booked ? 'booked' : 'available'}`}
            onClick={() => handleBook(seat.id)}
            disabled={seat.is_booked}
          >
            {seat.is_booked ? 'Booked' : `Seat ${seat.seat_number}`}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BusSeats
