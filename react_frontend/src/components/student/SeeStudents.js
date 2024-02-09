import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Student from "./Student";
import "./Packages.css";
import { useLocation } from "react-router-dom";

const SeeStudents = () => {
  const [students, setStudents] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false); // Introduce a state variable
  const location = useLocation();

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/student");
        setStudents(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch packages every time the component mounts or the route changes
    fetchAllStudents();
  }, [location, triggerRefresh]); // Include triggerRefresh in the dependency array

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div className="package-page">
        <h1 style={{ marginLeft: "4%", fontStyle: "italic" ,fontWeight:"bold",marginBottom:"2%"}}>
  There are {students.length} students.
</h1>

        <div className="pacage-container">
          {students.map((each_student) => (
            <Student
              className="card"
              key={each_student.id}
              onDelete={() => setTriggerRefresh(!triggerRefresh)}
              {...each_student}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeStudents;

