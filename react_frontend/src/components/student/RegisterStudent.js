import axios from "axios";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Student.css'

export default function RegisterStudent() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDetails = {
        name,
        email,
        dob,
      };

      // Make a POST request to your Spring Boot backend
      const response = await axios.post('http://localhost:8080/api/v1/student', userDetails);

      // Check for specific error message "Email Already Taken"
      if (response.status === 400 && response.data === "Email already taken") {
        alert("Email Already Taken");
      } else if (response.status === 200) {
        // Successful registration
        alert("Student registered successfully");
      } else {
        // Handle other status codes or errors
        alert('Student registration failed', response.data);
      }
    } catch (error) {
      // Log the entire error response for inspection
      console.error(error.response.data);

      // Handle general errors
      alert(error.response.data);
    }
    setName('')
    setEmail('')
    setDob('')
  };

  return (
    <div className="registerContainer">
      <form  className='p-3 bg-white w-25' onSubmit={handleSubmit}>
        {/* Add input fields for name, email, and dob */}
        <div className="register_section">
        <h3>Name:</h3>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="register_section">
        <h3>Email:</h3>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="register_section">
        <h3>Date Of Birth:</h3>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <button type="submit"  className='btn btn-success'>Register</button>
      </form>
    </div>
  );
}

