import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
     
      const response = await axios.post('http://localhost:7000/signup', {
        username,
        password,
      });

      if (response.status === 201) {
     
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ color: 'white' }}>Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '600px',
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/043/116/836/non_2x/illustration-of-boy-profile-anime-style-black-silhouette-isolated-on-white-background-free-vector.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <div className="form-group">
          <label style={{ color: 'black' }}>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'black' }}>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>
      <p style={{ color: 'white' }} className="mt-3 text-center">
        Already have an account? <Link to="/login" style={{ color: 'red' }}>Login</Link>
      </p>
    </div>
  );
}

export default SignUp;