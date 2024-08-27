import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Callback;
