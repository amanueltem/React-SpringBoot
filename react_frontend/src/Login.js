import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useAuth } from './components/profile/AuthContext';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [sucess,setSucess]=useState(false);
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if ( !email || !password) {
      alert("Please fill in all required fields.");
      setFieldsEmpty(true);
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8800/login", {
        email,
        password,
      });
      console.log(response.data);
      if(response.data=="sucess"){
        window.localStorage.setItem("email",email);
        login(email);
      setSucess(true)
      navigate('/home')
}
else{
alert("invalid user name or password")
setPassword('');
}
    } catch (error) {
    console.log(error);
      console.error("Login failed", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  
  
   const { user, login, logout } = useAuth();
    const handleLogout = () => {
    logout();
    // Redirect to the login page or any other desired page
    navigate('/login');
  };
   useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="p-3 bg-white w-30">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
