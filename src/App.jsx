import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Callback from './components/Callback';
import UserProfile from './assets/Pages/UserProfile'; 
import Login from './assets/Pages/Login';
import Navbar from './components/Navbar';  
import Artist from './assets/Pages/Artist'; 
import Artists from './assets/Pages/Artists';

function App() { 
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/artist/:id" element={<Artist/>}/> 
        <Route path="/artists" element={<Artists/>}/>
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
}

export default App;

