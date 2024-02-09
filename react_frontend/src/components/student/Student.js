import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Packages.css";
import axios from "axios";
import UpdateStudent from "./UpdateStudent"; // Import the UpdateStudent component

const Student = (props) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Format the date
    const date = new Date(props.dob);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatted = date.toLocaleDateString(undefined, options);
    setFormattedDate(formatted);
  }, [props.dob]);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your backend endpoint
      await axios.delete(`http://localhost:8080/api/v1/student/${props.id}`);
      alert("Student Deleted successfully");
      props.onDelete(); // Trigger the onDelete callback to refresh the parent component
    } catch (error) {
      // Handle errors (e.g., show an alert)
      alert('Error deleting student:', error.message);
    }
  };

  return (
    <div className="card">
      <b>Id: {props.id}</b>
      <b>Name: {props.name}</b>
      <b>Email: {props.email}</b>
      <b>DOB: {formattedDate}</b>
      <b>Age: {props.age}</b>

      {isEditing ? (
        <UpdateStudent
          id={props.id}
          initialName={props.name}
          initialEmail={props.email}
          onUpdate={() => {
            setIsEditing(false);
            // Check if onUpdate prop is a function before calling it
            if (typeof props.onUpdate === 'function') {
              props.onUpdate(); // Trigger the onUpdate callback to refresh the parent component
            }
          }}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Student
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Student
          </button>
        </>
      )}
    </div>
  );
};

export default Student;

