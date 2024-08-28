import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';

function App() { 
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
}

export default App;

