import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const UpdateStudent = ({ id, initialName, initialEmail, onUpdate, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
   const navigate =useNavigate();
 const handleUpdate = async () => {
  try {
  console.log("name:*********"+name)
  console.log("email:*******"+email)
    const response = await axios.put(`http://localhost:8080/api/v1/student/${id}`, {
      name,
      email,
    });

    // Check if the update was successful based on the response status
    if (response.status === 200) {
      // Trigger the onUpdate callback to refresh the parent component
      onUpdate();
      alert("Updated successfully");
      navigate("/see_students");
    } else {
      // Handle other status codes or errors
      alert('Update failed');
    }
  } catch (error) {
    // Handle errors (e.g., show an alert)
    console.error('Error updating student:', error.message);
  }
};


  return (
    <div>
      <h2>Edit Student</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateStudent;

