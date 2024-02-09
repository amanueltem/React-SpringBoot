import axios from "axios";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Student from './Student';
import './Student.css'; // Import a custom CSS file for styling

export default function SearchStudent() {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a GET request to fetch individual student data
      const response = await axios.get(`http://localhost:8080/api/v1/student/${studentId}`);
      setStudentData(response.data);
      if(response.data==null){
      alert("There is no student with id "+studentId);
      }
    } catch (error) {
      // Handle errors (e.g., show an alert)
      alert('Error fetching student:', error.message);
    }
  };

  return (
    <div className='search-student-container'>
      {studentData && (
        <div className='student-details-container'>
          {/* Render the Student component with the retrieved student data */}
          <Student 
            id={studentData.id}
            name={studentData.name}
            email={studentData.email}
            dob={studentData.dob}
            age={studentData.age}
            onDelete={() => setStudentData(null)}  // Clear studentData to reset the view
          />
        </div>
      )}
      <form className='p-3 bg-white w-25' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label> Student id: 
            <input 
              type="number"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className='btn btn-success'>Search Student</button>
      </form>
    </div>
  );
}

