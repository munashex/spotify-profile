import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  const access_token = localStorage.getItem('access_token');

  const fetchData = useCallback(async (url, setter) => {
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setter(data.items || data);
    } catch (err) {
      console.error(`Error fetching data from ${url}:`, err);
    }
  }, [access_token]);

  useEffect(() => {
    if (!access_token) {
      navigate('/');
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData('https://api.spotify.com/v1/me', setUser),
        fetchData('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term', setArtists),
        fetchData('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term', setTracks)
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [access_token, navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate('/');
  };

  if (loading) {
    return (
      <div className="bg-[#181818] w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#181818] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex flex-col items-center space-y-6 mb-16">
          <img src={user?.images[1]?.url} alt={user?.display_name} className="rounded-full w-44 h-44 object-cover shadow-lg" />
          <h1 className="text-4xl font-bold tracking-tight">{user?.display_name}</h1>
          <button 
            onClick={handleLogout} 
            className="border border-white hover:bg-white hover:text-black text-white py-2 px-6 font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            LOGOUT
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-16">
          <Section 
            title="Top Artists" 
            data={artists} 
            renderItem={(artist) => (
              <Link to={`/artist/${artist.id}`} key={artist.id} className="flex items-center space-x-4 group">
                <img 
                  src={artist.images[2]?.url} 
                  alt={artist.name} 
                  className="w-16 h-16 rounded-full group-hover:rounded-lg transition-all duration-300 ease-in-out shadow-md"
                />
                <h3 className="text-lg font-semibold group-hover:underline transition-all duration-300 ease-in-out">{artist.name}</h3>
              </Link>
            )}
            onSeeMore={() => navigate('/artists')}
          />

          <Section 
            title="Top Tracks" 
            data={tracks} 
            renderItem={(track) => (
              <Link to={`/track/${track.id}`} key={track.id} className="flex items-center space-x-4 group">
                <img 
                  src={track.album?.images[2]?.url} 
                  alt={track.name} 
                  className="w-16 h-16 rounded-lg group-hover:rounded-full transition-all duration-300 ease-in-out shadow-md"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold group-hover:underline transition-all duration-300 ease-in-out">{track.name}</h3>
                  <p className="text-[#8e8c8c] text-sm">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
                <div className="text-[#8e8c8c] text-sm">
                  {formatDuration(track.duration_ms)}
                </div>
              </Link>
            )}
            onSeeMore={() => navigate('/tracks')}
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, data, renderItem, onSeeMore }) => (
  <section className="space-y-8">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button 
        onClick={onSeeMore}
        className="border border-white hover:bg-white hover:text-black text-white py-2 px-5 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        SEE MORE
      </button>
    </div>
    <div className="space-y-6">
      {data.map(renderItem)}
    </div>
  </section>
);

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default UserProfile;