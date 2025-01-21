// import { useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [hackathon, setHackathon] = useState({
//     name: '',
//     logo: '',
//     startDate: '',
//     endDate: '',
//     status: '',
//     location: '',
//     description: '',
//     eligibility: '',
//     teamSize: { min: 2, max: 5 },
//     registration: {
//       deadline: '',
//       open: true,
//     },
//     prizes: [],
//     organizers: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHackathon({ ...hackathon, [name]: value });
//   };

//   const handleTeamSizeChange = (e) => {
//     const { name, value } = e.target;
//     setHackathon({
//       ...hackathon,
//       teamSize: { ...hackathon.teamSize, [name]: parseInt(value) }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     if (!hackathon.name || !hackathon.status || !hackathon.eligibility || !hackathon.startDate || !hackathon.endDate || !hackathon.registration.deadline) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     try {
//       console.log(hackathon); 
//       await axios.post('http://localhost:3000/hackathon/hackathondetails', hackathon);
//       alert("Details saved successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Add Prize
//   const addPrize = () => {
//     setHackathon({
//       ...hackathon,
//       prizes: [...hackathon.prizes, { name: '', money: '' }]
//     });
//   };

//   // Remove Prize
//   const removePrize = (index) => {
//     const updatedPrizes = hackathon.prizes.filter((_, i) => i !== index);
//     setHackathon({ ...hackathon, prizes: updatedPrizes });
//   };

//   // Update Prize
//   const updatePrize = (index, field, value) => {
//     const updatedPrizes = hackathon.prizes.map((prize, i) => 
//       i === index ? { ...prize, [field]: value } : prize
//     );
//     setHackathon({ ...hackathon, prizes: updatedPrizes });
//   };

//   // Add Organizer
//   const addOrganizer = () => {
//     setHackathon({
//       ...hackathon,
//       organizers: [...hackathon.organizers, { name: '' }]
//     });
//   };

//   // Remove Organizer
//   const removeOrganizer = (index) => {
//     const updatedOrganizers = hackathon.organizers.filter((_, i) => i !== index);
//     setHackathon({ ...hackathon, organizers: updatedOrganizers });
//   };

//   // Update Organizer
//   const updateOrganizer = (index, value) => {
//     const updatedOrganizers = hackathon.organizers.map((organizer, i) => 
//       i === index ? { ...organizer, name: value } : organizer
//     );
//     setHackathon({ ...hackathon, organizers: updatedOrganizers });
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Hackathon Form</h1>
//       <form onSubmit={handleSubmit} className="form">

//         {/* Hackathon Name */}
//         <div className="form-group">
//           <label>Hackathon Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={hackathon.name}
//             onChange={handleChange}
//             placeholder="Enter hackathon name"
//             required
//           />
//         </div>

//         {/* Logo URL */}
//         <div className="form-group">
//           <label>Logo:</label>
//           <input
//             type="url"
//             className="form-control"
//             name="logo"
//             value={hackathon.logo}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Start Date */}
//         <div className="form-group">
//           <label>Start Date:</label>
//           <input
//             type="date"
//             className="form-control"
//             name="startDate"
//             value={hackathon.startDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* End Date */}
//         <div className="form-group">
//           <label>End Date:</label>
//           <input
//             type="date"
//             className="form-control"
//             name="endDate"
//             value={hackathon.endDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Status */}
//         <div className="form-group">
//           <label>Status:</label>
//           <select
//             className="form-control"
//             name="status"
//             value={hackathon.status}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select status</option>
//             <option value="upcoming">Upcoming</option>
//             <option value="ongoing">Ongoing</option>
//             <option value="closed">Closed</option>
//           </select>
//         </div>

//         {/* Location */}
//         <div className="form-group">
//           <label>Location:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="location"
//             value={hackathon.location}
//             onChange={handleChange}
//             placeholder="Enter location"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={hackathon.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             rows="3"
//             required
//           />
//         </div>

//         {/* Eligibility */}
//         <div className="form-group">
//           <label>Eligibility:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="eligibility"
//             value={hackathon.eligibility}
//             onChange={handleChange}
//             placeholder="Enter eligibility criteria"
//             required
//           />
//         </div>

//         {/* Team Size */}
//         <div className="form-group">
//           <label>Team Size:</label>
//           <div className="row">
//             <div className="col">
//               <input
//                 type="number"
//                 className="form-control"
//                 name="min"
//                 placeholder="Min team size"
//                 value={hackathon.teamSize.min}
//                 onChange={handleTeamSizeChange} // Use the updated function here
//               />
//             </div>
//             <div className="col">
//               <input
//                 type="number"
//                 className="form-control"
//                 name="max"
//                 placeholder="Max team size"
//                 value={hackathon.teamSize.max}
//                 onChange={handleTeamSizeChange} // Use the updated function here
//               />
//             </div>
//           </div>
//         </div>

//         {/* Registration Deadline */}
//         <div className="form-group">
//           <label>Registration Deadline:</label>
//           <input
//             type="date"
//             className="form-control"
//             name="registrationDeadline"
//             value={hackathon.registration.deadline}
//             onChange={(e) => {
//               setHackathon({
//                 ...hackathon,
//                 registration: { ...hackathon.registration, deadline: e.target.value }
//               });
//             }}
//             required
//           />
//         </div>

//         {/* Prizes */}
//         <div className="form-group">
//           <label>Prizes:</label>
//           {hackathon.prizes.map((prize, index) => (
//             <div key={index} className="prize-row">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Prize Name"
//                 value={prize.name}
//                 onChange={(e) => updatePrize(index, 'name', e.target.value)}
//                 required
//               />
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Amount"
//                 value={prize.money}
//                 onChange={(e) => updatePrize(index, 'money', e.target.value)}
//                 required
//               />
//               <button type="button" onClick={() => removePrize(index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrize}>Add Prize</button>
//         </div>

//         {/* Organizers */}
//         <div className="form-group">
//           <label>Organizers:</label>
//           {hackathon.organizers.map((organizer, index) => (
//             <div key={index} className="organizer-row">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Organizer Name"
//                 value={organizer.name}
//                 onChange={(e) => updateOrganizer(index, e.target.value)}
//                 required
//               />
//               <button type="button" onClick={() => removeOrganizer(index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addOrganizer}>Add Organizer</button>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;


import React from "react";
import './App.css';
import AdminProvider from "./context/AdmincontextProvider";
import Login from "./login/login";
import { Outlet } from "react-router-dom";
function App(){
  return<>
  <AdminProvider>
  <Outlet></Outlet>
</AdminProvider>
  </>

}

export default App;
