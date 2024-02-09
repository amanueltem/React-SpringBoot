import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import HomePage from './components/HomePage';
import RegisterStudent from './components/student/RegisterStudent';
import SeeStudents from './components/student/SeeStudents';
import SearchStudent from './components/student/SearchStudent';
import Navigation from './components/profile/Navigation';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<div><Navigation /><HomePage /></div>} />
          <Route path="/register_student" element={<div><Navigation /><RegisterStudent /></div>} />
          <Route path="/search_student" element={<div><Navigation /><SearchStudent/></div>} />
          <Route path="/see_students" element={<div><Navigation /><SeeStudents /></div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

