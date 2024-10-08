
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Callback from './components/Callback';
import UserProfile from './Pages/UserProfile'; 
import Login from './Pages/Login';
import Navbar from './components/Navbar';  
import Artist from './Pages/Artist'; 
import Artists from './Pages/Artists'; 
import Track from './Pages/Track'; 
import Tracks from './Pages/Tracks'; 
import Recent from './Pages/Recent'; 
import NotFound from './Pages/NotFound';

function App() { 
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 54 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <Route path="/recent" element={<Recent/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
}

export default App;
