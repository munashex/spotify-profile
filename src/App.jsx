import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Callback from './components/Callback';
import UserProfile from './Pages/UserProfile'; 
import Login from './Pages/Login';
import Navbar from './components/Navbar';  
import Artist from './Pages/Artist'; 
import Artists from './Pages/Artists'; 
import Track from './Pages/Track'; 
import Tracks from './Pages/Tracks';

function App() { 
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/artist/:id" element={<Artist/>}/>  
        <Route path="track/:id" element={<Track/>}/>
        <Route path="/artists" element={<Artists/>}/> 
        <Route path="/tracks" element={<Tracks/>}/>
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
}

export default App;

