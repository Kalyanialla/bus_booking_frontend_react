// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Admin.css';

// export default function Admin() {
//   const [buses, setBuses] = useState([]);
//   const [formData, setFormData] = useState({
//     bus_name: '',
//     number: '',
//     origin: '',
//     destination: '',
//     features: '',   // ✅ matches backend
//     start_time: '',
//     reach_time: '',
//     price: '',      // ✅ matches backend
//     no_of_seats: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const storedUser = localStorage.getItem('user');
//   const user = storedUser ? JSON.parse(storedUser) : null;
//   const token = user?.token || null;

//   // Fetch all buses
//   const fetchBuses = async () => {
//     try {
//       const res = await axios.get('http://localhost:8000/api/buses/', {
//         headers: { Authorization: `Token ${token}` }
//       });
//       setBuses(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   // Handle form change
//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   // Add or Update Bus
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await axios.put(`http://localhost:8000/api/buses/${editingId}/`, formData, {
//           headers: { Authorization: `Token ${token}` }
//         });
//       } else {
//         await axios.post('http://localhost:8000/api/buses/', formData, {
//           headers: { Authorization: `Token ${token}` }
//         });
//       }

//       // Reset form
//       setFormData({
//         bus_name: '',
//         number: '',
//         origin: '',
//         destination: '',
//         features: '',
//         start_time: '',
//         reach_time: '',
//         price: '',
//         no_of_seats: ''
//       });
//       setIsEditing(false);
//       setEditingId(null);
//       fetchBuses();
//     } catch (err) {
//       console.error("Error submitting bus:", err.response?.data || err.message);
//     }
//   };

//   // Edit bus
//   const handleEdit = (bus) => {
//     setFormData(bus);
//     setIsEditing(true);
//     setEditingId(bus.id);
//   };

//   // Delete bus
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this bus?')) {
//       try {
//         await axios.delete(`http://localhost:8000/api/buses/${id}/`, {
//           headers: { Authorization: `Token ${token}` }
//         });
//         fetchBuses();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>🚍 Admin Dashboard</h1>

//       {/* Form */}
//       <form className="bus-form" onSubmit={handleSubmit}>
//         <input name="bus_name" value={formData.bus_name} onChange={handleChange} placeholder="Bus Name" required/>
//         <input name="number" value={formData.number} onChange={handleChange} placeholder="Bus Number" required/>
//         <input name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" required/>
//         <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" required/>
//         <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma separated)" />
//         <input name="start_time" value={formData.start_time} onChange={handleChange} placeholder="Start Time (HH:MM)" />
//         <input name="reach_time" value={formData.reach_time} onChange={handleChange} placeholder="Reach Time (HH:MM)" />
//         <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
//         <input name="no_of_seats" value={formData.no_of_seats} onChange={handleChange} placeholder="Seats" />
//         <button type="submit">{isEditing ? 'Update Bus' : 'Add Bus'}</button>
//       </form>

//       {/* Bus List */}
//       <div className="admin-bus-list">
//         {buses.map(bus => (
//           <div key={bus.id} className="admin-bus-card">
//             <h3>{bus.bus_name} ({bus.number})</h3>
//             <p>{bus.origin} ➔ {bus.destination}</p>
//             <p><strong>Features:</strong> {bus.features}</p>
//             <p><strong>Time:</strong> {bus.start_time} ➔ {bus.reach_time}</p>
//             <p><strong>Price:</strong> ₹{bus.price} | <strong>Seats:</strong> {bus.no_of_seats}</p>
//             <div className="admin-bus-actions">
//               <button onClick={() => handleEdit(bus)}>Edit</button>
//               <button onClick={() => handleDelete(bus.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// tost
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

export default function Admin() {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    bus_name: '',
    number: '',
    origin: '',
    destination: '',
    features: '',
    start_time: '',
    reach_time: '',
    price: '',
    no_of_seats: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token || null;

  // Fetch all buses
  const fetchBuses = async () => {
    try {
      const res = await axios.get('https://fullstack-backend-project-2.onrender.com/api/buses/', {
        headers: { Authorization: `Token ${token}` }
      });
      setBuses(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch buses.');
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Add or Update Bus
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`https://fullstack-backend-project-2.onrender.com/api/buses/${editingId}/`, formData, {
          headers: { Authorization: `Token ${token}` }
        });
        toast.success('Bus updated successfully!');
      } else {
        await axios.post('https://fullstack-backend-project-2.onrender.com/api/buses/', formData, {
          headers: { Authorization: `Token ${token}` }
        });
        toast.success('Bus added successfully!');
      }

      // Reset form
      setFormData({
        bus_name: '',
        number: '',
        origin: '',
        destination: '',
        features: '',
        start_time: '',
        reach_time: '',
        price: '',
        no_of_seats: ''
      });
      setIsEditing(false);
      setEditingId(null);
      fetchBuses();
    } catch (err) {
      console.error("Error submitting bus:", err.response?.data || err.message);
      toast.error('Failed to submit bus. Please check the data.');
    }
  };

  // Edit bus
  const handleEdit = (bus) => {
    setFormData(bus);
    setIsEditing(true);
    setEditingId(bus.id);
  };

  // Delete bus
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await axios.delete(`https://fullstack-backend-project-2.onrender.com/api/buses/${id}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        toast.success('Bus deleted successfully!');
        fetchBuses();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete bus.');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>🚍 Admin Dashboard</h1>

      {/* Form */}
      <form className="bus-form" onSubmit={handleSubmit}>
        <input name="bus_name" value={formData.bus_name} onChange={handleChange} placeholder="Bus Name" required/>
        <input name="number" value={formData.number} onChange={handleChange} placeholder="Bus Number" required/>
        <input name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" required/>
        <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" required/>
        <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma separated)" />
        <input name="start_time" value={formData.start_time} onChange={handleChange} placeholder="Start Time (HH:MM)" />
        <input name="reach_time" value={formData.reach_time} onChange={handleChange} placeholder="Reach Time (HH:MM)" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input name="no_of_seats" value={formData.no_of_seats} onChange={handleChange} placeholder="Seats" />
        <button type="submit">{isEditing ? 'Update Bus' : 'Add Bus'}</button>
      </form>

      {/* Bus List */}
      <div className="admin-bus-list">
        {buses.map(bus => (
          <div key={bus.id} className="admin-bus-card">
            <h3>{bus.bus_name} ({bus.number})</h3>
            <p>{bus.origin} ➔ {bus.destination}</p>
            <p><strong>Features:</strong> {bus.features}</p>
            <p><strong>Time:</strong> {bus.start_time} ➔ {bus.reach_time}</p>
            <p><strong>Price:</strong> ₹{bus.price} | <strong>Seats:</strong> {bus.no_of_seats}</p>
            <div className="admin-bus-actions">
              <button onClick={() => handleEdit(bus)}>Edit</button>
              <button onClick={() => handleDelete(bus.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
